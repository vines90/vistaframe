#!/usr/bin/env python3
"""
VistaFrame 品牌图片生成脚本
生成高质量的产品和场景图片
"""

import os
import json

# 图片配置
OUTPUT_DIR = "/Users/liyang/Documents/Work/MyProject/WEB/独立站/铝合金门窗品牌站/vistaframe/public/images"

# 品牌风格定义
BRAND_STYLE = """Professional architectural photography style. Clean, modern aesthetic with cool blue-gray tones matching #1a365d brand color. High-end commercial photography look with soft natural lighting. Ultra-detailed, 4K quality."""

IMAGES = {
    # Hero 背景大图
    "hero.jpg": {
        "prompt": f"Modern luxury living room interior with floor-to-ceiling aluminum bifold doors opening to a panoramic ocean view. Sleek black-framed glass doors creating seamless indoor-outdoor flow. Minimalist contemporary architecture. Sunset golden hour lighting. High-end residential architecture. {BRAND_STYLE}",
        "size": "1920x1080"
    },

    # 产品分类图
    "products/windows/category.jpg": {
        "prompt": f"Modern casement aluminum windows on contemporary house exterior. Sleek dark gray aluminum frames with large glass panes. Clean architectural lines. Blue sky background. Professional product photography. {BRAND_STYLE}",
        "size": "800x600"
    },

    "products/doors/category.jpg": {
        "prompt": f"Grand modern aluminum entry door with sidelights. Dark charcoal frame, frosted glass panels. Contemporary villa entrance. Stone facade. Professional architectural photography. {BRAND_STYLE}",
        "size": "800x600"
    },

    "products/sunroom/category.jpg": {
        "prompt": f"Modern glass sunroom conservatory attached to luxury home. Aluminum frame structure with transparent glass roof. Indoor garden with comfortable furniture. Natural daylight flooding in. {BRAND_STYLE}",
        "size": "800x600"
    },

    "products/wooden-doors/category.jpg": {
        "prompt": f"Premium solid wood interior door with modern aluminum frame accents. Walnut wood grain texture with sleek metal handle. Minimalist luxury residential setting. Warm ambient lighting. {BRAND_STYLE}",
        "size": "800x600"
    },

    # 项目案例图
    "projects/hilton-la-1.jpg": {
        "prompt": f"Hilton hotel exterior facade with modern aluminum curtain wall windows. Downtown Los Angeles skyscraper. Glass and steel architecture. Blue hour twilight photography. Urban luxury. {BRAND_STYLE}",
        "size": "800x600"
    },

    "projects/beverly-hills-1.jpg": {
        "prompt": f"Beverly Hills luxury villa with expansive glass sliding doors opening to infinity pool. Indoor-outdoor living space. Palm trees, sunset sky. High-end residential architecture. {BRAND_STYLE}",
        "size": "800x600"
    },

    "projects/dubai-marina-1.jpg": {
        "prompt": f"Dubai Marina luxury high-rise residential tower at night. Floor-to-ceiling windows with warm interior lighting. Waterfront reflection. Modern Middle Eastern architecture. {BRAND_STYLE}",
        "size": "800x600"
    },

    "projects/sydney-harbour-1.jpg": {
        "prompt": f"Sydney waterfront residence with panoramic harbor views. Modern aluminum windows with operable sections. Opera House in background. Natural daylight. Australian contemporary architecture. {BRAND_STYLE}",
        "size": "800x600"
    },

    "projects/london-business-1.jpg": {
        "prompt": f"London modern office building exterior with glass curtain wall. Aluminum window frames in grid pattern. Rainy day, reflections on glass. Contemporary commercial architecture. {BRAND_STYLE}",
        "size": "800x600"
    },

    "projects/marriott-toronto-1.jpg": {
        "prompt": f"Marriott hotel downtown Toronto exterior. Modern window systems with thermal break technology. Winter scene, snow on window ledges. Urban hospitality architecture. {BRAND_STYLE}",
        "size": "800x600"
    },

    "projects/singapore-sky-1.jpg": {
        "prompt": f"Singapore luxury high-rise condominium with floor-to-ceiling windows. City skyline view, Marina Bay in background. Night photography with interior lights. Tropical modern architecture. {BRAND_STYLE}",
        "size": "800x600"
    },

    "projects/cape-town-1.jpg": {
        "prompt": f"Cape Town coastal resort villa with aluminum folding doors opening to ocean view. Beachfront luxury residence. Atlantic ocean backdrop. Golden hour sunset. {BRAND_STYLE}",
        "size": "800x600"
    },

    # OG 社交分享图
    "og-image.jpg": {
        "prompt": f"VistaFrame aluminum windows and doors brand hero image. Modern architectural scene with elegant glass facade. Professional B2B manufacturing company aesthetic. Clean blue and white color scheme with subtle orange accent. Text space on left side. {BRAND_STYLE}",
        "size": "1200x630"
    }
}

def generate_image(filename, config):
    """生成单张图片"""
    filepath = os.path.join(OUTPUT_DIR, filename)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)

    print(f"\n🖼️  Generating: {filename}")
    print(f"   Prompt: {config['prompt'][:100]}...")
    print(f"   Size: {config['size']}")

    # 这里使用 GenerateImage 工具
    # 由于无法直接在 Python 中调用 MCP 工具，我们输出配置供外部使用
    return {
        "filename": filename,
        "filepath": filepath,
        "prompt": config["prompt"],
        "size": config["size"]
    }

def main():
    print("=" * 60)
    print("VistaFrame Image Generation Script")
    print("=" * 60)

    configs = []
    for filename, config in IMAGES.items():
        configs.append(generate_image(filename, config))

    # 输出配置 JSON 供批量生成使用
    output_config = {
        "brand_style": BRAND_STYLE,
        "images": configs
    }

    config_path = os.path.join(OUTPUT_DIR, "image-config.json")
    with open(config_path, "w") as f:
        json.dump(output_config, f, indent=2)

    print(f"\n{'=' * 60}")
    print(f"Configuration saved to: {config_path}")
    print(f"Total images to generate: {len(configs)}")
    print("=" * 60)

    return configs

if __name__ == "__main__":
    configs = main()
