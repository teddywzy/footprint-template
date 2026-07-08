# Footprint Public Template

Footprint Public Template 是一个纯前端个人旅行足迹模板，适合用来记录和展示自己的酒店、城市、铁路与航班/路线足迹。

## 特点

- 纯前端项目，可以直接打开 `app.html` 使用，也可以部署到 GitHub Pages。
- 包含酒店足迹、城市足迹、铁路足迹、航班足迹四个模块。
- 支持列表、筛选、搜索、排序、地图 marker、路线直线、编辑、新增、删除、导入导出和本地备份。
- 默认只提供少量虚构示例数据，不包含任何真实个人出行记录。

## 数据保存

本项目是纯前端应用，默认不会上传用户数据到服务器；数据主要保存在当前浏览器本地，用户需要自行导出备份。浏览器中的新增、编辑和删除通常保存在本地 localStorage。换浏览器、清理缓存或更换设备时，本地数据可能丢失。

请定期使用页面内的导出/备份功能保存数据，并在部署前确认要发布的数据已经脱敏。

## 如何替换示例数据

你可以直接编辑以下文件，也可以先在页面中编辑后导出：

- `hotels.js`：酒店示例数据
- `places.js`：城市/目的地示例数据
- `rail-trips.js`：铁路行程示例数据
- `rail-stations.js`：铁路车站坐标
- `flights.js`：航班/路线示例数据
- `flight-airports.js`：机场/路线点坐标

请不要把身份证号、订单号、票号、二维码、乘客姓名、邮件原文、截图或 Excel 原始导出文件提交到公开仓库。

## 本地检查

修改 JS 后建议运行：

```bash
node --check app.js
node --check hotels.js
node --check places.js
node --check rail-trips.js
node --check flights.js
```

