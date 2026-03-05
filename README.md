# MinimalStyle — DTC 智能升降桌独立站

基于 `project-strategy.md` 完成的独立站实现，Next.js 14 + Tailwind CSS。

## 运行

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:3000

## 路由

| 路径 | 说明 |
|------|------|
| `/` | 首页：Hero、Feature Bar、Why Choose、Adjust to Your Life、对比表、用户评价、尾屏 CTA |
| `/series` | 产品系列列表 + 对比表 + Find Your Fit 入口 |
| `/series/[slug]` | 产品详情（model-a / model-b / model-c） |
| `/scenarios` | 场景方案（家庭办公 / 亲子学习 / 多功能） |
| `/accessories` | 配件 |
| `/about` | 关于我们 |
| `/support` | 支持（安装、质保）+ 健康办公指南入口 |
| `/guide` | 健康办公指南 |
| `/quiz` | 选型 Quiz（Find Your Fit） |
| `/cart` | 购物车 |
| `/account` | 账户 |

## 设计要点

- 色板：warm 白/米白/灰/石色 + accent 低饱和蓝（CTA、高亮）
- 滚动触发轻动效（Reveal 组件）
- 统一圆角、轻阴影/边框，苹果官网风格
- 留白充足，无首屏促销，参数「翻译化」表达
