# VistaFrame 图片生成指南

## 快速开始

### 方法一：使用交互式脚本（推荐）

```bash
cd /Users/liyang/Documents/Work/MyProject/WEB/独立站/铝合金门窗品牌站/vistaframe

# 运行交互式脚本
bash scripts/run-image-gen.sh
```

按提示选择操作：
- 输入 `1` 生成所有图片
- 输入 `2` 生成单张图片
- 输入 `3` 查看可用图片列表

### 方法二：直接使用 Python

```bash
cd /Users/liyang/Documents/Work/MyProject/WEB/独立站/铝合金门窗品牌站/vistaframe

# 安装依赖
pip3 install requests

# 生成所有图片
python3 scripts/generate_all_images.py

# 生成单张图片
python3 scripts/generate_all_images.py --single hero.jpg

# 查看可用图片列表
python3 scripts/generate_all_images.py --list
```

## 图片清单

| 文件名 | 用途 | 尺寸 |
|--------|------|------|
| `hero.jpg` | 首页全屏背景 | 2848x1600 (16:9) |
| `products/windows/category.jpg` | 铝合金窗分类图 | 2304x1728 (4:3) |
| `products/doors/category.jpg` | 铝合金门分类图 | 2304x1728 (4:3) |
| `products/sunroom/category.jpg` | 阳光房分类图 | 2304x1728 (4:3) |
| `products/wooden-doors/category.jpg` | 木门分类图 | 2304x1728 (4:3) |
| `projects/hilton-la.jpg` | 希尔顿酒店项目 | 2848x1600 (16:9) |
| `projects/beverly-hills.jpg` | 比佛利山庄项目 | 2848x1600 (16:9) |
| `projects/dubai-marina.jpg` | 迪拜 Marina 项目 | 2848x1600 (16:9) |
| `projects/sydney-harbour.jpg` | 悉尼港项目 | 2848x1600 (16:9) |
| `og-image.jpg` | 社交媒体分享图 | 1200x630 |

## 输出目录

生成后的图片会自动保存到：
```
public/images/
├── hero.jpg
├── og-image.jpg
├── products/
│   ├── windows/category.jpg
│   ├── doors/category.jpg
│   ├── sunroom/category.jpg
│   └── wooden-doors/category.jpg
└── projects/
    ├── hilton-la.jpg
    ├── beverly-hills.jpg
    ├── dubai-marina.jpg
    └── sydney-harbour.jpg
```

## 注意事项

1. **API 密钥**：脚本已内置 API 密钥，如需更换请编辑 `generate_all_images.py`
2. **生成时间**：每张图片约需 10-30 秒，全部生成约需 3-5 分钟
3. **网络要求**：需要能够访问火山引擎 API
4. **图片有效期**：生成的图片 URL 24 小时后失效，脚本会自动下载到本地

## 故障排除

### 网络连接失败
```bash
# 测试 API 连通性
curl -I https://ark.cn-beijing.volces.com/api/v3
```

### 依赖安装失败
```bash
# 使用国内镜像
pip3 install requests -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### 图片生成失败
- 检查 API 密钥是否有效
- 检查网络连接
- 查看错误日志

## 手动替换图片

如果 AI 生成不满足需求，可以手动替换：
1. 准备好自己的产品图片
2. 重命名为对应的文件名
3. 替换到 `public/images/` 对应目录
4. 刷新网页查看效果
