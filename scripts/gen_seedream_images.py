#!/usr/bin/env python3
"""
使用 Seedream AI 生成 VistaFrame 品牌产品图片
"""

import os
import sys
import requests
from pathlib import Path

# API 配置
ARK_API_KEY = os.getenv("ARK_API_KEY", "").strip()
BASE_URL = "https://ark.cn-beijing.volces.com/api/v3"

# 输出目录
OUTPUT_DIR = Path("/Users/liyang/Documents/Work/MyProject/WEB/独立站/铝合金门窗品牌站/vistaframe/public/images")

# 品牌风格定义
BRAND_STYLE = "Professional architectural photography style, clean modern aesthetic, cool blue-gray tones matching #1a365d brand color, high-end commercial photography look with soft natural lighting, ultra-detailed 4K quality"

# 需要生成的图片配置
IMAGES = [
    {
        "filename": "hero.jpg",
        "prompt": f"Modern luxury living room interior with floor-to-ceiling aluminum bifold doors fully opened to a panoramic ocean view at sunset. Sleek dark charcoal aluminum frames with large glass panes creating seamless indoor-outdoor flow. Minimalist contemporary interior with light gray sofa and wooden floors. Golden hour lighting with warm sun rays. {BRAND_STYLE}",
        "size": "16:9",
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "products/windows/category.jpg",
        "prompt": f"Modern casement aluminum windows on contemporary house exterior facade. Sleek dark gray powder-coated aluminum frames with large clear glass panes. Clean architectural lines, minimalist design against blue sky. {BRAND_STYLE}",
        "size": "4:3",
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "products/doors/category.jpg",
        "prompt": f"Grand modern aluminum entry door system with sidelights on contemporary luxury villa. Dark charcoal aluminum frame with frosted glass panels and sleek chrome handle. Stone facade entrance. {BRAND_STYLE}",
        "size": "4:3",
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "products/sunroom/category.jpg",
        "prompt": f"Modern glass sunroom conservatory attached to luxury contemporary home. Aluminum frame structure with transparent glass roof and walls. Indoor garden with comfortable modern furniture and green plants. Natural daylight flooding the space. {BRAND_STYLE}",
        "size": "4:3",
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "products/wooden-doors/category.jpg",
        "prompt": f"Premium solid wood interior door with modern aluminum frame accents in luxury residential setting. Rich walnut wood grain texture with sleek horizontal aluminum strips. Minimalist Scandinavian interior design. {BRAND_STYLE}",
        "size": "4:3",
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "projects/hilton-la.jpg",
        "prompt": f"Hilton luxury hotel exterior facade in downtown Los Angeles at twilight blue hour. Modern aluminum curtain wall windows reflecting city lights. Glass and steel contemporary architecture. Urban skyline. {BRAND_STYLE}",
        "size": "16:9",
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "projects/beverly-hills.jpg",
        "prompt": f"Beverly Hills luxury villa with expansive aluminum sliding glass doors opened to infinity pool. Indoor-outdoor living space with modern furniture. Palm trees silhouetted against orange sunset sky. {BRAND_STYLE}",
        "size": "16:9",
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "projects/dubai-marina.jpg",
        "prompt": f"Dubai Marina luxury high-rise residential tower at night. Floor-to-ceiling aluminum windows with warm golden interior lighting. Waterfront reflection in marina with yachts. {BRAND_STYLE}",
        "size": "16:9",
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "projects/sydney-harbour.jpg",
        "prompt": f"Sydney waterfront residence with panoramic harbor views. Modern aluminum windows with operable sections. Opera House visible in background. Natural daylight. Australian contemporary architecture. {BRAND_STYLE}",
        "size": "16:9",
        "model": "doubao-seedream-4-0-250828"
    },
    {
        "filename": "og-image.jpg",
        "prompt": f"VistaFrame aluminum windows and doors brand hero image. Modern architectural scene with elegant glass facade overlooking city skyline at dusk. Professional B2B manufacturing company aesthetic. Clean blue and white color scheme with subtle orange accent. {BRAND_STYLE}",
        "size": "16:9",
        "model": "doubao-seedream-4-0-250828"
    }
]

def get_size_pixels(size_ratio: str, resolution: str = "2K"):
    """将比例转换为像素尺寸"""
    sizes = {
        "1:1": "2048x2048",
        "16:9": "2848x1600",
        "9:16": "1600x2848",
        "4:3": "2304x1728",
        "3:4": "1728x2304",
        "21:9": "3136x1344",
    }
    return sizes.get(size_ratio, "2048x2048")

def generate_image(image_config):
    """使用 Seedream API 生成单张图片"""
    filename = image_config["filename"]
    prompt = image_config["prompt"]
    size_ratio = image_config.get("size", "1:1")
    model = image_config.get("model", "doubao-seedream-4-0-250828")

    # 转换尺寸
    size_pixels = get_size_pixels(size_ratio)

    print(f"\n🎨 Generating: {filename}")
    print(f"   Size: {size_ratio} ({size_pixels})")
    print(f"   Model: {model}")

    try:
        headers = {
            "Authorization": f"Bearer {ARK_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": model,
            "prompt": prompt,
            "size": size_pixels,
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
                print(f"   ✅ Generated: {image_url[:60]}...")
                return image_url
            else:
                print(f"   ⚠️ No image URL in response")
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

def main():
    if not ARK_API_KEY:
        print(
            "错误：未设置 ARK_API_KEY。请 export ARK_API_KEY=… 或通过 seedream-imaging skill 的 credentials.env 加载。",
            file=sys.stderr,
        )
        sys.exit(1)
    print("=" * 70)
    print("VistaFrame Product Image Generation - Seedream AI")
    print("=" * 70)

    success_count = 0
    failed_count = 0
    results = []

    for img_config in IMAGES:
        url = generate_image(img_config)

        if url:
            filepath = OUTPUT_DIR / img_config["filename"]
            if download_image(url, filepath):
                success_count += 1
                results.append({
                    "filename": img_config["filename"],
                    "status": "success",
                    "path": str(filepath)
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
    print(f"Generation Complete: {success_count} success, {failed_count} failed")
    print("=" * 70)

    # 输出结果汇总
    print("\n📋 Generated Files:")
    for r in results:
        status_icon = "✅" if r["status"] == "success" else "❌"
        print(f"   {status_icon} {r['filename']}")

    return results

if __name__ == "__main__":
    results = main()
