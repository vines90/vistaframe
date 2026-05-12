#!/bin/bash
# VistaFrame 图片生成脚本启动器

cd "$(dirname "$0")/.."

echo "=========================================="
echo "VistaFrame Image Generation"
echo "=========================================="
echo ""

# 检查 Python
echo "Checking Python..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 not found. Please install Python 3.8+"
    exit 1
fi

echo "✅ Python found: $(python3 --version)"
echo ""

# 检查依赖
echo "Checking dependencies..."
if ! python3 -c "import requests" 2>/dev/null; then
    echo "📦 Installing requests..."
    pip3 install requests -q
fi
echo "✅ Dependencies ready"
echo ""

# 显示选项
echo "Choose action:"
echo "  1) Generate ALL images"
echo "  2) Generate single image"
echo "  3) List available images"
echo "  4) Exit"
echo ""

read -p "Enter choice [1-4]: " choice

case $choice in
    1)
        echo ""
        echo "🚀 Generating all images..."
        python3 scripts/generate_all_images.py
        ;;
    2)
        echo ""
        echo "Available images:"
        python3 scripts/generate_all_images.py --list
        echo ""
        read -p "Enter filename (e.g., hero.jpg): " filename
        echo ""
        echo "🚀 Generating $filename..."
        python3 scripts/generate_all_images.py --single "$filename"
        ;;
    3)
        python3 scripts/generate_all_images.py --list
        ;;
    4)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac
