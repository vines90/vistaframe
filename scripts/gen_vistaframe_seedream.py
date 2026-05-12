#!/usr/bin/env python3
"""
VistaFrame 站点配图：火山方舟 Seedream 文生图 + 落到 public/images/

遵循 seedream-imaging Skill：volcenginesdkarkruntime.Ark images.generate，
从 skill 的 references/credentials.env 或环境变量 ARK_API_KEY 读取密钥。

用法：
  cd vistaframe
  python3 scripts/gen_vistaframe_seedream.py [--dry-run]

依赖：
  pip install 'volcengine-python-sdk[ark]' requests
"""

from __future__ import annotations

import argparse
import os
import shutil
import sys
from pathlib import Path

import requests
from volcenginesdkarkruntime import Ark


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images"
DEFAULT_CRED = Path.home() / ".claude/skills/seedream-imaging/references/credentials.env"


BRAND_TAIL = (
    "professional architectural photography, clean contemporary style, subtle cool-blue mood, "
    "high clarity, realistic materials, no text, no watermark, sharp focus"
)


def load_ark_api_key(cred_path: Path | None) -> str:
    key = os.environ.get("ARK_API_KEY", "").strip()
    if key:
        return key
    paths = []
    if cred_path:
        paths.append(cred_path)
    paths.append(DEFAULT_CRED)
    for p in paths:
        if not p or not p.is_file():
            continue
        for line in p.read_text(encoding="utf-8", errors="ignore").splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if line.startswith("ARK_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise RuntimeError(
        "未找到 ARK_API_KEY：请先 export ARK_API_KEY=... "
        "或确保存在 ~/.claude/skills/seedream-imaging/references/credentials.env"
    )


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    r = requests.get(url, timeout=120)
    r.raise_for_status()
    dest.write_bytes(r.content)


def gen_one(client: Ark, *, rel: str, prompt: str, size: str, model: str, dry_run: bool) -> None:
    dest = OUT / rel
    print(f"[gen] {rel} size={size} model={model}")
    if dry_run:
        print("      (dry-run, skip)")
        return
    resp = client.images.generate(
        model=model,
        prompt=prompt,
        size=size,
        response_format="url",
        watermark=False,
    )
    url = resp.data[0].url
    download(url, dest)
    print(f"      -> wrote {dest}")


