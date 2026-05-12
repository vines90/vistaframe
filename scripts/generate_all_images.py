#!/usr/bin/env python3
"""
VistaFrame 产品图片生成脚本 - 使用 Seedream AI
"""

import os
import sys
import requests
from pathlib import Path
from urllib.parse import urlparse

# ============================================================
# 配置
# ============================================================

# API 密钥（从环境变量或直接在代码中设置）
ARK_API_KEY = os.getenv("ARK_API_KEY", "").strip()
BASE_URL = "https://ark.cn-beijing.volces.com/api/v3"

# 输出目录
OUTPUT_DIR = Path("/Users/liyang/Documents/Work/MyProject/WEB/独立站/铝合金门窗品牌站/vistaframe/public/images")

# 品牌风格定义
BRAND_STYLE = "professional architectural photography, clean modern aesthetic, cool blue-gray tones matching corporate brand, high-end commercial photography, soft natural lighting, ultra-detailed 4K quality"

# ============================================================
# 图片配置列表
# ============================================================

IMAGES = [
    {
        "filename": "hero.jpg",
        "path": OUTPUT_DIR / "hero.jpg",
        "prompt": f"Modern luxury living room with floor-to-ceiling aluminum bifold doors opening to ocean view at sunset. Dark charcoal aluminum frames, seamless indoor-outdoor flow, minimalist interior, golden hour lighting. {BRAND_STYLE}",
        "size": "2848x1600",  # 16:9
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "products/windows/category.jpg",
        "path": OUTPUT_DIR / "products" / "windows" / "category.jpg",
        "prompt": f"Modern casement aluminum windows on contemporary house exterior. Sleek dark gray frames with large glass panes, clean architectural lines, blue sky background. {BRAND_STYLE}",
        "size": "2304x1728",  # 4:3
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "products/doors/category.jpg",
        "path": OUTPUT_DIR / "products" / "doors" / "category.jpg",
        "prompt": f"Grand modern aluminum entry door with sidelights on luxury villa. Dark charcoal frame, frosted glass panels, sleek chrome handle, stone facade. {BRAND_STYLE}",
        "size": "2304x1728",
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "products/sunroom/category.jpg",
        "path": OUTPUT_DIR / "products" / "sunroom" / "category.jpg",
        "prompt": f"Modern glass sunroom conservatory attached to luxury home. Aluminum frame structure, transparent glass roof and walls, indoor garden with furniture. {BRAND_STYLE}",
        "size": "2304x1728",
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "products/wooden-doors/category.jpg",
        "path": OUTPUT_DIR / "products" / "wooden-doors" / "category.jpg",
        "prompt": f"Premium solid wood interior door with aluminum frame accents. Walnut wood grain, sleek metal strips, minimalist Scandinavian interior. {BRAND_STYLE}",
        "size": "2304x1728",
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "projects/hilton-la.jpg",
        "path": OUTPUT_DIR / "projects" / "hilton-la.jpg",
        "prompt": f"Hilton luxury hotel exterior in downtown Los Angeles at twilight. Modern aluminum curtain wall windows, glass and steel architecture, urban skyline. {BRAND_STYLE}",
        "size": "2848x1600",
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "projects/beverly-hills.jpg",
        "path": OUTPUT_DIR / "projects" / "beverly-hills.jpg",
        "prompt": f"Beverly Hills luxury villa with expansive glass sliding doors to infinity pool. Indoor-outdoor living, palm trees, orange sunset sky. {BRAND_STYLE}",
        "size": "2848x1600",
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "projects/dubai-marina.jpg",
        "path": OUTPUT_DIR / "projects" / "dubai-marina.jpg",
        "prompt": f"Dubai Marina luxury high-rise residential tower at night. Floor-to-ceiling windows with warm interior lighting, waterfront reflection. {BRAND_STYLE}",
        "size": "2848x1600",
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "projects/sydney-harbour.jpg",
        "path": OUTPUT_DIR / "projects" / "sydney-harbour.jpg",
        "prompt": f"Sydney waterfront residence with panoramic harbor views. Modern aluminum windows, Opera House in background, natural daylight. {BRAND_STYLE}",
        "size": "2848x1600",
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "og-image.jpg",
        "path": OUTPUT_DIR / "og-image.jpg",
        "prompt": f"VistaFrame aluminum windows brand hero. Modern architectural glass facade with city skyline at dusk. Professional B2B manufacturing aesthetic, clean blue and white with subtle orange accent. {BRAND_STYLE}",
        "size": "1200x630",
        "model": "doubao-seedream-4-0-250828"
    }
]

