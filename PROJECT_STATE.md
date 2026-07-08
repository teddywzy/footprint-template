# Footprint Public Template State

## 项目定位

这是 Footprint 的公开模板版，是一个纯前端旅行足迹项目。模板保留酒店、城市、铁路、航班/路线四个模块及其地图、筛选、搜索、排序、编辑、新增、删除、导入导出和本地备份能力。

模板数据全部为虚构示例，仅用于演示页面结构和功能。使用者应替换为自己的数据，并在公开部署前自行确认数据已脱敏。首次打开会显示 public 模板开始使用引导，并提供清空示例数据、导入完整备份和查看帮助操作。

## 核心文件

- `app.html`：管理版入口
- `app.js`：核心逻辑
- `styles.css`：样式
- `hotels.js`：酒店示例数据
- `places.js`：城市/目的地示例数据
- `rail-trips.js`：铁路示例数据
- `rail-stations.js`：铁路车站坐标示例
- `flights.js`：航班/路线示例数据
- `flight-airports.js`：机场/路线点坐标示例
- `city-boundaries.js`、`mainland-*-boundaries.js`：地图边界数据
- `PUBLIC_README.md`：公开模板使用说明
- `DEVLOG.md`：public 模板开发记录

## 示例数据数量

- 酒店示例：3 条
- 城市/目的地示例：4 条
- 铁路示例：3 条
- 航班/路线示例：3 条

## Public 2.0 共用软件增强

- 开始使用引导：首次打开显示产品化引导，关闭后写入 `footprint_public_onboarding_dismissed`，顶部工具区可重新打开。
- 顶部工具区：承载开始使用、帮助中心、完整备份、示例数据、CSV 导入、缺坐标管理和危险操作入口。
- 左侧栏：保留当前模块管理、当前数据来源、搜索、筛选、排序和当前显示数量，不再堆放全局管理功能。
- CSV 导入/模板：通过独立面板提供酒店、城市/目的地、铁路、航班四类 CSV 模板下载和 CSV 导入。导入支持追加或覆盖当前模块 localStorage 覆盖层。
- 缺坐标管理：通过独立面板自动扫描酒店、城市/目的地、铁路车站、机场或港口缺坐标项目，支持手动补充坐标。
- 坐标助手：缺坐标项目支持复制搜索关键词、打开 OpenStreetMap / Google Maps 普通搜索、粘贴坐标自动识别和面板内小地图点选坐标；不接入地理编码 API，不需要 API Key。
- 本地补充坐标：保存在 `footprint_local_coordinates`，不直接修改内置坐标文件；地图优先使用本地补充坐标。
- 完整备份：`footprint-backup` 版本 2.0 包含 `hotels`、`places`、`manualPlaces`、`railTrips`、`flightTrips` 和 `localCoordinates`。
- 帮助中心：顶部工具区提供显眼入口；主内容面向普通用户，自托管部署说明折叠在底部进阶区域。

## 数据与隐私规则

1. 不要提交 `raw/`、Excel、截图、邮件原文或任何包含敏感信息的文件。
2. 不要提交身份证号、订单号、票号、二维码、乘客姓名等敏感字段。
3. 本项目是纯前端应用，默认不会上传用户数据到服务器；浏览器本地编辑数据默认保存在 localStorage，需定期导出完整备份。
4. “一键清空示例数据”会把酒店、城市、铁路、航班示例写为空数组到当前浏览器本地，刷新后保持为空。
5. “恢复示例数据”会清除这些本地示例覆盖层，回到项目内置示例。
6. 完整备份包含 `hotels`、`places`、`railTrips`、`flightTrips` 四类当前浏览器数据和 `localCoordinates` 本地补充坐标，并保留 `manualPlaces` 作为旧版兼容别名。
7. 发布到 GitHub Pages 前，应确认数据文件只包含可公开展示的信息。
8. Leaflet 仍通过 CDN 引入；如需改成本地 vendor，应单独处理。

## 使用方式

直接双击 `app.html`，或将整个目录部署到任意静态站点服务。无需后端、登录、数据库或云存储。