def dup_as(rel_from: str, rel_to: str, dry_run: bool) -> None:
    """将 -1 复写为 -2，避免双倍调用（详情页占位仍可用第二张）。"""
    a = OUT / rel_from
    b = OUT / rel_to
    print(f"[dup] {rel_from} -> {rel_to}")
    if dry_run:
        print("      (dry-run, skip)")
        return
    if not a.is_file():
        raise FileNotFoundError(f"missing source for dup: {a}")
    b.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(a, b)
    print(f"      -> wrote {b}")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--creds",
        type=Path,
        default=None,
        help=f"credentials.env 路径，默认读取 {DEFAULT_CRED}",
    )
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument(
        "--model",
        default="doubao-seedream-4-0-250828",
        help="Seedream model id（与 skill 表一致）",
    )
    args = ap.parse_args()

    api_key = load_ark_api_key(args.creds)
    os.environ.setdefault("ARK_API_KEY", api_key)

    client = Ark(
        base_url="https://ark.cn-beijing.volces.com/api/v3",
        api_key=api_key,
    )

    model = args.model

    hero_prompt = (
        "Modern luxury living room with oversized aluminum bifolding glass doors opened to panoramic ocean horizon at golden hour, "
        "dark charcoal slim aluminum frames, warm interior accents, cinematic wide composition, immersive hero background suitable for headline overlay "
        + BRAND_TAIL
    )

    jobs: list[tuple[str, str, str]] = [
        # rel, prompt, size
        ("hero.jpg", hero_prompt, "2848x1600"),
        (
            "og-image.jpg",
            "Modern facade of high-end building with expansive aluminum glazing and city skyline silhouette at dusk, "
            "left third slightly darker negative space for possible title overlay , corporate premium B2B manufacturer mood "
            + BRAND_TAIL,
            "2048x1024",
        ),
        (
            "products/windows/category.jpg",
            "Contemporary suburban house facade close-up featuring dark gray thermal-break aluminum casement windows, "
            "crisp glazing reflections, daylight, minimal landscaping "
            + BRAND_TAIL,
            "2304x1728",
        ),
        (
            "products/doors/category.jpg",
            "Premium modern aluminum pivot entry door with slim sidelites, brushed metal pull handle, stone-clad entryway, "
            "soft daylight "
            + BRAND_TAIL,
            "2304x1728",
        ),
        (
            "products/sunroom/category.jpg",
            "Architectural aluminum-framed conservatory sunroom with glass roof overlooking garden, minimalist furniture, lush plants, daylight "
            + BRAND_TAIL,
            "2304x1728",
        ),
        (
            "products/wooden-doors/category.jpg",
            "Interior solid wood veneered door with subtle aluminum trims and recessed panels, walnut grain, Scandinavian luxury hallway, indirect lighting "
            + BRAND_TAIL,
            "2304x1728",
        ),
        (
            "projects/hilton-la-1.jpg",
            "Downtown Los Angeles luxury Hilton-style hotel curtain wall glazing at dusk, warm lobby lights reflecting in glass panels, cinematic street-level framing "
            + BRAND_TAIL,
            "2848x1600",
        ),
        (
            "projects/beverly-hills-1.jpg",
            "Southern California hillside luxury villa showcasing wide aluminum sliding stacking doors beside infinity-edge pool overlooking city at sunset palm silhouettes "
            + BRAND_TAIL,
            "2848x1600",
        ),
        (
            "projects/dubai-marina-1.jpg",
            "Ultra-modern Dubai Marina residential tower façade at night sparkling windows reflecting yachts and water canals dramatic lighting luxury high-rise vibe "
            + BRAND_TAIL,
            "2848x1600",
        ),
        (
            "projects/sydney-harbour-1.jpg",
            "Sydney waterfront apartment showcase with panoramic aluminum glazing Sydney Opera House hinted in harbor background bright coastal daylight realism "
            + BRAND_TAIL,
            "2848x1600",
        ),
        (
            "projects/london-business-1.jpg",
            "London CBD office curtain wall façade with orderly aluminum-framed glazing panels stormy reflections contemporary commercial architecture realism "
            + BRAND_TAIL,
            "2848x1600",
        ),
        (
            "projects/marriott-toronto-1.jpg",
            "Urban Toronto Marriott-style hotel façade with insulated aluminum glazing winter atmosphere subtle snowfall on parapet warm interior glow realism "
            + BRAND_TAIL,
            "2848x1600",
        ),
        (
            "projects/singapore-sky-1.jpg",
            "Singapore luxury high-rise residential tower at blue hour densely lit windows futuristic marina skyline realism "
            + BRAND_TAIL,
            "2848x1600",
        ),
        (
            "projects/cape-town-1.jpg",
            "Cape Town ocean-facing resort villa expansive aluminum bifolding patio doors atlantic vista golden hour realism "
            + BRAND_TAIL,
            "2848x1600",
        ),
    ]

    dup_pairs = [
        ("projects/hilton-la-1.jpg", "projects/hilton-la-2.jpg"),
        ("projects/beverly-hills-1.jpg", "projects/beverly-hills-2.jpg"),
        ("projects/dubai-marina-1.jpg", "projects/dubai-marina-2.jpg"),
        ("projects/sydney-harbour-1.jpg", "projects/sydney-harbour-2.jpg"),
        ("projects/london-business-1.jpg", "projects/london-business-2.jpg"),
        ("projects/marriott-toronto-1.jpg", "projects/marriott-toronto-2.jpg"),
        ("projects/singapore-sky-1.jpg", "projects/singapore-sky-2.jpg"),
        ("projects/cape-town-1.jpg", "projects/cape-town-2.jpg"),
    ]

    for rel, prompt, size in jobs:
        try:
            gen_one(client, rel=rel, prompt=prompt, size=size, model=model, dry_run=args.dry_run)
        except Exception as e:  # noqa: BLE001
            print(f"ERROR {rel}: {e}", file=sys.stderr)
            return 1

    for a, b in dup_pairs:
        try:
            dup_as(a, b, args.dry_run)
        except Exception as e:  # noqa: BLE001
            print(f"ERROR dup {a}->{b}: {e}", file=sys.stderr)
            return 1

    print("\n完成。请将 Dev Server 重启或硬刷新缓存后查看 localhost:3000。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
