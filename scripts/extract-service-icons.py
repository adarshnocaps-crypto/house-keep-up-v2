"""Lift the service line-art icons off their baked-in terracotta background.

The generated art arrives as 16:9 JPEGs: dark line work sitting on a flat
circle (~luminance 172) inside a flat outer rectangle (~luminance 204). The
card backgrounds behind these icons range from pale pink to near-black cocoa,
so the artwork has to be transparent and recolourable rather than shipped with
its own background.

Luminance becomes alpha: anything at or above CUT is fully transparent, pure
black is fully opaque, and the ramp between keeps the anti-aliased line edges
smooth. The RGB is flattened to black so the page can tint it — light cards
use `filter: brightness(0)`, dark cards `brightness(0) invert(1)`.
"""
import os
from PIL import Image

SRC = os.path.expanduser('~/House keep up')
OUT = os.path.join(SRC, 'src/assets/images/services')
# The six sources do not share a background: circle luminance runs from 126 to
# 185 across the set, so a fixed cut turns the darker circles into solid ink.
# It is derived per image instead, from that image's own flat background peaks.
CUT_MARGIN = 16    # how far below the darkest flat background to start calling it ink
MARGIN = 0.04      # share of the square kept as breathing room around the art
SIZE = 900

PAIRS = {
    'Spray_bottle_cleaning_cloth': 'standard',
    'Wooden_bucket_overflowing_soap_suds': 'deep',
    'Cardboard_box_and_broom': 'move',
    'Office_building_icon_sparkles_2K': 'office',
    'Hard_hat_and_dustpan': 'post',
    'Calendar_with_refresh_clock': 'recurring',
}


def find(stem):
    for f in os.listdir(SRC):
        if f.startswith(stem) and f.lower().endswith(('.jpeg', '.jpg', '.png')):
            return os.path.join(SRC, f)
    return None


for stem, slug in PAIRS.items():
    path = find(stem)
    if not path:
        print(f'{slug:<10} SOURCE NOT FOUND ({stem})')
        continue

    im = Image.open(path).convert('RGB')
    w, h = im.size
    px = im.load()

    lum = lambda p: 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]
    # the outer rectangle and the inner circle are both large flat fields, so
    # they show up as the tallest histogram peaks; the darker one is the circle
    hist = {}
    for y in range(0, h, 9):
        for x in range(0, w, 9):
            v = int(lum(px[x, y])) // 4 * 4
            hist[v] = hist.get(v, 0) + 1
    total = sum(hist.values())
    peaks = [v for v, n in hist.items() if n > total * 0.02]
    cut = (min(peaks) if peaks else 150) - CUT_MARGIN

    alpha = Image.new('L', (w, h))
    ap = alpha.load()
    for y in range(h):
        for x in range(w):
            v = lum(px[x, y])
            ap[x, y] = 0 if v >= cut else int((cut - v) / cut * 255)

    # crop to the ink itself, then pad back out to a square so every icon
    # sits at the same optical size on the card
    box = alpha.getbbox()
    if not box:
        print(f'{slug:<10} NOTHING FOUND above the cut')
        continue
    alpha = alpha.crop(box)
    aw, ah = alpha.size
    side = int(max(aw, ah) * (1 + MARGIN * 2))
    square = Image.new('L', (side, side), 0)
    square.paste(alpha, ((side - aw) // 2, (side - ah) // 2))
    square = square.resize((SIZE, SIZE), Image.LANCZOS)

    out = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
    out.putalpha(square)                      # flat black, alpha carries the art
    dest = os.path.join(OUT, f'{slug}-line.png')
    out.save(dest, optimize=True)
    print(f'{slug:<10} cut {cut:>3}  ink {aw}x{ah} -> {SIZE}px, {os.path.getsize(dest)//1024} KB')

print('\ndone ->', OUT)
