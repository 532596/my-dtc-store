# 图片资源说明

把图片文件放到本目录后，站点会自动引用，无需改代码。

## 首页 `src/app/page.tsx`

| 文件名 | 用途 | 建议尺寸 |
|--------|------|----------|
| `hero.jpg` | 首屏右侧大场景图 | 约 1200×800 或更大 |
| `why-choose-1.jpg` | Why Choose 第 1 张卡（效率） | 4:3 如 800×600 |
| `why-choose-2.jpg` | Why Choose 第 2 张卡（健康） | 4:3 |
| `why-choose-3.jpg` | Why Choose 第 3 张卡（静音） | 4:3 |
| `adjust-1.jpg` | Adjust to Your Life 第 1 张（双电机） | 16:9 |
| `adjust-2.jpg` | 第 2 张（理线） | 16:9 |
| `adjust-3.jpg` | 第 3 张（桌面） | 16:9 |
| `avatar-1.jpg` ~ `avatar-4.jpg` | 用户评价头像（可选） | 正方形 96×96+ |

## 系列页 `src/app/series/page.tsx`

| 文件名 | 用途 |
|--------|------|
| `series-model-a.jpg` | Model A 卡片图 |
| `series-model-b.jpg` | Model B 卡片图 |
| `series-model-c.jpg` | Model C 卡片图 |

## 产品详情 `src/app/series/[slug]/page.tsx`

| 文件名 | 用途 |
|--------|------|
| `model-a.jpg` | 型号 A 主图 |
| `model-b.jpg` | 型号 B 主图 |
| `model-c.jpg` | 型号 C 主图 |

## 场景页 `src/app/scenarios/page.tsx`

| 文件名 | 用途 |
|--------|------|
| `scene-office.jpg` | 家庭办公场景 |
| `scene-learning.jpg` | 家庭学习场景 |
| `scene-relax.jpg` | 多功能/休闲场景 |

## 配件页 `src/app/accessories/page.tsx`

| 文件名 | 用途 |
|--------|------|
| `acc-cable.jpg` | 理线配件 |
| `acc-charger.jpg` | 无线充电 |
| `acc-drawer.jpg` | 抽屉 |

**使用方式**：把图片放到本目录（`public/images/`），路径与上表文件名一致即可，无需改代码。若某张图尚未添加，该位置可能显示加载失败，放入对应文件后刷新即可。
