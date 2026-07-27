"""
IGU logo ko official brochure PDF se nikaal ke saaf transparent logo.png banata hai.
Kaam: black background hatao, dark halo hatao, edges anti-aliased rakho, 4x upscale.

Chalane ke liye:  python make_logo.py
"""
import io
import numpy as np
import fitz
from PIL import Image, ImageFilter
from collections import deque
import urllib.request

PDF_URL = ("https://assets.collegedunia.com/public/image/"
           "Final_Information_Brochure_Ph_D_2024_25_3__d5d7677bc9c9c897b7a9cb064d52192c.pdf")
XREF = 261          # page 6 ka 295x295 logo (sabse bada available version)
UPSCALE = 4


def fetch_source():
    req = urllib.request.Request(PDF_URL, headers={"User-Agent": "Mozilla/5.0"})
    data = urllib.request.urlopen(req, timeout=60).read()
    doc = fitz.open(stream=data, filetype="pdf")
    info = doc.extract_image(XREF)
    return Image.open(io.BytesIO(info["image"])).convert("RGB")


def background_mask(a):
    """Border se connected dark + low-saturation pixels = background."""
    bright = a.max(axis=2)
    sat = a.max(axis=2) - a.min(axis=2)
    cand = (bright < 150) & (sat < 70)
    H, W = cand.shape
    bg = np.zeros((H, W), bool)
    q = deque()

    def push(y, x):
        if cand[y, x] and not bg[y, x]:
            bg[y, x] = True
            q.append((y, x))

    for x in range(W):
        push(0, x); push(H - 1, x)
    for y in range(H):
        push(y, 0); push(y, W - 1)
    while q:
        cy, cx = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < H and 0 <= nx < W:
                push(ny, nx)
    return bg


def erode(mask, times=1):
    """foreground ko 1-2 px andar khiskao -> JPEG ka dark halo nikal jata hai."""
    m = mask.copy()
    for _ in range(times):
        e = m.copy()
        e[1:, :] &= m[:-1, :]; e[:-1, :] &= m[1:, :]
        e[:, 1:] &= m[:, :-1]; e[:, :-1] &= m[:, 1:]
        m = e
    return m


def bleed_colors(rgb, known, rounds=10):
    """Background wale area me aas-paas ke rang bhar do, taki upscale par kaala na fatke."""
    vals = rgb.astype(np.float32).copy()
    vals[~known] = 0
    k = known.copy()
    for _ in range(rounds):
        s = np.zeros_like(vals)
        c = np.zeros(k.shape, np.float32)
        for ax, sh in ((0, 1), (0, -1), (1, 1), (1, -1)):
            s += np.roll(vals, sh, axis=ax)
            c += np.roll(k.astype(np.float32), sh, axis=ax)
        new = (~k) & (c > 0)
        if not new.any():
            break
        vals[new] = s[new] / c[new][:, None]
        k |= new
    return vals


def main():
    im = fetch_source()
    a = np.asarray(im).astype(np.int16)
    print("source:", im.size)

    bg = background_mask(a)
    fg = erode(~bg, times=1)
    print(f"background {bg.mean()*100:.1f}%  ->  foreground {fg.mean()*100:.1f}%")

    rgb = bleed_colors(np.asarray(im), fg)
    rgb_im = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8), "RGB")
    alpha_im = Image.fromarray((fg * 255).astype(np.uint8), "L")

    # content par crop
    ys, xs = np.where(fg)
    box = (xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)
    rgb_im, alpha_im = rgb_im.crop(box), alpha_im.crop(box)
    w, h = rgb_im.size
    side = max(w, h)

    # square canvas
    rgb_sq = Image.new("RGB", (side, side), (255, 255, 255))
    a_sq = Image.new("L", (side, side), 0)
    rgb_sq.paste(rgb_im, ((side - w) // 2, (side - h) // 2))
    a_sq.paste(alpha_im, ((side - w) // 2, (side - h) // 2))

    # upscale: rang LANCZOS se, alpha smooth (anti-aliased) edges ke liye
    big = side * UPSCALE
    rgb_up = rgb_sq.resize((big, big), Image.LANCZOS)
    rgb_up = rgb_up.filter(ImageFilter.UnsharpMask(radius=2, percent=70, threshold=4))
    a_up = a_sq.resize((big, big), Image.BICUBIC).filter(ImageFilter.GaussianBlur(1.6))

    # alpha ko thoda contrast do par edge soft rahe (no jaggies)
    an = np.asarray(a_up).astype(np.float32) / 255.0
    an = np.clip((an - 0.42) / 0.30, 0, 1)
    a_up = Image.fromarray((an * 255).astype(np.uint8), "L")

    out = rgb_up.convert("RGBA")
    out.putalpha(a_up)
    out.save("logo.png", optimize=True)
    print("saved logo.png:", out.size)


if __name__ == "__main__":
    main()
