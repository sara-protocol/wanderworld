
# 游览世界 WanderWorld - 开发项目

去你想去的地方，观你想观的世界

## 快速开始
```bash
npm install
npm run dev
```
打开 http://localhost:3000

## 已实现
- 灵感库 12个目的地 + 标签过滤
- 地图可视化（简版坐标映射，可替换为 Google Maps JS API）
- 右侧行程构建器：加入/删除/天数编辑/预算计算/复制摘要
- 详情抽屉 + Google Maps 跳转

## 如何接入 Google Maps
1. 在 Google Cloud 创建项目，启用 Maps JavaScript API, Places API, Directions API
2. 在 app/page.tsx 中把假地图 div 替换为：
```tsx
<iframe 
  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_KEY&q=${lat},${lng}`}
/>
```
3. 搜索框接入 `new google.maps.places.Autocomplete`

## 后续扩展
- Firebase 登录 + 行程云同步
- My Maps 导入导出 KML
- 预算按天拆分 + OpenWeather 天气
- 足迹进度 195国

作者所在地：广州，可加广州出发机票联动