# ============================================================
# 功能函数
# ============================================================

def generate_image(image_config):
    """调用 Seedream API 生成单张图片"""
    filename = image_config["filename"]
    prompt = image_config["prompt"]
    size = image_config["size"]
    model = image_config["model"]

    print(f"\n🎨 Generating: {filename}")
    print(f"   Size: {size}")
    print(f"   Model: {model}")

    try:
        headers = {
            "Authorization": f"Bearer {ARK_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": model,
            "prompt": prompt,
            "size": size,
            "response_format": "url",
            "watermark": False
        }

        response = requests.post(
            f"{BASE_URL}/images/generations",
            headers=headers,
            json=payload,
            timeout=300
        )

        if response.status_code == 200:
            data = response.json()
            if data.get("data") and len(data["data"]) > 0:
                image_url = data["data"][0].get("url")
                print(f"   ✅ Generated: {image_url[:50]}...")
                return image_url
            else:
                print(f"   ⚠️ No image URL in response")
                print(f"   Response: {data}")
                return None
        else:
            print(f"   ❌ API Error: {response.status_code}")
            print(f"   Response: {response.text[:200]}")
            return None

    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return None

def download_image(url, filepath):
    """下载图片到本地"""
    try:
        response = requests.get(url, timeout=60)
        if response.status_code == 200:
            filepath.parent.mkdir(parents=True, exist_ok=True)
            with open(filepath, "wb") as f:
                f.write(response.content)
            print(f"   💾 Saved: {filepath}")
            return True
        else:
            print(f"   ❌ Download failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"   ❌ Download error: {str(e)}")
        return False

def generate_single(filename=None):
    """生成单张图片（用于测试）"""
    if filename:
        if not ARK_API_KEY:
            print(
                "错误：未设置 ARK_API_KEY。请 export ARK_API_KEY=…",
                file=sys.stderr,
            )
            sys.exit(1)
        config = next((img for img in IMAGES if img["filename"] == filename), None)
        if config:
            url = generate_image(config)
            if url:
                download_image(url, config["path"])
        else:
            print(f"Image config not found: {filename}")
    else:
        print("Available images:")
        for img in IMAGES:
            print(f"  - {img['filename']}")

def generate_all():
    """生成所有图片"""
    if not ARK_API_KEY:
        print(
            "错误：未设置 ARK_API_KEY。请 export ARK_API_KEY=…",
            file=sys.stderr,
        )
        sys.exit(1)
    print("=" * 70)
    print("VistaFrame Product Image Generation - Seedream AI")
    print("=" * 70)
    print(f"Total images to generate: {len(IMAGES)}")
    print(f"Output directory: {OUTPUT_DIR}")
    print("=" * 70)

    success_count = 0
    failed_count = 0
    results = []

    for img_config in IMAGES:
        url = generate_image(img_config)

        if url:
            if download_image(url, img_config["path"]):
                success_count += 1
                results.append({
                    "filename": img_config["filename"],
                    "status": "success",
                    "path": str(img_config["path"])
                })
            else:
                failed_count += 1
                results.append({
                    "filename": img_config["filename"],
                    "status": "download_failed",
                    "url": url
                })
        else:
            failed_count += 1
            results.append({
                "filename": img_config["filename"],
                "status": "generation_failed"
            })

    print("\n" + "=" * 70)
    print(f"Complete: {success_count} success, {failed_count} failed")
    print("=" * 70)

    # 输出结果汇总
    print("\n📋 Results:")
    for r in results:
        status_icon = "✅" if r["status"] == "success" else "❌"
        print(f"   {status_icon} {r['filename']}")
        if r["status"] == "success":
            print(f"      → {r['path']}")

    return results

# ============================================================
# 主程序
# ============================================================

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Generate VistaFrame product images")
    parser.add_argument("--single", "-s", help="Generate single image by filename")
    parser.add_argument("--list", "-l", action="store_true", help="List available images")

    args = parser.parse_args()

    if args.list:
        print("Available images:")
        for img in IMAGES:
            print(f"  - {img['filename']}")
    elif args.single:
        generate_single(args.single)
    else:
        generate_all()
