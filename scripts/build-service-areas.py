"""Builds src/assets/service-areas.json.

Suburb outlines come from the Census TIGERweb "Incorporated Places" layer;
Chicago neighbourhood outlines from the blackmad/neighborhoods set, which uses
the same everyday names the site already markets in (Wicker Park, Andersonville,
Wrigleyville) rather than the official community-area names.

Geometry is simplified to ~35m and coordinates rounded to 5dp, which is well
under a pixel at the zoom this map is ever shown at.
"""
import json, math, gzip, os

OUT = os.path.expanduser('~/House keep up/src/assets/service-areas.json')
EPS = 0.00035
ROUND = 5

SUBURB_SLUGS = {
    'Evanston': 'evanston', 'Skokie': 'skokie', 'Des Plaines': 'des-plaines',
    'Oak Park': 'oak-park', 'Cicero': 'cicero', 'Berwyn': 'berwyn',
    'Oak Lawn': 'oak-lawn', 'Niles': 'niles', 'Park Ridge': 'park-ridge',
    'Elmwood Park': 'elmwood-park', 'Forest Park': 'forest-park',
    'Morton Grove': 'morton-grove',
}
HOOD_SLUGS = {
    'Logan Square': 'logan-square', 'Wicker Park': 'wicker-park',
    'Lincoln Park': 'lincoln-park', 'Hyde Park': 'hyde-park',
}
# the site markets a few neighbourhoods under names the boundary set files
# differently; keep the marketing name on the shape
RENAME = {'Douglas': 'Bronzeville', 'Lower West Side': 'Pilsen', 'Printers Row': 'South Loop'}


def dp(pts, eps):
    if len(pts) < 3:
        return pts
    def dist(p, a, b):
        (x, y), (x1, y1), (x2, y2) = p, a, b
        dx, dy = x2 - x1, y2 - y1
        if dx == 0 and dy == 0:
            return math.hypot(x - x1, y - y1)
        t = max(0, min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)))
        return math.hypot(x - (x1 + t * dx), y - (y1 + t * dy))
    dmax, idx = 0, 0
    for i in range(1, len(pts) - 1):
        d = dist(pts[i], pts[0], pts[-1])
        if d > dmax:
            dmax, idx = d, i
    if dmax > eps:
        return dp(pts[:idx + 1], eps)[:-1] + dp(pts[idx:], eps)
    return [pts[0], pts[-1]]


def clean(geom, eps=EPS):
    def ring(r):
        out = dp([tuple(p[:2]) for p in r], eps)
        if len(out) < 4:
            out = [tuple(p[:2]) for p in r]
        return [[round(x, ROUND), round(y, ROUND)] for x, y in out]
    if geom['type'] == 'Polygon':
        return {'type': 'Polygon', 'coordinates': [ring(r) for r in geom['coordinates']]}
    return {'type': 'MultiPolygon',
            'coordinates': [[ring(r) for r in poly] for poly in geom['coordinates']]}


def centroid(geom):
    """Area-weighted centroid of the largest ring — used to place labels."""
    polys = [geom['coordinates']] if geom['type'] == 'Polygon' else geom['coordinates']
    best, best_a = None, -1
    for p in polys:
        r = p[0]
        a = cx = cy = 0.0
        for i in range(len(r) - 1):
            x1, y1 = r[i]; x2, y2 = r[i + 1]
            cross = x1 * y2 - x2 * y1
            a += cross; cx += (x1 + x2) * cross; cy += (y1 + y2) * cross
        if abs(a) < 1e-12:
            continue
        a *= 0.5
        if abs(a) > best_a:
            best_a, best = abs(a), [round(cx / (6 * a), ROUND), round(cy / (6 * a), ROUND)]
    return best


feats = []
sub = json.load(open('suburbs.json'))
for f in sub['features']:
    name = f['properties']['BASENAME']
    g = clean(f['geometry'])
    if name == 'Chicago':
        # kept only as the dashed city limit; it is not hoverable
        feats.append({'type': 'Feature',
                      'properties': {'n': 'Chicago', 's': 'chicago', 'k': 'limit', 'c': centroid(g)},
                      'geometry': clean(f['geometry'], EPS * 3)})
        continue
    feats.append({'type': 'Feature',
                  'properties': {'n': name, 's': SUBURB_SLUGS.get(name), 'k': 'suburb', 'c': centroid(g)},
                  'geometry': g})

bm = json.load(open('bm.geojson'))
for f in bm['features']:
    raw = f['properties']['name']
    name = RENAME.get(raw, raw)
    g = clean(f['geometry'])
    feats.append({'type': 'Feature',
                  'properties': {'n': name, 's': HOOD_SLUGS.get(name), 'k': 'hood', 'c': centroid(g)},
                  'geometry': g})

fc = {'type': 'FeatureCollection', 'features': feats}
raw = json.dumps(fc, separators=(',', ':')).encode()
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'wb').write(raw)

n_sub = sum(1 for f in feats if f['properties']['k'] == 'suburb')
n_hood = sum(1 for f in feats if f['properties']['k'] == 'hood')
print(f'{len(feats)} features -> {n_sub} suburbs, {n_hood} neighbourhoods, 1 city limit')
print(f'{len(raw)/1024:.1f} KB raw / {len(gzip.compress(raw))/1024:.1f} KB gzipped')
print('slugged:', sorted(f['properties']['s'] for f in feats if f['properties']['s']))
