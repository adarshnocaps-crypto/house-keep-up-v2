#!/usr/bin/env bash
# Blurs the AI-generator sparkle watermark out of the maid feature media.
#
# The watermarks sit ~89% across and ~83% down the frame — not in the corner —
# so a CSS overlay pinned to the card's edge never lands on them once
# object-fit: cover crops the sides. Patching the source files is what works.
#
# Both outputs are committed, so this only needs re-running if the source
# media is regenerated. Requires ffmpeg + python3/Pillow.
set -euo pipefail

cd "$(dirname "$0")/.."
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

# --- video: 1920x1080, single sparkle centred near (1766, 931) -------------
python3 - "$tmp/mask.png" <<'PY'
import sys
from PIL import Image, ImageDraw, ImageFilter
W, H = 320, 270
m = Image.new('L', (W, H), 0)
ImageDraw.Draw(m).ellipse([30, 30, W - 30, H - 30], fill=255)
# feathering is what keeps the patch from reading as a rectangle
m.filter(ImageFilter.GaussianBlur(26)).save(sys.argv[1])
PY

ffmpeg -v error -i src/assets/videos/maid-glass-feature-original.mp4 \
  -i "$tmp/mask.png" \
  -filter_complex "[0:v]crop=w=320:h=270:x=1606:y=796,gblur=sigma=34[blur];[blur][1:v]alphamerge[soft];[0:v][soft]overlay=x=1606:y=796" \
  -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart -an \
  -y src/assets/videos/maid-glass-feature.mp4

# --- still: the frame the site actually renders ----------------------------
# Pulled from the cleaned clip above, so it inherits the blurred watermark
# rather than needing its own pass.
ffmpeg -v error -ss 5 -i src/assets/videos/maid-glass-feature.mp4 \
  -vframes 1 -q:v 2 -y "$tmp/frame.jpg"

python3 - "$tmp/frame.jpg" <<'PY'
import sys
from PIL import Image
Image.open(sys.argv[1]).save(
    'src/assets/images/home/maid-glass-feature-frame.jpg',
    quality=88, optimize=True, progressive=True)
PY

echo "watermark stripped; frame regenerated"
