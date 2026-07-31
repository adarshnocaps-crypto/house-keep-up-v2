"""Key the sky out of the house photo so the roofline itself can occlude.

A rectangular photo can only ever cut things off along a straight edge. To have
the maids stand behind the *roof*, the sky has to be transparent — then the
house silhouette does the occluding.

Flood-fills inward from the top edge rather than thresholding the whole image,
so blue window glass and shadowed siding are never touched: only sky that is
actually connected to the top of the frame gets removed.
"""
from collections import deque
from PIL import Image, ImageFilter

SRC = '/Users/amritmohanty/House keep up/src/assets/images/areas/forest-park.jpg'
OUT = '/Users/amritmohanty/House keep up/src/assets/images/areas/forest-park-cutout.webp'
TOLERANCE = 68          # how far a pixel may stray from the sampled sky colour
FEATHER = 1.1           # px of blur on the alpha edge, to kill jaggies

img = Image.open(SRC).convert('RGB')
w, h = img.size
px = img.load()

# sample sky from a few points along the top edge, away from the roof peaks
samples = [px[x, 2] for x in range(0, w, max(1, w // 24))]
samples.sort(key=lambda c: -(c[2] - c[0]))          # bluest first
sky = samples[len(samples) // 4]
print(f'source {w}x{h}  sky reference rgb{sky}')


def is_sky(c):
    dr, dg, db = c[0] - sky[0], c[1] - sky[1], c[2] - sky[2]
    return (dr * dr + dg * dg + db * db) ** 0.5 < TOLERANCE


# flood fill inward from every top-edge pixel that reads as sky
alpha = Image.new('L', (w, h), 255)
ap = alpha.load()
seen = bytearray(w * h)
queue = deque()
for x in range(w):
    if is_sky(px[x, 0]):
        queue.append((x, 0))
        seen[x] = 1

while queue:
    x, y = queue.popleft()
    ap[x, y] = 0
    for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
        if 0 <= nx < w and 0 <= ny < h and not seen[ny * w + nx] and is_sky(px[nx, ny]):
            seen[ny * w + nx] = 1
            queue.append((nx, ny))

cleared = sum(1 for i in range(w * h) if seen[i])
print(f'sky removed: {cleared} px ({cleared / (w * h) * 100:.1f}% of frame)')

alpha = alpha.filter(ImageFilter.GaussianBlur(FEATHER))
out = img.convert('RGBA')
out.putalpha(alpha)
out.save(OUT, 'WEBP', quality=82, method=6)

# report where the roof silhouette actually starts, per column, so the CSS can
# be positioned against a real number rather than guesswork
first_solid = min((y for x in range(0, w, 7)
                   for y in range(h) if ap[x, y] > 128), default=0)
print(f'highest opaque pixel (roof peak): y={first_solid} of {h} '
      f'({first_solid / h * 100:.1f}% down)')
print('wrote', OUT)
