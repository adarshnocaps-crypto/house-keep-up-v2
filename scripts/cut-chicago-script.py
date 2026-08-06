"""Lift the hand-lettered "Chicago" script off its baked-in mint background.

Unlike the service icons, this art is not flattened to black: the lettering is
white with a dark-green drop shadow, and that two-tone depth is the point. So
the mint is keyed out by colour distance while the original RGB is preserved.

The source also carries decorative border rules and corner flourishes. The
header supplies its own hairlines either side of the wordmark, so only the
lettering itself is kept — the crop is derived from the opaque pixels after
keying, with the thin rules removed first by ignoring anything outside the
central band.
"""
import os
from PIL import Image, ImageFilter
import numpy as np

SRC = os.path.expanduser('~/House keep up')
OUT = os.path.join(SRC, 'src/assets/images/brand')
STEM = 'image.png_2K_'

BG = np.array([185, 212, 200], dtype=np.float32)
# distance at which a pixel is still pure background, and where it becomes
# fully opaque ink; between the two the alpha ramps so edges stay smooth
NEAR = 26.0
FAR = 62.0
# the border rules sit in the outer margins; the lettering occupies the middle
# The 'g' descender and its raised shadow run to ~0.897; the full-width bottom
# rule starts at 0.900. Cutting at 0.86 sliced the tail off flat.
BAND = (0.19, 0.898)
# footer variant: --color-cream fill kept, but the raised edge is dropped to
# --color-primary-deep so it still separates the strokes on a --color-primary panel
FILL = (255, 253, 247)
EDGE_ON_DARK = (4, 38, 28)
# close-then-open window: wipes speckle a couple of pixels across while the
# thick letter strokes come through unchanged (odd values only)
GROW = 5
PAD = 0.02
# the header draws this at ~158px; 640 stays crisp past 3x without the weight
WIDTH = 640


def find():
    for f in os.listdir(SRC):
        if f.startswith(STEM) and f.lower().endswith(('.jpeg', '.jpg', '.png')):
            return os.path.join(SRC, f)
    return None


def main():
    src = find()
    if not src:
        raise SystemExit(f'no source matching {STEM}* in {SRC}')
    im = Image.open(src).convert('RGB')
    rgb = np.asarray(im, dtype=np.float32)
    h, w = rgb.shape[:2]

    dist = np.sqrt(((rgb - BG) ** 2).sum(axis=2))
    alpha = np.clip((dist - NEAR) / (FAR - NEAR), 0.0, 1.0)

    # the decorative rules and corner flourishes live outside the middle band
    band = np.zeros_like(alpha, dtype=bool)
    band[int(h * BAND[0]):int(h * BAND[1]), :] = True
    alpha[~band] = 0.0

    # Close small gaps first so the script's separate strokes read as one body.
    solid = alpha > 0.5
    mask = Image.fromarray((solid * 255).astype(np.uint8), 'L')
    grown = mask.filter(ImageFilter.MaxFilter(GROW))
    joined = np.asarray(grown.filter(ImageFilter.MinFilter(GROW))) > 127

    # Then keep only components connected to the lettering. Decorative sparkles
    # survive the morphology pass (they are far larger than texture speckle), so
    # area alone will not drop them — but they never touch the word. Flood from
    # the largest row's centre of mass outward and discard whatever is missed.
    kept = np.zeros_like(joined)
    seed_row = int(np.argmax(joined.sum(axis=1)))
    seed_col = int(np.flatnonzero(joined[seed_row]).mean())
    stack = [(seed_row, seed_col)]
    kept[seed_row, seed_col] = True
    while stack:
        r, c = stack.pop()
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < h and 0 <= nc < w and joined[nr, nc] and not kept[nr, nc]:
                kept[nr, nc] = True
                stack.append((nr, nc))
    alpha[~kept] = 0.0

    solid = alpha > 0.5
    ys, xs = np.nonzero(solid)
    if len(xs) == 0:
        raise SystemExit('keyed everything out — check BG/NEAR/FAR')
    pad = int(min(h, w) * PAD)
    x0, x1 = max(0, xs.min() - pad), min(w, xs.max() + pad + 1)
    y0, y1 = max(0, ys.min() - pad), min(h, ys.max() + pad + 1)

    os.makedirs(OUT, exist_ok=True)

    def emit(pixels, name):
        out = np.dstack([pixels, alpha * 255.0]).astype(np.uint8)[y0:y1, x0:x1]
        img = Image.fromarray(out, 'RGBA')
        img = img.resize((WIDTH, round(img.height * WIDTH / img.width)), Image.LANCZOS)
        dest = os.path.join(OUT, name)
        img.save(dest, optimize=True)
        print(f'{dest}  {img.width}x{img.height}')

    emit(rgb, 'chicago-script.png')

    # The footer sits on the same dark green as the art's raised edge, so that
    # edge would vanish into the background. The lettering is two-tone and
    # separable by luminance, so the fill stays cream (it has to carry the word
    # against the dark panel) while the edge is darkened to keep the letters
    # from bleeding into each other.
    lum = rgb @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
    is_fill = lum > (lum.max() + lum.min()) / 2
    recoloured = np.where(is_fill[..., None], np.array(FILL, dtype=np.float32),
                          np.array(EDGE_ON_DARK, dtype=np.float32))
    emit(recoloured, 'chicago-script-cream.png')


if __name__ == '__main__':
    main()
