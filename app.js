const AMAP_API_KEY = "";

const state = {
  mode: "hotel",
  group: "all",
  brand: "all",
  country: "all",
  area: "all",
  city: "all",
  tag: "all",
  railType: "all",
  railSeat: "all",
  railFrom: "all",
  railTo: "all",
  railYear: "all",
  railSort: "date-desc",
  flightAirline: "all",
  flightYear: "all",
  flightFrom: "all",
  flightTo: "all",
  flightCity: "all",
  flightSort: "date-desc",
  searchQuery: "",
  selectedId: null,
  manageMode: false,
  editingId: null,
  placeEditingId: null,
  railEditingId: null,
  visitEditingPlaceKey: "",
  visitEditingPlaceSnapshot: null,
  isAdvancedOpen: false,
  bulkProvince: "",
  bulkSelectedCityKeys: new Set(),
  placeBrowse: {
    level: "country",
    country: "",
    province: ""
  }
};

const hotelCount = document.querySelector("#hotelCount");
const cityCount = document.querySelector("#cityCount");
const brandCount = document.querySelector("#brandCount");
const groupCount = document.createElement("div");
groupCount.innerHTML = "<strong id=\"groupCount\">0</strong><span>集团</span>";
document.querySelector(".stats").appendChild(groupCount);
const deflaggedCount = document.createElement("div");
deflaggedCount.innerHTML = "<strong id=\"deflaggedCount\">0</strong><span>已摘牌</span>";
document.querySelector(".stats").appendChild(deflaggedCount);
const groupFilter = document.querySelector("#groupFilter");
const brandFilter = document.querySelector("#brandFilter");
const countryFilter = document.querySelector("#countryFilter");
const areaFilter = document.querySelector("#areaFilter");
const cityFilter = document.querySelector("#cityFilter");
const tagFilter = document.querySelector("#tagFilter");
const sortFilter = document.querySelector("#sortFilter");
const hotelModeButton = document.querySelector("#hotelMode");
const placeModeButton = document.querySelector("#placeMode");
const railModeButton = document.querySelector("#railMode");
const flightModeButton = document.querySelector("#flightMode");
const keywordSearch = document.querySelector("#keywordSearch");
const clearSearchButton = document.querySelector("#clearSearch");
const resetFiltersButton = document.querySelector("#resetFilters");
const searchResultSummary = document.querySelector("#searchResultSummary");
const hotelList = document.querySelector("#hotelList");
const resultCount = document.querySelector("#resultCount");
const hotelDetail = document.querySelector("#hotelDetail");
const exportJsonButton = document.querySelector("#exportJson");
const importJsonButton = document.querySelector("#importJson");
const importJsonFile = document.querySelector("#importJsonFile");
const exportFootprintJsonButton = document.querySelector("#exportFootprintJson");
const importFootprintJsonButton = document.querySelector("#importFootprintJson");
const importFootprintJsonFile = document.querySelector("#importFootprintJsonFile");
const saveLocalButton = document.querySelector("#saveLocal");
const reloadDefaultButton = document.querySelector("#reloadDefault");
const clearLocalButton = document.querySelector("#clearLocal");
const dataSource = document.querySelector("#dataSource");
const addHotelButton = document.querySelector("#addHotel");
const addPlaceButton = document.querySelector("#addPlace");
const bulkAddCitiesButton = document.querySelector("#bulkAddCities");
const addRailTripButton = document.querySelector("#addRailTrip");
const exportRailTripsJsButton = document.querySelector("#exportRailTripsJs");
const clearRailOverrideButton = document.querySelector("#clearRailOverride");
const exportPlacesJsonButton = document.querySelector("#exportPlacesJson");
const importPlacesJsonButton = document.querySelector("#importPlacesJson");
const importPlacesJsonFile = document.querySelector("#importPlacesJsonFile");
const toggleAdvancedButton = document.querySelector("#toggleAdvanced");
const advancedContent = document.querySelector("#advancedContent");
const lastBackupTime = document.querySelector("#lastBackupTime");
const unsavedChangeCount = document.querySelector("#unsavedChangeCount");
const autoSnapshotCount = document.querySelector("#autoSnapshotCount");
const viewAutoSnapshotsButton = document.querySelector("#viewAutoSnapshots");
const restoreLatestSnapshotButton = document.querySelector("#restoreLatestSnapshot");
const snapshotPanel = document.querySelector("#snapshotPanel");
const snapshotList = document.querySelector("#snapshotList");
const closeSnapshotPanelButton = document.querySelector("#closeSnapshotPanel");
const manageNote = document.querySelector("#manageNote");
const managerPanel = document.querySelector("#managerPanel");
const placeManagerPanel = document.querySelector("#placeManagerPanel");
const visitRecordPanel = document.querySelector("#visitRecordPanel");
const visitRecordForm = document.querySelector("#visitRecordForm");
const visitCountCategoryInput = document.querySelector("#visitCountCategoryInput");
const visitRecordsInput = document.querySelector("#visitRecordsInput");
const visitRecordPreview = document.querySelector("#visitRecordPreview");
const bulkCityPanel = document.querySelector("#bulkCityPanel");
const bulkProvinceList = document.querySelector("#bulkProvinceList");
const bulkCityGrid = document.querySelector("#bulkCityGrid");
const bulkProvinceTitle = document.querySelector("#bulkProvinceTitle");
const bulkCitySummary = document.querySelector("#bulkCitySummary");
const closeBulkCitiesButton = document.querySelector("#closeBulkCities");
const saveBulkCitiesButton = document.querySelector("#saveBulkCities");
const cancelBulkCitiesButton = document.querySelector("#cancelBulkCities");
const hotelForm = document.querySelector("#hotelForm");
const formGroupInput = document.querySelector("#formGroup");
const hotelCodeField = document.querySelector("#hotelCodeField");
const hotelCodeLabel = document.querySelector("#hotelCodeLabel");
const marriottCodeField = document.querySelector("#marriottCodeField");
const placeForm = document.querySelector("#placeForm");
const railManagerPanel = document.querySelector("#railManagerPanel");
const railForm = document.querySelector("#railForm");
const formTitle = document.querySelector("#formTitle");
const placeFormTitle = document.querySelector("#placeFormTitle");
const railFormTitle = document.querySelector("#railFormTitle");
const saveHotelButton = document.querySelector("#saveHotel");
const saveRailTripButton = document.querySelector("#saveRailTrip");
const cancelEditButton = document.querySelector("#cancelEdit");
const cancelRailEditButton = document.querySelector("#cancelRailEdit");
const searchHotelButton = document.querySelector("#searchHotel");
const hotelSearchInput = document.querySelector("#hotelSearchInput");
const candidateList = document.querySelector("#candidateList");
const coordinateNotice = document.createElement("p");
coordinateNotice.className = "coordinate-notice";
document.querySelector(".map-panel").prepend(coordinateNotice);
const mapLegend = document.createElement("div");
mapLegend.className = "map-legend";
mapLegend.innerHTML = `
  <span><i class="legend-pin legend-pin-normal"></i>普通酒店</span>
  <span><i class="legend-pin legend-pin-deflagged"></i>已摘牌酒店</span>
`;
document.querySelector(".map-panel").prepend(mapLegend);
const storageKey = "hotelFootprintData";
const placesStorageKey = "footprint_manual_places";
const railTripsOverrideStorageKey = "footprint_rail_trips_override";
const snapshotStorageKey = "footprintAutoSnapshots";
const lastFullBackupAtKey = "footprintLastFullBackupAt";
const dirtySinceBackupKey = "footprintDirtySinceLastBackup";
const unsavedChangeCountKey = "footprintUnsavedChangeCount";
const visitCountOptions = [
  { value: "unknown", label: "待补充", numeric: null },
  { value: "1", label: "1 次", numeric: 1 },
  { value: "2", label: "2 次", numeric: 2 },
  { value: "3", label: "3 次", numeric: 3 },
  { value: "4", label: "4 次", numeric: 4 },
  { value: "5-9", label: "5–9 次", numeric: 5 },
  { value: "10+", label: "10 次以上 / 高频往返", numeric: 10 },
  { value: "long-term", label: "长期停留", numeric: null }
];
const visitTierStyles = {
  unknown: { label: "待补充", color: "#6b7280", fillColor: "#d1d5db", fillOpacity: 0.24, markerOpacity: 0.72 },
  "1": { label: "1 次", color: "#047857", fillColor: "#bbf7d0", fillOpacity: 0.34, markerOpacity: 0.82 },
  "2": { label: "2 次", color: "#047857", fillColor: "#6ee7b7", fillOpacity: 0.36, markerOpacity: 0.86 },
  "3": { label: "3–4 次", color: "#047857", fillColor: "#34d399", fillOpacity: 0.39, markerOpacity: 0.9 },
  "4": { label: "3–4 次", color: "#047857", fillColor: "#34d399", fillOpacity: 0.39, markerOpacity: 0.9 },
  "5-9": { label: "5–9 次", color: "#065f46", fillColor: "#10b981", fillOpacity: 0.42, markerOpacity: 0.94 },
  "10+": { label: "10 次以上 / 高频往返", color: "#064e3b", fillColor: "#047857", fillOpacity: 0.48, markerOpacity: 0.98 },
  "long-term": { label: "长期停留", color: "#5b21b6", fillColor: "#8b5cf6", fillOpacity: 0.48, markerOpacity: 0.98 }
};
const PROVINCE_LAYER_MAX_ZOOM = 6;
const CITY_LAYER_MIN_ZOOM = 7;
const visitTierRank = {
  unknown: 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 3,
  "5-9": 4,
  "10+": 5,
  "long-term": 6
};
const railSortOptions = [
  { value: "date-desc", label: "日期从新到旧" },
  { value: "date-asc", label: "日期从旧到新" },
  { value: "price-desc", label: "票价从高到低" },
  { value: "price-asc", label: "票价从低到高" },
  { value: "train-az", label: "车次 A-Z" },
  { value: "from-az", label: "出发站 A-Z" },
  { value: "to-az", label: "到达站 A-Z" }
];
const flightSortOptions = [
  { value: "date-desc", label: "日期从新到旧" },
  { value: "date-asc", label: "日期从旧到新" },
  { value: "distance-desc", label: "里程从高到低" },
  { value: "distance-asc", label: "里程从低到高" },
  { value: "flight-az", label: "航班号 A-Z" },
  { value: "airline-az", label: "航司 A-Z" },
  { value: "from-az", label: "出发机场 A-Z" },
  { value: "to-az", label: "到达机场 A-Z" }
];
let dataSourceLabel = "hotels.js 默认数据";
let activeHotels = loadInitialHotels();
let activeManualPlaces = loadInitialPlaces();
const defaultRailTrips = Array.isArray(window.railTrips) ? cloneData(window.railTrips) : [];
let activeRailTrips = loadInitialRailTrips();
const railStations = window.railStations && typeof window.railStations === "object" && !Array.isArray(window.railStations)
  ? window.railStations
  : {};
const activeFlightTrips = Array.isArray(window.flightTrips) ? window.flightTrips : [];
const flightAirports = window.flightAirports && typeof window.flightAirports === "object" && !Array.isArray(window.flightAirports)
  ? window.flightAirports
  : {};

function inferGroup(hotel) {
  if (hotel.group) return hotel.group;
  const ihgBrands = ["丽晶", "金普顿", "洲至奢选", "英迪格", "洲际", "voco", "华邑", "皇冠假日", "逸衡酒店", "假日酒店", "智选假日", "Staybridge Suites"];
  if (ihgBrands.includes(hotel.brand)) return "IHG";
  const marriottBrands = ["丽思卡尔顿", "瑞吉", "豪华精选", "JW万豪", "W", "威斯汀", "喜来登", "艾美", "万豪", "万丽", "傲途格", "臻品之选", "德尔塔", "福朋喜来登", "万怡", "万枫", "Moxy", "万豪行政公寓", "万豪旅享家公寓", "AC Hotel", "Residence Inn", "源宿"];
  if (marriottBrands.includes(hotel.brand)) return "Marriott";
  return "Unknown";
}

function normalizeHotel(hotel) {
  const normalized = { ...hotel };
  normalized.group = inferGroup(normalized);
  if (!normalized.hotelCode && normalized.marriottCode) normalized.hotelCode = normalized.marriottCode;
  return normalized;
}

function normalizeHotels(items) {
  return Array.isArray(items) ? items.map(normalizeHotel) : [];
}

function loadInitialHotels() {
  try {
    const defaultHotels = normalizeHotels(typeof hotels !== "undefined" && Array.isArray(hotels) ? hotels : []);
    const savedData = localStorage.getItem(storageKey);
    if (!savedData) return defaultHotels;
    const parsedData = JSON.parse(savedData);
    if (!Array.isArray(parsedData)) return defaultHotels;
    if (parsedData.length === 0 && defaultHotels.length > 0) {
      dataSourceLabel = "hotels.js 默认数据（已忽略空本地数据）";
      return defaultHotels;
    }
    dataSourceLabel = "localStorage 本地保存数据";
    return normalizeHotels(parsedData);
  } catch (error) {
    dataSourceLabel = "hotels.js 默认数据";
    return normalizeHotels(typeof hotels !== "undefined" && Array.isArray(hotels) ? hotels : []);
  }
}

function loadInitialPlaces() {
  const defaultPlaces = getManualPlacesFromFile();
  try {
    const savedData = localStorage.getItem(placesStorageKey);
    if (!savedData) return defaultPlaces;
    const parsedData = JSON.parse(savedData);
    if (!Array.isArray(parsedData)) return defaultPlaces;
    if (parsedData.length === 0 && defaultPlaces.length > 0) return defaultPlaces;
    return parsedData.map(normalizePlace);
  } catch (error) {
    return defaultPlaces;
  }
}

function getManualPlacesFromFile() {
  const source = typeof window !== "undefined" && Array.isArray(window.places)
    ? window.places
    : typeof places !== "undefined" && Array.isArray(places)
      ? places
      : [];
  return source.map(normalizePlace);
}

function savePlacesToLocal() {
  try {
    localStorage.setItem(placesStorageKey, JSON.stringify(activeManualPlaces, null, 2));
  } catch (error) {
    alert("城市数据保存失败：浏览器本地存储不可用。");
  }
}

function saveToLocal() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(activeHotels, null, 2));
    dataSourceLabel = "localStorage 本地保存数据";
    updateDataSource();
  } catch (error) {
    alert("保存失败：浏览器本地存储不可用。");
  }
}

function saveAndRefresh() {
  saveToLocal();
  markDataChanged("save-hotels");
  renderAll();
}

function hasRailOverride() {
  try {
    return Boolean(localStorage.getItem(railTripsOverrideStorageKey));
  } catch (error) {
    return false;
  }
}

function loadInitialRailTrips() {
  try {
    const savedData = localStorage.getItem(railTripsOverrideStorageKey);
    if (!savedData) return cloneData(defaultRailTrips);
    const parsedData = JSON.parse(savedData);
    return Array.isArray(parsedData) ? sortRailTrips(parsedData.map(normalizeRailTripForStorage)) : cloneData(defaultRailTrips);
  } catch (error) {
    return cloneData(defaultRailTrips);
  }
}

function saveRailTripsOverride() {
  try {
    localStorage.setItem(railTripsOverrideStorageKey, JSON.stringify(sortRailTrips(activeRailTrips).map(normalizeRailTripForStorage), null, 2));
    return true;
  } catch (error) {
    alert("铁路数据保存失败：浏览器本地存储不可用。");
    return false;
  }
}

function updateDataSource() {
  if (state.mode === "flight") {
    dataSource.textContent = "当前数据来源：flights.js / 模板示例数据";
    return;
  }
  if (state.mode === "rail") {
    dataSource.textContent = hasRailOverride()
      ? "当前数据来源：本地编辑数据 / rail-trips.js 原始数据。部署前请导出 rail-trips.js 并手动替换源文件。"
      : "当前数据来源：rail-trips.js / 铁路数据数据";
    return;
  }
  dataSource.textContent = `当前数据来源：${dataSourceLabel}`;
}

function readJsonStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

function writeJsonStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}

function isValidSnapshot(snapshot) {
  return Boolean(
    snapshot &&
    snapshot.id &&
    snapshot.createdAt &&
    snapshot.data &&
    Array.isArray(snapshot.data.hotels) &&
    Array.isArray(snapshot.data.manualPlaces)
  );
}

function getAutoSnapshots() {
  const snapshots = readJsonStorage(snapshotStorageKey, []);
  if (!Array.isArray(snapshots)) return [];
  return snapshots
    .filter(isValidSnapshot)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
}

function setAutoSnapshots(snapshots) {
  writeJsonStorage(snapshotStorageKey, snapshots.filter(isValidSnapshot).slice(0, 5));
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value || []));
}

function createAutoSnapshot(reason) {
  try {
    const createdAt = new Date().toISOString();
    const snapshot = {
      id: `snapshot-${Date.now()}`,
      createdAt,
      reason: reason || "auto-save",
      summary: {
        hotelCount: Array.isArray(activeHotels) ? activeHotels.length : 0,
        manualPlaceCount: Array.isArray(activeManualPlaces) ? activeManualPlaces.length : 0,
        cityCount: typeof getAllPlaces === "function" ? getAllPlaces().length : 0
      },
      data: {
        hotels: cloneData(activeHotels),
        manualPlaces: cloneData(activeManualPlaces)
      }
    };
    if (!isValidSnapshot(snapshot)) return false;
    setAutoSnapshots([snapshot, ...getAutoSnapshots()]);
    updateDataSafetyStatus();
    return true;
  } catch (error) {
    return false;
  }
}

function getUnsavedChangeCount() {
  const count = Number(localStorage.getItem(unsavedChangeCountKey));
  return Number.isFinite(count) && count > 0 ? count : 0;
}

function formatLocalTime(isoString) {
  if (!isoString) return "尚未导出";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "尚未导出";
  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}

function getSnapshotReasonText(reason) {
  const labels = {
    "before-import-backup": "导入完整备份前",
    "before-clear-local-data": "清除浏览器数据前",
    "before-save-visit-category": "保存访问情况前",
    "before-save-visit-records": "保存访问记录前",
    "before-bulk-add-places": "批量添加城市前",
    "before-add-place": "新增目的地前",
    "before-edit-place": "编辑目的地前",
    "before-delete-place": "删除目的地前",
    "before-add-hotel": "新增酒店前",
    "before-edit-hotel": "编辑酒店前",
    "before-delete-hotel": "删除酒店前",
    "before-import-hotel-json": "导入酒店 JSON 前",
    "before-import-places-json": "导入城市 JSON 前",
    "before-restore-latest-snapshot": "恢复最近快照前",
    "before-restore-selected-snapshot": "恢复指定快照前"
  };
  return labels[reason] || reason || "自动快照";
}

function updateDataSafetyStatus() {
  try {
    const lastBackup = localStorage.getItem(lastFullBackupAtKey);
    const snapshots = getAutoSnapshots();
    if (lastBackupTime) lastBackupTime.textContent = formatLocalTime(lastBackup);
    if (unsavedChangeCount) unsavedChangeCount.textContent = `${getUnsavedChangeCount()} 次`;
    if (autoSnapshotCount) autoSnapshotCount.textContent = `${snapshots.length} 个`;
    if (restoreLatestSnapshotButton) restoreLatestSnapshotButton.disabled = snapshots.length === 0;
    if (snapshotPanel && !snapshotPanel.hidden) renderSnapshotList();
  } catch (error) {
    if (restoreLatestSnapshotButton) restoreLatestSnapshotButton.disabled = true;
  }
}

function markDataChanged() {
  try {
    localStorage.setItem(dirtySinceBackupKey, "true");
    localStorage.setItem(unsavedChangeCountKey, String(getUnsavedChangeCount() + 1));
  } catch (error) {
    // Data safety metadata is best-effort; main data saving must continue.
  }
  updateDataSafetyStatus();
}

function markFullBackupExported() {
  try {
    localStorage.setItem(lastFullBackupAtKey, new Date().toISOString());
    localStorage.setItem(dirtySinceBackupKey, "false");
    localStorage.setItem(unsavedChangeCountKey, "0");
  } catch (error) {
    // Ignore metadata write failures so export still works.
  }
  updateDataSafetyStatus();
}

function restoreSnapshot(snapshot, restoreReason) {
  if (!snapshot) {
    alert("暂无自动快照。");
    return;
  }
  if (!confirm("恢复该快照会覆盖当前浏览器中的工作数据。建议先导出完整备份 JSON。是否继续？")) return;
  try {
    if (!isValidSnapshot(snapshot)) throw new Error("快照数据不完整。");
    createAutoSnapshot(restoreReason || "before-restore-selected-snapshot");
    activeHotels = normalizeHotels(snapshot.data.hotels);
    activeManualPlaces = snapshot.data.manualPlaces.map(normalizePlace);
    localStorage.setItem(storageKey, JSON.stringify(activeHotels, null, 2));
    localStorage.setItem(placesStorageKey, JSON.stringify(activeManualPlaces, null, 2));
    dataSourceLabel = "已从自动快照恢复";
    resetFilterState();
    state.selectedId = null;
    closeHotelForm();
    closePlaceForm();
    closeVisitRecordForm();
    closeBulkCityPanel();
    closeSnapshotPanel();
    renderDetail(null);
    renderAll();
    markDataChanged(restoreReason === "before-restore-latest-snapshot" ? "restore-latest-snapshot" : "restore-selected-snapshot");
    alert("已恢复自动快照。");
  } catch (error) {
    alert(`恢复失败：${error.message || "快照不可用。"}`);
  }
}

function restoreLatestSnapshot() {
  restoreSnapshot(getAutoSnapshots()[0], "before-restore-latest-snapshot");
}

function closeSnapshotPanel() {
  if (snapshotPanel) snapshotPanel.hidden = true;
}

function renderSnapshotList() {
  if (!snapshotList) return;
  try {
    const snapshots = getAutoSnapshots();
    if (snapshots.length === 0) {
      snapshotList.innerHTML = '<p class="empty-state">暂无自动快照</p>';
      return;
    }
    snapshotList.innerHTML = "";
    snapshots.forEach((snapshot, index) => {
      const item = document.createElement("article");
      item.className = "snapshot-item";
      const summary = snapshot.summary || {};
      item.innerHTML = `
        <strong>${index + 1}. ${formatLocalTime(snapshot.createdAt)}</strong>
        <span>原因：${getSnapshotReasonText(snapshot.reason)}</span>
        <span>酒店：${summary.hotelCount ?? snapshot.data.hotels.length} · 手动目的地：${summary.manualPlaceCount ?? snapshot.data.manualPlaces.length} · 城市：${summary.cityCount ?? "待计算"}</span>
        <button type="button">恢复此快照</button>
      `;
      item.querySelector("button")?.addEventListener("click", () => restoreSnapshot(snapshot, "before-restore-selected-snapshot"));
      snapshotList.appendChild(item);
    });
  } catch (error) {
    snapshotList.innerHTML = '<p class="empty-state">快照列表读取失败。</p>';
  }
}

function openSnapshotPanel() {
  if (!snapshotPanel) return;
  snapshotPanel.hidden = false;
  renderSnapshotList();
}

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png"
});

const map = L.map("map").setView([31.2304, 121.4737], 5);
const tileLayer = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  maxZoom: 19,
  updateWhenIdle: true,
  keepBuffer: 4,
  crossOrigin: true
}).addTo(map);

const deflaggedIcon = L.divIcon({
  className: "deflagged-marker",
  html: "<span></span>",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
});

requestAnimationFrame(() => map.invalidateSize());
window.setTimeout(() => map.invalidateSize(), 300);
window.addEventListener("resize", () => map.invalidateSize());

let markers = [];
let placeMapLayers = new Map();
let provinceMapLayers = new Map();
let currentPlaceMapLevel = "";

function hasValidCoords(hotel) {
  return (
    Number.isFinite(hotel.lat) &&
    Number.isFinite(hotel.lng) &&
    hotel.coordinateStatus === "exact"
  );
}

function getCoordinateStatusText(status) {
  const labels = {
    exact: "精确坐标",
    missing: "坐标待确认，暂不显示在地图上"
  };
  return labels[status] || "坐标待确认，暂不显示在地图上";
}

function getArea(hotel) {
  return hotel.province || hotel.region || "";
}

function getHotelName(hotel) {
  return hotel.hotelName || hotel.name || "";
}

function normalizeSearchValue(value) {
  if (Array.isArray(value)) return value.join(" ");
  return value == null ? "" : String(value);
}

function escapeAttribute(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getSearchableText(hotel) {
  const fields = [
    hotel.group,
    hotel.brand,
    hotel.hotelName,
    hotel.name,
    hotel.englishName,
    hotel.userAlias,
    hotel.country,
    hotel.province,
    hotel.region,
    hotel.city,
    hotel.address,
    hotel.hotelCode,
    hotel.marriottCode,
    hotel.status,
    hotel.note,
    hotel.notes,
    hotel.tags,
    hotel.isDeflagged ? "已摘牌 deflagged" : ""
  ];
  return fields.map(normalizeSearchValue).join(" ").toLowerCase();
}

function matchesSearch(item, query, searchableTextGetter = getSearchableText) {
  const keywords = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (keywords.length === 0) return true;
  const text = searchableTextGetter(item).toLowerCase();
  return keywords.every((keyword) => text.includes(keyword));
}

function uniqueValues(items, getter) {
  return [...new Set(items.map(getter).filter(Boolean))].sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
}

function fillFilter(select, values, label) {
  select.innerHTML = `<option value="all">全部${label}</option>`;
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function fillFilterOptions(select, options, allLabel) {
  if (!select) return;
  select.innerHTML = `<option value="all">${allLabel}</option>`;
  options.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    select.appendChild(option);
  });
}

function fillSortOptions(select, options) {
  if (!select) return;
  select.innerHTML = "";
  options.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    select.appendChild(option);
  });
}

function setFilterLabel(select, text) {
  const label = select?.closest("label");
  if (!label) return;
  const textNode = [...label.childNodes].find((node) => node.nodeType === 3 && node.textContent.trim());
  if (textNode) {
    textNode.textContent = `\n          ${text}\n          `;
  }
}

function getFilteredHotels() {
  return activeHotels.filter((hotel) => {
    const groupMatch = state.group === "all" || hotel.group === state.group;
    const brandMatch = state.brand === "all" || hotel.brand === state.brand;
    const countryMatch = state.country === "all" || hotel.country === state.country;
    const areaMatch = state.area === "all" || getArea(hotel) === state.area;
    const cityMatch = state.city === "all" || hotel.city === state.city;
    return groupMatch && brandMatch && countryMatch && areaMatch && cityMatch && matchesSearch(hotel, state.searchQuery);
  });
}

function getAreaBaseHotels() {
  return activeHotels.filter((hotel) => {
    const groupMatch = state.group === "all" || hotel.group === state.group;
    const brandMatch = state.brand === "all" || hotel.brand === state.brand;
    const countryMatch = state.country === "all" || hotel.country === state.country;
    return groupMatch && brandMatch && countryMatch;
  });
}

function getCityBaseHotels() {
  return getAreaBaseHotels().filter((hotel) => state.area === "all" || getArea(hotel) === state.area);
}

function renderStats(filteredHotels = activeHotels) {
  hotelCount.textContent = filteredHotels.length;
  cityCount.textContent = uniqueValues(filteredHotels, (hotel) => hotel.city).length;
  brandCount.textContent = uniqueValues(filteredHotels, (hotel) => hotel.brand).length;
  document.querySelector("#groupCount").textContent = uniqueValues(filteredHotels, (hotel) => hotel.group).length;
  document.querySelector("#deflaggedCount").textContent = filteredHotels.filter((hotel) => hotel.isDeflagged).length;
}

function renderList(filteredHotels) {
  hotelList.innerHTML = "";
  const denominator = state.group === "all" ? activeHotels.length : activeHotels.filter((hotel) => hotel.group === state.group).length;
  const groupLabel = state.group === "all" ? "家酒店" : `家 ${state.group} 酒店`;
  const summary = `当前显示 ${filteredHotels.length} / ${denominator} ${groupLabel}`;
  resultCount.textContent = summary;
  searchResultSummary.textContent = summary;
  if (filteredHotels.length === 0) {
    hotelList.innerHTML = `<p class="empty-state">${state.searchQuery.trim() ? "没有找到匹配的酒店。" : "暂无符合条件的酒店"}</p>`;
    return;
  }
  filteredHotels.forEach((hotel) => {
    const card = document.createElement("button");
    card.className = "hotel-card";
    card.type = "button";
    card.dataset.id = hotel.id;
    if (hotel.id === state.selectedId) card.classList.add("active");
    card.innerHTML = `
      <h2>${getHotelName(hotel)}${hotel.isDeflagged ? ' <span class="status-tag">已摘牌</span>' : ""}</h2>
      <p>${hotel.group || "Unknown"} · ${hotel.brand} · ${hotel.city}</p>
      <p>${hotel.stayedAt}</p>
      ${state.manageMode ? '<div class="card-actions"><button type="button" data-action="edit">编辑</button><button type="button" class="danger" data-action="delete">删除</button></div>' : ""}
    `;
    card.addEventListener("click", (event) => {
      const action = event.target.dataset.action;
      if (action === "edit") {
        event.stopPropagation();
        openHotelForm(hotel);
        return;
      }
      if (action === "delete") {
        event.stopPropagation();
        deleteHotel(hotel.id);
        return;
      }
      selectHotel(hotel.id);
    });
    hotelList.appendChild(card);
  });
}

function renderMap(filteredHotels) {
  markers.forEach((marker) => marker.remove());
  markers = [];

  const locatedHotels = filteredHotels.filter(hasValidCoords);
  const missingCount = filteredHotels.filter((hotel) => !hasValidCoords(hotel)).length;
  coordinateNotice.textContent = `有 ${missingCount} 家酒店缺少坐标，暂未显示在地图上。`;
  locatedHotels.forEach((hotel) => {
    const marker = L.marker([hotel.lat, hotel.lng], hotel.isDeflagged ? { icon: deflaggedIcon } : {}).addTo(map);
    marker.bindPopup(getHotelName(hotel));
    marker.on("click", () => selectHotel(hotel.id));
    markers.push(marker);
  });

  if (locatedHotels.length === 0) {
    map.setView([35.8617, 104.1954], 4, { animate: false });
  } else if (locatedHotels.length === 1) {
    map.setView([locatedHotels[0].lat, locatedHotels[0].lng], 13, { animate: false });
  } else {
    const bounds = L.latLngBounds(locatedHotels.map((hotel) => [hotel.lat, hotel.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }

  requestAnimationFrame(() => map.invalidateSize());
  window.setTimeout(() => map.invalidateSize(), 300);
}

function renderDetail(hotel) {
  if (!hotel) {
    hotelDetail.innerHTML = "<p>选择酒店查看详情</p>";
    return;
  }

  const location = hasValidCoords(hotel) ? `${hotel.lat}, ${hotel.lng}` : "坐标待确认";
  const placeKey = getPlaceKey(hotel);
  hotelDetail.innerHTML = `
    <h2>${getHotelName(hotel)}</h2>
    ${hotel.isDeflagged ? '<p><span class="status-tag">已摘牌</span></p>' : ""}
    <p><strong>集团：</strong>${hotel.group || "Unknown"}</p>
    <p><strong>品牌：</strong>${hotel.brand}</p>
    <p><strong>城市：</strong><button type="button" class="detail-link" data-place-key="${placeKey}">${hotel.city}</button>, ${hotel.country}</p>
    <p><strong>入住：</strong>${hotel.stayedAt}</p>
    <p><strong>坐标状态：</strong>${getCoordinateStatusText(hotel.coordinateStatus)}</p>
    <p><strong>坐标：</strong>${location}</p>
    <p>${hotel.notes}</p>
  `;
  hotelDetail.querySelector("[data-place-key]")?.addEventListener("click", (event) => {
    jumpToPlace(event.currentTarget.dataset.placeKey);
  });
}

function selectHotel(id) {
  state.selectedId = id;
  const hotel = activeHotels.find((item) => item.id === id);
  renderDetail(hotel);
  renderList(getFilteredHotels());

  if (hotel && hasValidCoords(hotel)) {
    map.setView([hotel.lat, hotel.lng], 13, { animate: false });
    requestAnimationFrame(() => map.invalidateSize());
    window.setTimeout(() => map.invalidateSize(), 300);
  }
}

function render(filteredHotels = getFilteredHotels()) {
  if (!filteredHotels.some((hotel) => hotel.id === state.selectedId)) {
    state.selectedId = null;
    renderDetail(null);
  }
  renderList(filteredHotels);
  renderMap(filteredHotels);
}

function syncFilters() {
  const brandBase = activeHotels.filter((hotel) => state.group === "all" || hotel.group === state.group);
  const countryBase = brandBase.filter((hotel) => state.brand === "all" || hotel.brand === state.brand);
  fillFilter(groupFilter, uniqueValues(activeHotels, (hotel) => hotel.group), "集团");
  fillFilter(brandFilter, uniqueValues(brandBase, (hotel) => hotel.brand), "品牌");
  if (state.group !== "all" && !uniqueValues(activeHotels, (hotel) => hotel.group).includes(state.group)) state.group = "all";
  const brandValues = uniqueValues(brandBase, (hotel) => hotel.brand);
  if (state.brand !== "all" && !brandValues.includes(state.brand)) state.brand = "all";
  fillFilter(countryFilter, uniqueValues(countryBase, (hotel) => hotel.country), "国家/地区");

  if (state.country !== "all" && !uniqueValues(countryBase, (hotel) => hotel.country).includes(state.country)) state.country = "all";
  const areaValues = uniqueValues(getAreaBaseHotels(), getArea);
  if (state.area !== "all" && !areaValues.includes(state.area)) state.area = "all";
  fillFilter(areaFilter, areaValues, "省份/地区");

  const cityValues = uniqueValues(getCityBaseHotels(), (hotel) => hotel.city);
  if (state.city !== "all" && !cityValues.includes(state.city)) state.city = "all";
  fillFilter(cityFilter, cityValues, "城市");

  groupFilter.value = state.group;
  brandFilter.value = state.brand;
  countryFilter.value = state.country;
  areaFilter.value = state.area;
  cityFilter.value = state.city;
}

function renderAll() {
  syncFilters();
  const filteredHotels = getFilteredHotels();
  renderStats(filteredHotels);
  render(filteredHotels);
  updateDataSource();
  updateDataSafetyStatus();
}

function exportJson() {
  const json = JSON.stringify(activeHotels, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "hotel-footprint-data.json";
  link.click();
  URL.revokeObjectURL(url);
}

function exportFootprintJson() {
  const date = new Date().toISOString().slice(0, 10);
  const backup = {
    schema: "footprint-backup",
    version: "1.0",
    exportedAt: new Date().toISOString(),
    appName: "Footprint",
    hotels: activeHotels,
    manualPlaces: activeManualPlaces,
    meta: {
      hotelCount: activeHotels.length,
      manualPlaceCount: activeManualPlaces.length,
      totalPlaceCount: getAllPlaces().length,
      note: "hotels 为当前酒店数据，manualPlaces 为手动城市/目的地数据；hotel-derived 城市会由 hotels 自动聚合生成，不单独导出。"
    }
  };
  const json = JSON.stringify(backup, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `footprint-backup-${date}.json`;
  link.click();
  URL.revokeObjectURL(url);
  markFullBackupExported();
}

function importFootprintJson(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const data = JSON.parse(reader.result);
      if (data?.schema !== "footprint-backup") throw new Error("schema 必须是 footprint-backup");
      if (!Array.isArray(data.hotels)) throw new Error("hotels 必须是数组");
      if (data.manualPlaces && !Array.isArray(data.manualPlaces)) throw new Error("manualPlaces 必须是数组");
      if (!confirm("这会覆盖当前浏览器中的 Footprint 数据，是否继续？")) return;
      createAutoSnapshot("before-import-backup");
      activeHotels = normalizeHotels(data.hotels);
      activeManualPlaces = (data.manualPlaces || []).map(normalizePlace);
      localStorage.setItem(storageKey, JSON.stringify(activeHotels, null, 2));
      localStorage.setItem(placesStorageKey, JSON.stringify(activeManualPlaces, null, 2));
      dataSourceLabel = "完整 Footprint JSON 备份（已保存到本地）";
      resetFilterState();
      state.selectedId = null;
    closeHotelForm();
    closePlaceForm();
    closeVisitRecordForm();
      renderDetail(null);
      renderAll();
      markDataChanged("import-backup");
      alert("完整 Footprint JSON 导入成功。");
    } catch (error) {
      alert(`导入失败：${error.message || "完整 Footprint JSON 格式错误。"}`);
    } finally {
      importFootprintJsonFile.value = "";
    }
  });
  reader.readAsText(file);
}

function importJson(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const data = JSON.parse(reader.result);
      if (!Array.isArray(data)) throw new Error("JSON root must be an array.");
      createAutoSnapshot("before-import-hotel-json");
      activeHotels = normalizeHotels(data);
      localStorage.setItem(storageKey, JSON.stringify(activeHotels, null, 2));
      dataSourceLabel = "刚导入的 JSON 数据（已自动保存到本地）";
      resetFilterState();
      state.selectedId = null;
      renderAll();
      markDataChanged("import-hotel-json");
    } catch (error) {
      alert("导入失败：JSON 格式错误。");
    } finally {
      importJsonFile.value = "";
    }
  });
  reader.readAsText(file);
}

function useDefaultHotels() {
  if (!confirm("这会清除当前浏览器中自动保存的 Footprint 数据，并恢复默认文件数据。请确认你已经导出完整备份。是否继续？")) return;
  try {
    createAutoSnapshot("before-clear-local-data");
    localStorage.removeItem(storageKey);
    localStorage.removeItem(placesStorageKey);
    activeHotels = normalizeHotels(hotels);
    activeManualPlaces = getManualPlacesFromFile();
    dataSourceLabel = "hotels.js 默认数据";
    closeHotelForm();
    closePlaceForm();
    closeVisitRecordForm();
    resetFilterState();
    state.selectedId = null;
    renderDetail(null);
    renderAll();
    markDataChanged("clear-local-data");
  } catch (error) {
    alert("清除失败：浏览器本地存储不可用。");
  }
}

function resetFilterState() {
  state.group = "all";
  state.brand = "all";
  state.country = "all";
  state.area = "all";
  state.city = "all";
  state.tag = "all";
  state.railType = "all";
  state.railSeat = "all";
  state.railFrom = "all";
  state.railTo = "all";
  state.railYear = "all";
  state.railSort = "date-desc";
  state.flightAirline = "all";
  state.flightYear = "all";
  state.flightFrom = "all";
  state.flightTo = "all";
  state.flightCity = "all";
  state.flightSort = "date-desc";
  state.searchQuery = "";
  if (state.mode === "place") resetPlaceBrowse();
  keywordSearch.value = "";
}

groupFilter.addEventListener("change", (event) => {
  if (state.mode === "flight") {
    state.flightAirline = event.target.value;
    renderAll();
    return;
  }
  if (state.mode === "rail") {
    state.railType = event.target.value;
    renderAll();
    return;
  }
  state.group = event.target.value;
  state.brand = "all";
  state.country = "all";
  state.area = "all";
  state.city = "all";
  renderAll();
});

brandFilter.addEventListener("change", (event) => {
  if (state.mode === "flight") {
    state.flightYear = event.target.value;
    renderAll();
    return;
  }
  if (state.mode === "rail") {
    state.railSeat = event.target.value;
    renderAll();
    return;
  }
  state.brand = event.target.value;
  state.country = "all";
  state.area = "all";
  state.city = "all";
  renderAll();
});

countryFilter.addEventListener("change", (event) => {
  if (state.mode === "flight") {
    state.flightFrom = event.target.value;
    renderAll();
    return;
  }
  if (state.mode === "rail") {
    state.railFrom = event.target.value;
    renderAll();
    return;
  }
  state.country = event.target.value;
  state.area = "all";
  state.city = "all";
  renderAll();
});

areaFilter.addEventListener("change", (event) => {
  if (state.mode === "flight") {
    state.flightTo = event.target.value;
    renderAll();
    return;
  }
  if (state.mode === "rail") {
    state.railTo = event.target.value;
    renderAll();
    return;
  }
  state.area = event.target.value;
  state.city = "all";
  renderAll();
});

cityFilter.addEventListener("change", (event) => {
  if (state.mode === "flight") {
    state.flightCity = event.target.value;
    renderAll();
    return;
  }
  if (state.mode === "rail") {
    state.railYear = event.target.value;
    renderAll();
    return;
  }
  state.city = event.target.value;
  renderAll();
});

if (tagFilter) {
  tagFilter.addEventListener("change", (event) => {
    state.tag = event.target.value;
    renderAll();
  });
}

sortFilter?.addEventListener("change", (event) => {
  if (state.mode === "rail") {
    state.railSort = event.target.value;
    renderAll();
    return;
  }
  if (state.mode === "flight") {
    state.flightSort = event.target.value;
    renderAll();
  }
});

if (hotelModeButton) {
  hotelModeButton.addEventListener("click", () => {
    state.mode = "hotel";
    state.selectedId = null;
    resetFilterState();
    renderDetail(null);
    updateManagementActions();
    renderAll();
  });
}

if (placeModeButton) {
  placeModeButton.addEventListener("click", () => {
    state.mode = "place";
    state.selectedId = null;
    resetFilterState();
    closeHotelForm();
    renderDetail(null);
    updateManagementActions();
    map.setView([35.8617, 104.1954], PROVINCE_LAYER_MAX_ZOOM, { animate: false });
    currentPlaceMapLevel = "";
    renderAll();
  });
}

if (railModeButton) {
  railModeButton.addEventListener("click", () => {
    state.mode = "rail";
    state.selectedId = null;
    resetFilterState();
    closeHotelForm();
    closePlaceForm();
    closeVisitRecordForm();
    closeBulkCityPanel();
    renderDetail(null);
    updateManagementActions();
    renderAll();
  });
}

if (flightModeButton) {
  flightModeButton.addEventListener("click", () => {
    state.mode = "flight";
    state.selectedId = null;
    resetFilterState();
    closeHotelForm();
    closePlaceForm();
    closeVisitRecordForm();
    closeBulkCityPanel();
    renderDetail(null);
    updateManagementActions();
    renderAll();
  });
}

keywordSearch.addEventListener("input", (event) => {
  state.searchQuery = event.target.value;
  renderAll();
});

clearSearchButton.addEventListener("click", () => {
  state.searchQuery = "";
  keywordSearch.value = "";
  renderAll();
});

resetFiltersButton.addEventListener("click", () => {
  resetFilterState();
  state.selectedId = null;
  renderDetail(null);
  renderAll();
});

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9一-龥]+/g, "-")
    .replace(/^-|-$/g, "") || "hotel";
}

function createHotelId(hotel) {
  const base = slugify([hotel.group, hotel.brand, hotel.city, hotel.name].filter(Boolean).join("-"));
  let id = base;
  while (activeHotels.some((item) => item.id === id)) {
    id = `${base}-${Math.random().toString(36).slice(2, 6)}`;
  }
  return id;
}

function setField(id, value) {
  document.querySelector(id).value = value ?? "";
}

function ensureSelectOption(selectId, value) {
  const select = document.querySelector(selectId);
  const text = String(value ?? "").trim();
  if (!select || !text) return;
  const exists = [...select.options].some((option) => option.value === text);
  if (exists) return;
  const option = document.createElement("option");
  option.value = text;
  option.textContent = text;
  select.appendChild(option);
}

function parseNumber(value) {
  if (String(value).trim() === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : NaN;
}

function parseLooseNumber(value) {
  const text = String(value ?? "").trim();
  if (!text) return null;
  const number = Number(text);
  return Number.isFinite(number) ? number : text;
}

function getHotelGroupKind(group) {
  const text = String(group || "").toLowerCase();
  if (text.includes("marriott") || text.includes("万豪")) return "marriott";
  if (text === "ihg" || text.includes("洲际") || text.includes("intercontinental")) return "ihg";
  if (text.includes("hilton") || text.includes("希尔顿")) return "hilton";
  if (text.includes("hyatt") || text.includes("凯悦")) return "hyatt";
  if (text.includes("accor") || text.includes("雅高")) return "accor";
  return "other";
}

function updateHotelCodeFields() {
  const groupKind = getHotelGroupKind(formGroupInput?.value);
  if (!hotelCodeField || !marriottCodeField || !hotelCodeLabel) return;
  marriottCodeField.hidden = groupKind !== "marriott";
  hotelCodeField.hidden = groupKind === "marriott";
  const labels = {
    ihg: "IHG Code",
    hilton: "Hilton Code",
    hyatt: "Hyatt Code",
    accor: "Accor Code",
    other: "酒店代码"
  };
  hotelCodeLabel.textContent = labels[groupKind] || "酒店代码";
}

function openHotelForm(hotel = null) {
  state.editingId = hotel ? hotel.id : null;
  managerPanel.hidden = false;
  formTitle.textContent = hotel ? "编辑酒店" : "新增酒店";
  saveHotelButton.textContent = hotel ? "保存修改" : "新增保存";
  candidateList.innerHTML = "";
  hotelForm.reset();
  setField("#formOriginalId", hotel?.id || "");
  setField("#formGroup", hotel?.group || (state.group === "all" ? "" : state.group));
  setField("#formName", hotel?.name || "");
  setField("#formEnglishName", hotel?.englishName || "");
  setField("#formUserAlias", hotel?.userAlias || "");
  setField("#formBrand", hotel?.brand || "");
  setField("#formCountry", hotel?.country || "中国");
  setField("#formProvince", hotel?.province || "");
  setField("#formRegion", hotel?.region || "");
  setField("#formCity", hotel?.city || "");
  setField("#formAddress", hotel?.address || "");
  setField("#formHotelCode", hotel?.hotelCode || hotel?.ihgCode || "");
  setField("#formMarriottCode", hotel?.marriottCode || "");
  setField("#formLat", hotel?.lat ?? "");
  setField("#formLng", hotel?.lng ?? "");
  setField("#formCoordinateStatus", hotel?.coordinateStatus || "missing");
  setField("#formIsDeflagged", String(Boolean(hotel?.isDeflagged)));
  ensureSelectOption("#formStatus", hotel?.status || "");
  setField("#formStatus", hotel?.status || "");
  setField("#formStayCount", hotel?.stayCount ?? "");
  setField("#formFirstStayYear", hotel?.firstStayYear ?? "");
  setField("#formLastStayYear", hotel?.lastStayYear ?? "");
  setField("#formRating", hotel?.rating ?? "");
  setField("#formTags", Array.isArray(hotel?.tags) ? hotel.tags.join(", ") : hotel?.tags || "");
  setField("#formNotes", hotel?.notes || "模板示例记录，可替换为自己的内容");
  updateHotelCodeFields();
}

function closeHotelForm() {
  state.editingId = null;
  managerPanel.hidden = true;
  candidateList.innerHTML = "";
  hotelForm.reset();
}

function readHotelForm() {
  const coordinateStatus = document.querySelector("#formCoordinateStatus").value;
  const latRaw = document.querySelector("#formLat").value.trim();
  const lngRaw = document.querySelector("#formLng").value.trim();
  const lat = parseNumber(document.querySelector("#formLat").value);
  const lng = parseNumber(document.querySelector("#formLng").value);
  if (!document.querySelector("#formName").value.trim()) throw new Error("酒店中文名必填");
  if (!document.querySelector("#formBrand").value.trim()) throw new Error("品牌必填");
  if (!document.querySelector("#formCity").value.trim()) throw new Error("城市必填");
  if (coordinateStatus === "exact" && (!Number.isFinite(lat) || !Number.isFinite(lng))) {
    throw new Error("精确坐标需要填写有效的纬度和经度");
  }
  if ((latRaw || lngRaw) && (!Number.isFinite(lat) || !Number.isFinite(lng))) {
    throw new Error("纬度和经度需要同时填写有效数字，或同时留空");
  }
  const original = activeHotels.find((hotel) => hotel.id === state.editingId) || {};
  const groupValue = document.querySelector("#formGroup").value.trim();
  const groupKind = getHotelGroupKind(groupValue);
  const visibleHotelCode = document.querySelector("#formHotelCode").value.trim();
  const visibleMarriottCode = document.querySelector("#formMarriottCode").value.trim();
  const hotel = {
    ...original,
    group: groupValue,
    name: document.querySelector("#formName").value.trim(),
    englishName: document.querySelector("#formEnglishName").value.trim(),
    userAlias: document.querySelector("#formUserAlias").value.trim(),
    brand: document.querySelector("#formBrand").value.trim(),
    country: document.querySelector("#formCountry").value.trim(),
    province: document.querySelector("#formProvince").value.trim(),
    region: document.querySelector("#formRegion").value.trim(),
    city: document.querySelector("#formCity").value.trim(),
    address: document.querySelector("#formAddress").value.trim(),
    hotelCode: groupKind === "marriott" ? original.hotelCode || visibleMarriottCode : visibleHotelCode,
    marriottCode: groupKind === "marriott" ? visibleMarriottCode : original.marriottCode,
    lat: coordinateStatus === "missing" ? null : lat,
    lng: coordinateStatus === "missing" ? null : lng,
    coordinateStatus,
    isDeflagged: document.querySelector("#formIsDeflagged").value === "true",
    status: document.querySelector("#formStatus").value.trim(),
    stayCount: parseLooseNumber(document.querySelector("#formStayCount").value),
    firstStayYear: parseNumber(document.querySelector("#formFirstStayYear").value),
    lastStayYear: parseNumber(document.querySelector("#formLastStayYear").value),
    rating: parseLooseNumber(document.querySelector("#formRating").value),
    tags: document.querySelector("#formTags").value.split(",").map((tag) => tag.trim()).filter(Boolean),
    notes: document.querySelector("#formNotes").value.trim()
  };
  if (!hotel.id) hotel.id = createHotelId(hotel);
  return hotel;
}

function deleteHotel(id) {
  if (!confirm("确定删除这家酒店吗？")) return;
  createAutoSnapshot("before-delete-hotel");
  activeHotels = activeHotels.filter((hotel) => hotel.id !== id);
  if (state.selectedId === id) {
    state.selectedId = null;
    renderDetail(null);
  }
  closeHotelForm();
  saveAndRefresh();
}

async function searchHotelInfo() {
  if (!AMAP_API_KEY) {
    candidateList.innerHTML = '<p class="empty-state">请先配置地图 API Key</p>';
    return;
  }
  const keywords = hotelSearchInput.value.trim();
  if (!keywords) return;
  candidateList.innerHTML = '<p class="empty-state">搜索中...</p>';
  try {
    const url = new URL("https://restapi.amap.com/v3/place/text");
    url.searchParams.set("key", AMAP_API_KEY);
    url.searchParams.set("keywords", keywords);
    url.searchParams.set("offset", "8");
    url.searchParams.set("extensions", "base");
    const response = await fetch(url);
    const data = await response.json();
    const pois = Array.isArray(data.pois) ? data.pois : [];
    if (pois.length === 0) {
      candidateList.innerHTML = '<p class="empty-state">未找到候选结果，请手动填写</p>';
      return;
    }
    candidateList.innerHTML = "";
    pois.forEach((poi) => {
      const [lng, lat] = String(poi.location || "").split(",");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "candidate-item";
      button.innerHTML = `<strong>${poi.name}</strong><span>${poi.address || "地址待确认"}</span><span>${poi.cityname || ""} · ${lat || ""}, ${lng || ""}</span><span>来源：高德地图</span>`;
      button.addEventListener("click", () => {
        setField("#formName", poi.name || document.querySelector("#formName").value);
        setField("#formAddress", poi.address || document.querySelector("#formAddress").value);
        if (poi.cityname) setField("#formCity", poi.cityname.replace(/市$/, ""));
        setField("#formLat", lat || "");
        setField("#formLng", lng || "");
        setField("#formCoordinateStatus", lat && lng ? "exact" : "missing");
        const note = document.querySelector("#formNotes").value || "模板示例记录，可替换为自己的内容";
        if (!note.includes("坐标来自地图搜索")) setField("#formNotes", note + "；坐标来自地图搜索，需人工确认");
      });
      candidateList.appendChild(button);
    });
  } catch (error) {
    candidateList.innerHTML = '<p class="empty-state">搜索失败，请稍后再试</p>';
  }
}

exportJsonButton.addEventListener("click", exportJson);
importJsonButton.addEventListener("click", () => importJsonFile.click());
exportFootprintJsonButton?.addEventListener("click", exportFootprintJson);
importFootprintJsonButton?.addEventListener("click", () => importFootprintJsonFile?.click());
viewAutoSnapshotsButton?.addEventListener("click", openSnapshotPanel);
restoreLatestSnapshotButton?.addEventListener("click", restoreLatestSnapshot);
closeSnapshotPanelButton?.addEventListener("click", closeSnapshotPanel);
saveLocalButton.addEventListener("click", saveToLocal);
reloadDefaultButton.addEventListener("click", useDefaultHotels);
clearLocalButton.addEventListener("click", useDefaultHotels);
toggleAdvancedButton?.addEventListener("click", () => {
  state.isAdvancedOpen = !state.isAdvancedOpen;
  state.manageMode = state.isAdvancedOpen;
  if (!state.manageMode) {
    closeHotelForm();
    closePlaceForm();
    closeVisitRecordForm();
    closeBulkCityPanel();
    closeRailForm();
  }
  updateManagementActions();
  renderAll();
});

addHotelButton.addEventListener("click", () => openHotelForm());
addPlaceButton?.addEventListener("click", () => openPlaceForm());
bulkAddCitiesButton?.addEventListener("click", openBulkCityPanel);
addRailTripButton?.addEventListener("click", () => openRailForm());
exportRailTripsJsButton?.addEventListener("click", exportRailTripsJs);
clearRailOverrideButton?.addEventListener("click", clearRailOverride);
saveBulkCitiesButton?.addEventListener("click", saveBulkCities);
cancelBulkCitiesButton?.addEventListener("click", closeBulkCityPanel);
closeBulkCitiesButton?.addEventListener("click", closeBulkCityPanel);
cancelEditButton.addEventListener("click", closeHotelForm);
cancelRailEditButton?.addEventListener("click", closeRailForm);
document.querySelector("#cancelPlaceEdit")?.addEventListener("click", closePlaceForm);
document.querySelector("#cancelVisitRecordEdit")?.addEventListener("click", closeVisitRecordForm);
visitCountCategoryInput?.addEventListener("change", updateVisitRecordPreview);
visitRecordsInput?.addEventListener("input", updateVisitRecordPreview);
formGroupInput?.addEventListener("input", updateHotelCodeFields);
formGroupInput?.addEventListener("change", updateHotelCodeFields);
visitRecordForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    saveVisitRecordForm();
  } catch (error) {
    alert(error.message);
    updateVisitRecordPreview();
  }
});
searchHotelButton.addEventListener("click", searchHotelInfo);
hotelForm.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    const hotel = readHotelForm();
    createAutoSnapshot(state.editingId ? "before-edit-hotel" : "before-add-hotel");
    if (state.editingId) {
      activeHotels = activeHotels.map((item) => item.id === state.editingId ? hotel : item);
      state.selectedId = hotel.id;
    } else {
      activeHotels = [...activeHotels, hotel];
      state.selectedId = hotel.id;
    }
    closeHotelForm();
    renderDetail(hotel);
    saveAndRefresh();
  } catch (error) {
    alert(error.message);
  }
});

railForm?.addEventListener("submit", saveRailTripFromForm);

importJsonFile.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) importJson(file);
});

importFootprintJsonFile?.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) importFootprintJson(file);
});

placeForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    savePlaceManual(readPlaceForm());
  } catch (error) {
    alert(error.message);
  }
});

exportPlacesJsonButton?.addEventListener("click", exportPlacesJson);
importPlacesJsonButton?.addEventListener("click", () => importPlacesJsonFile?.click());
importPlacesJsonFile?.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) importPlacesJson(file);
});

function hasValidPlaceCoords(place) {
  return Number.isFinite(place.latitude) && Number.isFinite(place.longitude);
}

getCoordinateStatusText = function(status) {
  const labels = {
    exact: "精确坐标",
    missing: "坐标待确认，暂不显示在地图上",
    "city-center": "城市中心点",
    "hotel-average": "城市内酒店坐标平均点"
  };
  return labels[status] || "坐标待确认，暂不显示在地图上";
};

function getManualPlaces() {
  return activeManualPlaces || [];
}

function getPlaceKey(item) {
  return [item.country || "", getArea(item), item.city || item.name || ""].join("|");
}

const placeBoundaryAliases = {
  "中国|贵州|仁怀": { key: "中国|贵州|遵义", displayMode: "按所属地级市高亮" },
  "中国|河北|雄安": { key: "中国|河北|保定", displayMode: "按实际旅行归属高亮" },
  "中国|浙江|千岛湖": { key: "中国|浙江|杭州", displayMode: "按所属行政区高亮" },
  "中国|广东|顺德": { key: "中国|广东|佛山", displayMode: "按所属地级市高亮" },
  "中国|云南|大理": { key: "中国|云南|大理白族自治州", displayMode: "按所属行政区高亮" },
  "中国|云南|西双版纳": { key: "中国|云南|西双版纳傣族自治州", displayMode: "按所属行政区高亮" }
};

function getOriginalBoundaryKey(place) {
  return getPlaceKey({ ...place, city: place.name });
}

function getBoundaryKey(place) {
  const originalKey = getOriginalBoundaryKey(place);
  return placeBoundaryAliases[originalKey]?.key || originalKey;
}

function getBoundaryAlias(place) {
  return placeBoundaryAliases[getOriginalBoundaryKey(place)] || null;
}

function getBoundaryNameFromKey(key) {
  return key.split("|").filter(Boolean).at(-1) || "";
}

function usesBoundaryAlias(place) {
  return getOriginalBoundaryKey(place) !== getBoundaryKey(place);
}

function getPlaceBoundary(place) {
  const boundaries = window.cityBoundaries || {};
  const directAdminBoundaries = window.mainlandDirectAdminBoundaries || {};
  const mainlandBoundaries = window.mainlandCityBoundaries || {};
  const key = getBoundaryKey(place);
  return boundaries[key] || directAdminBoundaries[key] || mainlandBoundaries[key] || null;
}

function usesDirectAdminBoundary(place) {
  const directAdminBoundaries = window.mainlandDirectAdminBoundaries || {};
  return Boolean(directAdminBoundaries[getBoundaryKey(place)]);
}

function isMainlandChinaPlace(place) {
  const area = getArea(place);
  return (
    place.country === "中国" || place.country === "中国大陆"
  ) && !["澳门", "香港", "台湾"].includes(area);
}

function getPlaceMapDisplayText(place) {
  if (getPlaceBoundary(place)) {
    const alias = getBoundaryAlias(place);
    if (usesDirectAdminBoundary(place)) return `省直管县边界高亮：${getBoundaryNameFromKey(getBoundaryKey(place))}`;
    return alias
      ? `${alias.displayMode}：${getBoundaryNameFromKey(getBoundaryKey(place))}`
      : "行政区高亮";
  }
  return isMainlandChinaPlace(place) ? "圆点显示，待补行政区边界" : "圆点显示";
}

function getPlaceMapDisplayLabel(place) {
  if (getPlaceBoundary(place)) {
    const alias = getBoundaryAlias(place);
    if (usesDirectAdminBoundary(place)) return "省直管县边界高亮";
    return alias ? alias.displayMode : "行政区高亮";
  }
  return isMainlandChinaPlace(place) ? "待补边界" : "圆点显示";
}

function getPlaceSearchableText(place) {
  const relatedHotelText = (place.hotelsInCity || [])
    .map((hotel) => [getHotelName(hotel), hotel.group, hotel.brand, hotel.englishName, hotel.userAlias].map(normalizeSearchValue).join(" "))
    .join(" ");
  return [
    place.name,
    place.country,
    place.province,
    place.region,
    place.type,
    place.tags,
    place.note,
    place.visitCountLabel,
    place.visitRecords,
    place.firstVisit,
    place.lastVisit,
    place.source,
    place.sourceLabel,
    place.groupsInCity,
    place.brandsInCity,
    relatedHotelText
  ].map(normalizeSearchValue).join(" ").toLowerCase();
}

matchesSearch = function(item, query, getter = getSearchableText) {
  const keywords = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (keywords.length === 0) return true;
  const text = getter(item);
  return keywords.every((keyword) => text.includes(keyword));
};

function normalizeVisitRecord(rawValue, lineNumber = 1) {
  const value = String(rawValue || "").trim().replace(/[-/]/g, ".");
  if (!value) return null;
  const match = value.match(/^(\d{4})(?:\.(\d{1,2})(?:\.(\d{1,2}))?)?$/);
  if (!match) throw new Error(`第 ${lineNumber} 行访问日期格式不正确：${rawValue}`);
  const year = Number(match[1]);
  const month = match[2] === undefined ? null : Number(match[2]);
  const day = match[3] === undefined ? null : Number(match[3]);
  if (month !== null && (month < 1 || month > 12)) throw new Error(`第 ${lineNumber} 行月份必须为 1-12：${rawValue}`);
  if (day !== null && (day < 1 || day > 31)) throw new Error(`第 ${lineNumber} 行日期必须为 1-31：${rawValue}`);
  const formatted = [
    String(year).padStart(4, "0"),
    month === null ? null : String(month).padStart(2, "0"),
    day === null ? null : String(day).padStart(2, "0")
  ].filter(Boolean).join(".");
  const sortKey = `${String(year).padStart(4, "0")}.${String(month || 0).padStart(2, "0")}.${String(day || 0).padStart(2, "0")}`;
  return { value: formatted, sortKey };
}

function parseVisitRecords(value) {
  const seen = new Set();
  const visitRecords = String(value || "")
    .split(/\r?\n/)
    .map((line, index) => normalizeVisitRecord(line, index + 1))
    .filter(Boolean)
    .filter((record) => {
      if (seen.has(record.value)) return false;
      seen.add(record.value);
      return true;
    })
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
    .map((record) => record.value);
  return {
    visitRecords,
    visitCount: visitRecords.length || null,
    firstVisit: visitRecords[0] || "",
    lastVisit: visitRecords[visitRecords.length - 1] || "",
    visitYears: [...new Set(visitRecords.map((record) => Number(record.slice(0, 4))).filter(Number.isFinite))]
  };
}

function getVisitCountOption(category) {
  return visitCountOptions.find((option) => option.value === category) || visitCountOptions[0];
}

function getVisitCountOptionsHtml(selectedCategory = "unknown") {
  return visitCountOptions
    .map((option) => `<option value="${option.value}"${option.value === selectedCategory ? " selected" : ""}>${option.label}</option>`)
    .join("");
}

function getVisitTierLegendHtml(levelLabel = "城市级") {
  const tiers = ["long-term", "10+", "5-9", "3", "2", "1", "unknown"];
  const labels = {
    "3": "3–4 次"
  };
  return `
    <span class="legend-title">城市访问强度（${levelLabel}）</span>
    ${tiers.map((tier) => {
      const style = visitTierStyles[tier] || visitTierStyles.unknown;
      return `<span><i class="legend-pin" style="background:${style.fillColor};border:1px solid ${style.color};"></i>${labels[tier] || style.label}</span>`;
    }).join("")}
  `;
}

function normalizeVisitCountCategory(source = {}) {
  if (!source) return "unknown";
  if (typeof source === "string") source = { visitCountLabel: source };
  const rawCategory = String(source.visitCountCategory || "").trim();
  if (visitCountOptions.some((option) => option.value === rawCategory)) return rawCategory;
  let value = String(source.visitCountLabel || "").trim();
  if (!value && Number.isFinite(source.visitCount)) {
    const count = source.visitCount;
    if (count >= 10) return "10+";
    if (count >= 5) return "5-9";
    if (count >= 1 && count <= 4) return String(count);
  }
  if (!value) return "unknown";
  if (visitCountOptions.some((option) => option.label === value)) {
    return visitCountOptions.find((option) => option.label === value).value;
  }
  value = value
    .replace(/[＞﹥]/g, ">")
    .replace(/[＜﹤]/g, "<")
    .replace(/[＝]/g, "=")
    .replace(/[＋]/g, "+")
    .replace(/\s+/g, "")
    .replace(/次/g, "");
  const normalized = value
    .replace(/>=/g, "≥")
    .replace(/>\s*=/g, "≥")
    .replace(/１０/g, "10");
  if (["1"].includes(normalized)) return "1";
  if (["2"].includes(normalized)) return "2";
  if (["3"].includes(normalized)) return "3";
  if (["4"].includes(normalized)) return "4";
  if (["5-9", "5–9", "5~9", "5至9"].includes(normalized)) return "5-9";
  if (["≥10", "10+", "10以上", "高频往返"].includes(normalized)) return "10+";
  if (normalized.includes("10以上") || normalized.includes("高频往返")) return "10+";
  if (["长期居住", "长期停留", "读书期间长期停留"].includes(normalized)) return "long-term";
  if (normalized.includes("长期")) return "long-term";
  return "unknown";
}

function countToVisitCategory(count) {
  if (!Number.isFinite(count) || count <= 0) return "unknown";
  if (count >= 10) return "10+";
  if (count >= 5) return "5-9";
  if (count >= 3) return "3";
  if (count === 2) return "2";
  return "1";
}

function getPlaceVisitCategory(place) {
  if (!place) return "unknown";
  const rawCategory = String(place.visitCountCategory || "").trim();
  if (rawCategory && rawCategory !== "unknown" && visitCountOptions.some((option) => option.value === rawCategory)) {
    return rawCategory;
  }
  const labelCategory = normalizeVisitCountCategory({ visitCountLabel: place.visitCountLabel });
  if (labelCategory !== "unknown") return labelCategory;
  if (Array.isArray(place.visitRecords) && place.visitRecords.length > 0) {
    return countToVisitCategory(place.visitRecords.length);
  }
  if (Number.isFinite(place.visitCount)) return countToVisitCategory(place.visitCount);
  if (Number.isFinite(place.hotelCount) && place.hotelCount > 0) return "1";
  return "unknown";
}

function getPlaceVisitStyle(place) {
  return visitTierStyles[getPlaceVisitCategory(place)] || visitTierStyles.unknown;
}

function getVisitTierRank(category) {
  return visitTierRank[category] ?? 0;
}

function getHighestVisitCategory(items = []) {
  return items.reduce((highest, item) => {
    const category = getPlaceVisitCategory(item);
    return getVisitTierRank(category) > getVisitTierRank(highest) ? category : highest;
  }, "unknown");
}

function getAggregatedVisitStyle(category) {
  return visitTierStyles[category] || visitTierStyles.unknown;
}

function normalizeVisitCountSelection(category) {
  const normalizedCategory = normalizeVisitCountCategory({ visitCountCategory: category });
  const option = getVisitCountOption(normalizedCategory);
  return {
    category: option.value,
    label: option.value === "unknown" ? "" : option.label,
    numeric: option.numeric
  };
}

function normalizeVisitCountLabel(input) {
  let value = String(input || "").trim();
  if (!value) return { label: "", numeric: null };
  const category = normalizeVisitCountCategory({ visitCountLabel: value });
  if (category !== "unknown") {
    const option = getVisitCountOption(category);
    return { label: option.label, numeric: option.numeric, category };
  }
  value = value
    .replace(/[＞﹥]/g, ">")
    .replace(/[＜﹤]/g, "<")
    .replace(/[＝]/g, "=")
    .replace(/>\s*=/g, "≥")
    .replace(/<\s*=/g, "≤")
    .replace(/>=/g, "≥")
    .replace(/<=/g, "≤")
    .replace(/\s+/g, " ");
  const pureNumber = value.match(/^\d+$/);
  if (pureNumber) return { label: value, numeric: Number(value) };
  const plusNumber = value.match(/^(\d+)\+$/);
  if (plusNumber) return { label: `≥${plusNumber[1]}`, numeric: Number(plusNumber[1]) };
  const moreThanNumber = value.match(/^(?:≥|>\s*)(\d+)(?:以上)?$/);
  if (moreThanNumber) return { label: `≥${moreThanNumber[1]}`, numeric: Number(moreThanNumber[1]) };
  const aboveNumber = value.match(/^(\d+)以上$/);
  if (aboveNumber) return { label: `≥${aboveNumber[1]}`, numeric: Number(aboveNumber[1]) };
  return { label: value, numeric: null };
}

function formatVisitCountLabel(label) {
  const value = String(label || "").trim();
  if (!value) return "";
  if (/^\d+$/.test(value) || /^[≥≤<>]\s*\d+$/.test(value)) return `${value} 次`;
  return value;
}

function deriveVisitInfo(place) {
  const records = Array.isArray(place.visitRecords) ? place.visitRecords.filter(Boolean) : [];
  const category = normalizeVisitCountCategory(place);
  const categoryInfo = normalizeVisitCountSelection(category);
  if (records.length > 0) {
    const parsed = parseVisitRecords(records.join("\n"));
    return {
      ...parsed,
      visitCountCategory: categoryInfo.category,
      visitCountLabel: categoryInfo.label,
      visitCount: categoryInfo.numeric ?? parsed.visitCount
    };
  }
  return {
    visitRecords: [],
    visitCountCategory: categoryInfo.category,
    visitCountLabel: categoryInfo.label,
    visitCount: categoryInfo.numeric ?? (Number.isFinite(place.visitCount) ? place.visitCount : null),
    firstVisit: place.firstVisit || (Number.isFinite(place.firstVisitYear) ? String(place.firstVisitYear) : ""),
    lastVisit: place.lastVisit || (Number.isFinite(place.lastVisitYear) ? String(place.lastVisitYear) : ""),
    visitYears: Array.isArray(place.visitYears) ? place.visitYears : []
  };
}

function getVisitCountText(place) {
  const category = getPlaceVisitCategory(place);
  if (category !== "unknown") return getVisitCountOption(category).label;
  if (place.visitCountLabel) return formatVisitCountLabel(place.visitCountLabel);
  if (Array.isArray(place.visitRecords) && place.visitRecords.length > 0) return `${place.visitRecords.length} 次`;
  if (place.hotelCount > 0) return "至少 1 次";
  if (Number.isFinite(place.visitCount)) return `${place.visitCount} 次`;
  return "待补充";
}

function getVisitCountEstimate(place) {
  const categoryInfo = normalizeVisitCountSelection(getPlaceVisitCategory(place));
  if (Number.isFinite(categoryInfo.numeric)) return categoryInfo.numeric;
  if (Array.isArray(place.visitRecords) && place.visitRecords.length > 0) return place.visitRecords.length;
  if (Number.isFinite(place.visitCount)) return place.visitCount;
  if (place.hotelCount > 0) return 1;
  return 0;
}

function getFirstVisitText(place) {
  return place.firstVisit || (Number.isFinite(place.firstVisitYear) ? String(place.firstVisitYear) : "") || "待补充";
}

function getLastVisitText(place) {
  return place.lastVisit || (Number.isFinite(place.lastVisitYear) ? String(place.lastVisitYear) : "") || "待补充";
}

function normalizePlace(place) {
  const id = place.id || `place-${slugify([place.country, place.province || place.region, place.name].filter(Boolean).join("-"))}`;
  const visitInfo = deriveVisitInfo(place);
  return {
    id,
    manualId: place.manualId || id,
    type: place.type || "city",
    name: place.name || "",
    country: place.country || "",
    province: place.province || "",
    region: place.region || "",
    latitude: Number.isFinite(place.latitude) ? place.latitude : null,
    longitude: Number.isFinite(place.longitude) ? place.longitude : null,
    coordinateStatus: place.coordinateStatus || (Number.isFinite(place.latitude) && Number.isFinite(place.longitude) ? "city-center" : "missing"),
    visitRecords: visitInfo.visitRecords,
    visitCountCategory: visitInfo.visitCountCategory || "unknown",
    visitCountLabel: visitInfo.visitCountLabel || "",
    visitCount: visitInfo.visitCount,
    firstVisit: visitInfo.firstVisit,
    lastVisit: visitInfo.lastVisit,
    firstVisitYear: Number.isFinite(place.firstVisitYear) ? place.firstVisitYear : null,
    lastVisitYear: Number.isFinite(place.lastVisitYear) ? place.lastVisitYear : null,
    visitYears: visitInfo.visitYears,
    tags: Array.isArray(place.tags) ? place.tags : [],
    note: place.note || "",
    source: place.source || "manual",
    hotelsInCity: [],
    hotelCount: 0,
    groupCount: 0,
    brandCount: 0,
    groupsInCity: [],
    brandsInCity: [],
    sourceLabel: "手动记录"
  };
}

function buildHotelDerivedPlaces() {
  const placeMap = new Map();
  activeHotels.forEach((hotel) => {
    if (!hotel.city) return;
    const key = getPlaceKey(hotel);
    if (!placeMap.has(key)) {
      placeMap.set(key, {
        id: `place-${slugify([hotel.country, getArea(hotel), hotel.city].filter(Boolean).join("-"))}`,
        type: "city",
        name: hotel.city,
        country: hotel.country || "",
        province: hotel.province || "",
        region: hotel.region || "",
        latitude: null,
        longitude: null,
        coordinateStatus: "missing",
        visitRecords: [],
        visitCount: null,
        firstVisit: "",
        lastVisit: "",
        firstVisitYear: null,
        lastVisitYear: null,
        visitYears: [],
        tags: [],
        note: "从酒店记录自动生成的城市足迹。",
        source: "hotel-derived",
        hotelsInCity: []
      });
    }
    placeMap.get(key).hotelsInCity.push(hotel);
  });

  return [...placeMap.values()].map((place) => {
    const locatedHotels = place.hotelsInCity.filter(hasValidCoords);
    if (locatedHotels.length > 0) {
      place.latitude = locatedHotels.reduce((sum, hotel) => sum + hotel.lat, 0) / locatedHotels.length;
      place.longitude = locatedHotels.reduce((sum, hotel) => sum + hotel.lng, 0) / locatedHotels.length;
      place.coordinateStatus = "hotel-average";
    }
    place.hotelCount = place.hotelsInCity.length;
    place.groupsInCity = uniqueValues(place.hotelsInCity, (hotel) => hotel.group);
    place.brandsInCity = uniqueValues(place.hotelsInCity, (hotel) => hotel.brand);
    place.groupCount = place.groupsInCity.length;
    place.brandCount = place.brandsInCity.length;
    place.sourceLabel = "来自酒店记录";
    return place;
  });
}

function getAllPlaces() {
  const merged = new Map();
  buildHotelDerivedPlaces().forEach((place) => merged.set(getPlaceKey(place), place));
  getManualPlaces().map(normalizePlace).forEach((manualPlace) => {
    const key = getPlaceKey({ ...manualPlace, city: manualPlace.name });
    const derived = merged.get(key);
    if (!derived) {
      merged.set(key, manualPlace);
      return;
    }
    merged.set(key, {
      ...derived,
      ...manualPlace,
      latitude: hasValidPlaceCoords(manualPlace) ? manualPlace.latitude : derived.latitude,
      longitude: hasValidPlaceCoords(manualPlace) ? manualPlace.longitude : derived.longitude,
      coordinateStatus: hasValidPlaceCoords(manualPlace) ? manualPlace.coordinateStatus : derived.coordinateStatus,
      hotelsInCity: derived.hotelsInCity,
      hotelCount: derived.hotelCount,
      groupCount: derived.groupCount,
      brandCount: derived.brandCount,
      groupsInCity: derived.groupsInCity,
      brandsInCity: derived.brandsInCity,
      manualId: manualPlace.id,
      hasManual: true,
      source: manualPlace.source === "manual" ? "manual+hotel-derived" : manualPlace.source,
      sourceLabel: "手动记录 + 来自酒店记录"
    });
  });
  return [...merged.values()].sort((a, b) => a.name.localeCompare(b.name, "zh-Hans-CN"));
}

function getFilteredPlaces() {
  return getAllPlaces().filter((place) => {
    const countryMatch = state.country === "all" || place.country === state.country;
    const areaMatch = state.area === "all" || getArea(place) === state.area;
    const cityMatch = state.city === "all" || place.name === state.city;
    const tagMatch = state.tag === "all" || (place.tags || []).includes(state.tag);
    return countryMatch && areaMatch && cityMatch && tagMatch && matchesSearch(place, state.searchQuery, getPlaceSearchableText);
  });
}

function getRailStation(name) {
  return railStations[String(name || "").trim()] || null;
}

function normalizeRailTripForStorage(trip) {
  const normalized = { ...(trip || {}) };
  normalized.date = String(normalized.date || "").trim();
  normalized.departureTime = String(normalized.departureTime || "").trim();
  normalized.departureTimeZone = normalized.departureTimeZone || "Asia/Shanghai";
  normalized.trainNo = String(normalized.trainNo || "").trim().toUpperCase();
  normalized.trainType = String(normalized.trainType || "").trim() || getRailTrainTypeLabel(normalized.trainNo);
  normalized.fromStation = String(normalized.fromStation || "").trim();
  normalized.toStation = String(normalized.toStation || "").trim();
  normalized.fromCity = String(normalized.fromCity || "").trim();
  normalized.toCity = String(normalized.toCity || "").trim();
  normalized.fromRegionCode = normalized.fromRegionCode || "CN";
  normalized.toRegionCode = normalized.toRegionCode || "CN";
  normalized.seatType = String(normalized.seatType || "").trim();
  normalized.priceCurrency = normalized.priceCurrency || "CNY";
  if (normalized.priceValue === "" || normalized.priceValue == null) normalized.priceValue = null;
  else {
    const priceValue = Number(normalized.priceValue);
    normalized.priceValue = Number.isFinite(priceValue) ? priceValue : null;
  }
  normalized.distanceKm = normalized.distanceKm ?? null;
  normalized.changeFlag = normalized.changeFlag || "";
  normalized.status = normalized.status || "completed";
  normalized.source = normalized.source || "manual-rail-edit";
  normalized.note = String(normalized.note || normalized.notes || "").trim();
  delete normalized.notes;
  return normalized;
}

function getRailSortKey(trip) {
  return String(trip.departureTime || trip.date || "");
}

function getTripDateTimeValue(trip) {
  const raw = String(trip.departureTime || trip.date || "").replace(/\./g, "-");
  const value = new Date(raw.includes(" ") ? raw.replace(" ", "T") : raw).getTime();
  return Number.isFinite(value) ? value : 0;
}

function getSortableNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function compareNullableNumber(a, b, direction = "asc") {
  const left = getSortableNumber(a);
  const right = getSortableNumber(b);
  if (left == null && right == null) return 0;
  if (left == null) return 1;
  if (right == null) return -1;
  return direction === "desc" ? right - left : left - right;
}

function compareText(a, b) {
  return String(a || "").localeCompare(String(b || ""), "zh-Hans-CN", { numeric: true, sensitivity: "base" });
}

function stableSort(items, compare) {
  return [...items]
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item);
}

function sortRailTrips(items) {
  return [...(Array.isArray(items) ? items : [])].sort((a, b) => getRailSortKey(a).localeCompare(getRailSortKey(b), "en"));
}

function sortRailTripsForDisplay(items) {
  const mode = state.railSort || "date-desc";
  if (mode === "date-asc") return stableSort(items, (a, b) => getTripDateTimeValue(a) - getTripDateTimeValue(b));
  if (mode === "price-desc") return stableSort(items, (a, b) => compareNullableNumber(a.priceValue, b.priceValue, "desc"));
  if (mode === "price-asc") return stableSort(items, (a, b) => compareNullableNumber(a.priceValue, b.priceValue, "asc"));
  if (mode === "train-az") return stableSort(items, (a, b) => compareText(a.trainNo, b.trainNo));
  if (mode === "from-az") return stableSort(items, (a, b) => compareText(a.fromStation, b.fromStation));
  if (mode === "to-az") return stableSort(items, (a, b) => compareText(a.toStation, b.toStation));
  return stableSort(items, (a, b) => getTripDateTimeValue(b) - getTripDateTimeValue(a));
}

function getRailTrainTypeLabel(trainNo) {
  const first = String(trainNo || "").trim().charAt(0).toUpperCase();
  const labels = { G: "高铁", D: "动车", C: "城际", S: "市郊", Z: "直达", T: "特快", K: "快速" };
  return labels[first] || "";
}

function createRailTripId(trip) {
  const base = slugify([trip.date, trip.departureTime, trip.trainNo, trip.fromStation, trip.toStation].filter(Boolean).join("-"));
  let hash = 0;
  const text = [trip.date, trip.departureTime, trip.trainNo, trip.fromStation, trip.toStation, trip.priceValue ?? ""].join("|");
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return `rail-${base || "manual"}-${hash.toString(36)}`;
}

function hasValidStationCoords(station) {
  return station && Number.isFinite(station.latitude) && Number.isFinite(station.longitude);
}

function getRailTripStations(trip) {
  const from = getRailStation(trip.fromStation);
  const to = getRailStation(trip.toStation);
  return { from, to, hasCoords: hasValidStationCoords(from) && hasValidStationCoords(to) };
}

function getRailTripSearchableText(trip) {
  const { from, to } = getRailTripStations(trip);
  return [
    trip.date,
    trip.departureTime,
    trip.trainNo,
    trip.trainType,
    trip.fromStation,
    trip.toStation,
    trip.fromCity,
    trip.toCity,
    from?.city,
    to?.city,
    from?.province,
    to?.province,
    trip.seatType,
    trip.priceValue,
    trip.sourceLabel,
    trip.confidence,
    trip.datePrecision,
    trip.originalApproxDate,
    trip.equipment,
    trip.notes,
    trip.sources,
    trip.note
  ].map(normalizeSearchValue).join(" ");
}

function getRailTripYear(trip) {
  const raw = String(trip.date || trip.departureTime || "");
  const match = raw.match(/\d{4}/);
  return match ? match[0] : "";
}

function getRailTrainType(trip) {
  const first = String(trip.trainNo || "").trim().charAt(0).toUpperCase();
  return ["G", "D", "C", "S"].includes(first) ? first : "other";
}

function getRailSeatCategory(trip) {
  const seat = String(trip.seatType || "").trim();
  return ["商务座", "特等座", "一等座", "二等座", "二等座无座"].includes(seat) ? seat : "other";
}

function getFilteredRailTrips() {
  return activeRailTrips.filter((trip) => {
    const typeMatch = state.railType === "all" || getRailTrainType(trip) === state.railType;
    const seatMatch = state.railSeat === "all" || getRailSeatCategory(trip) === state.railSeat;
    const fromMatch = state.railFrom === "all" || trip.fromStation === state.railFrom;
    const toMatch = state.railTo === "all" || trip.toStation === state.railTo;
    const yearMatch = state.railYear === "all" || getRailTripYear(trip) === state.railYear;
    return typeMatch && seatMatch && fromMatch && toMatch && yearMatch && matchesSearch(trip, state.searchQuery, getRailTripSearchableText);
  });
}

function getRailRouteKey(trip) {
  return `${trip.fromStation || ""}→${trip.toStation || ""}`;
}

function getRailUniqueStations(items = activeRailTrips) {
  return [...new Set(items.flatMap((trip) => [trip.fromStation, trip.toStation]).filter(Boolean))];
}

function getRailStationUsage(items = activeRailTrips) {
  const usage = new Map();
  items.forEach((trip) => {
    [trip.fromStation, trip.toStation].forEach((stationName) => {
      if (!stationName) return;
      const current = usage.get(stationName) || { departures: 0, arrivals: 0, total: 0 };
      if (stationName === trip.fromStation) current.departures += 1;
      if (stationName === trip.toStation) current.arrivals += 1;
      current.total += 1;
      usage.set(stationName, current);
    });
  });
  return usage;
}

function formatRailPrice(trip) {
  return Number.isFinite(trip.priceValue) ? `${trip.priceCurrency || "CNY"} ${trip.priceValue.toFixed(2)}` : "待补充";
}

function getRailDrawableTrips(items = activeRailTrips) {
  return items.filter((trip) => getRailTripStations(trip).hasCoords);
}

function getFlightAirport(name) {
  return flightAirports[String(name || "").trim()] || null;
}

function hasValidAirportCoords(airport) {
  return airport && Number.isFinite(airport.lat) && Number.isFinite(airport.lng);
}

function getFlightTripAirports(trip) {
  const from = getFlightAirport(trip.fromAirport);
  const to = getFlightAirport(trip.toAirport);
  return { from, to, hasCoords: hasValidAirportCoords(from) && hasValidAirportCoords(to) };
}

const flightAirlineAliases = {
  CA: ["中国国际航空", "国航"],
  ZH: ["深圳航空", "深航"],
  CZ: ["中国南方航空", "南航"],
  MU: ["中国东方航空", "东航"],
  FM: ["上海航空", "上航"],
  MF: ["厦门航空", "厦航"],
  SC: ["山东航空", "山航"],
  HU: ["海南航空", "海航"],
  "3U": ["四川航空", "川航"],
  JD: ["首都航空"],
  HO: ["吉祥航空"],
  KN: ["中国联合航空", "中联航"],
  GJ: ["长龙航空"],
  "9C": ["春秋航空"],
  AQ: ["九元航空"],
  PN: ["西部航空"],
  GS: ["天津航空"],
  EU: ["成都航空"],
  NS: ["河北航空"],
  QW: ["青岛航空"],
  TV: ["西藏航空"],
  KY: ["昆明航空"],
  JR: ["幸福航空"],
  BK: ["奥凯航空"],
  GX: ["北部湾航空"],
  UQ: ["乌鲁木齐航空"],
  FU: ["福州航空"],
  RY: ["江西航空"],
  DR: ["瑞丽航空"],
  A6: ["红土航空"],
  OQ: ["重庆航空"]
};

function getFlightAirlineCode(trip) {
  const code = String(trip.airlineCode || "").trim().toUpperCase();
  if (code) return code;
  const match = String(trip.flightNo || "").trim().toUpperCase().match(/^[A-Z0-9]{2}(?=\d)/);
  return match ? match[0] : "";
}

function getFlightAirlineAliasText(trip) {
  const code = getFlightAirlineCode(trip);
  return [code, ...(flightAirlineAliases[code] || [])].join(" ");
}

function getFlightModeLabel(trip) {
  if (trip.modeLabel) return trip.modeLabel;
  if (trip.mode === "ferry") return "轮船/船班";
  if (trip.mode === "air_candidate_with_ground_uncertainty") return "疑似航班/待核实";
  return "航班";
}

function getMemorySourceBadge(trip) {
  return trip.source === "memory-reconstruction" || trip.status === "reconstructed"
    ? '<span class="map-display-pill memory-source-pill">待核实记录</span>'
    : "";
}

function getFlightTripSearchableText(trip) {
  const { from, to } = getFlightTripAirports(trip);
  return [
    trip.date,
    trip.airline,
    getFlightAirlineCode(trip),
    getFlightAirlineAliasText(trip),
    trip.flightNo,
    getFlightModeLabel(trip),
    trip.sourceLabel,
    trip.confidence,
    trip.datePrecision,
    trip.originalApproxDate,
    trip.equipment,
    trip.notes,
    trip.sources,
    trip.fromAirport,
    trip.toAirport,
    trip.departTime,
    trip.arriveTime,
    trip.distanceKm,
    from?.city,
    to?.city,
    from?.province,
    to?.province,
    from?.country,
    to?.country
  ].map(normalizeSearchValue).join(" ");
}

function getFlightTripYear(trip) {
  const raw = String(trip.date || "");
  const match = raw.match(/\d{4}/);
  return match ? match[0] : "";
}

function getFilteredFlightTrips() {
  return activeFlightTrips.filter((trip) => {
    const airlineMatch = state.flightAirline === "all" || trip.airline === state.flightAirline;
    const yearMatch = state.flightYear === "all" || getFlightTripYear(trip) === state.flightYear;
    const fromMatch = state.flightFrom === "all" || trip.fromAirport === state.flightFrom;
    const toMatch = state.flightTo === "all" || trip.toAirport === state.flightTo;
    const cityMatch = state.flightCity === "all" || getFlightAirport(trip.toAirport)?.city === state.flightCity;
    return airlineMatch && yearMatch && fromMatch && toMatch && cityMatch && matchesSearch(trip, state.searchQuery, getFlightTripSearchableText);
  });
}

function sortFlightTripsForDisplay(items) {
  const mode = state.flightSort || "date-desc";
  if (mode === "date-asc") return stableSort(items, (a, b) => getTripDateTimeValue(a) - getTripDateTimeValue(b));
  if (mode === "distance-desc") return stableSort(items, (a, b) => compareNullableNumber(a.distanceKm, b.distanceKm, "desc"));
  if (mode === "distance-asc") return stableSort(items, (a, b) => compareNullableNumber(a.distanceKm, b.distanceKm, "asc"));
  if (mode === "flight-az") return stableSort(items, (a, b) => compareText(a.flightNo, b.flightNo));
  if (mode === "airline-az") return stableSort(items, (a, b) => compareText(a.airline || getFlightAirlineCode(a), b.airline || getFlightAirlineCode(b)));
  if (mode === "from-az") return stableSort(items, (a, b) => compareText(a.fromAirport, b.fromAirport));
  if (mode === "to-az") return stableSort(items, (a, b) => compareText(a.toAirport, b.toAirport));
  return stableSort(items, (a, b) => getTripDateTimeValue(b) - getTripDateTimeValue(a));
}

function getFlightRouteKey(trip) {
  return `${trip.fromAirport || ""}→${trip.toAirport || ""}`;
}

function getFlightUniqueAirports(items = activeFlightTrips) {
  return [...new Set(items.flatMap((trip) => [trip.fromAirport, trip.toAirport]).filter(Boolean))];
}

function getFlightAirportUsage(items = activeFlightTrips) {
  const usage = new Map();
  items.forEach((trip) => {
    [trip.fromAirport, trip.toAirport].forEach((airportName) => {
      if (!airportName) return;
      const current = usage.get(airportName) || { departures: 0, arrivals: 0, total: 0 };
      if (airportName === trip.fromAirport) current.departures += 1;
      if (airportName === trip.toAirport) current.arrivals += 1;
      current.total += 1;
      usage.set(airportName, current);
    });
  });
  return usage;
}

function getFlightMissingAirports(items = activeFlightTrips) {
  return getFlightUniqueAirports(items).filter((airportName) => !hasValidAirportCoords(getFlightAirport(airportName)));
}

function setStatsLabels(labels) {
  hotelCount.nextElementSibling.textContent = labels[0];
  cityCount.nextElementSibling.textContent = labels[1];
  brandCount.nextElementSibling.textContent = labels[2];
  document.querySelector("#groupCount").nextElementSibling.textContent = labels[3];
  document.querySelector("#deflaggedCount").nextElementSibling.textContent = labels[4];
}

function updateModeUi() {
  document.body.classList.toggle("place-mode", state.mode === "place");
  document.body.classList.toggle("hotel-mode", state.mode === "hotel");
  document.body.classList.toggle("rail-mode", state.mode === "rail");
  document.body.classList.toggle("flight-mode", state.mode === "flight");
  if (keywordSearch) {
    keywordSearch.placeholder = state.mode === "flight"
      ? "搜索航班号、航司、机场/港口"
      : state.mode === "rail"
      ? "搜索车次、车站、城市、座席"
      : state.mode === "place"
        ? "搜索城市、国家、地区、标签、关联酒店…"
        : "搜索酒店、城市、品牌、集团、地址、代码…";
  }
  if (state.mode === "flight") {
    setFilterLabel(groupFilter, "航空公司");
    setFilterLabel(brandFilter, "年份");
    setFilterLabel(countryFilter, "出发机场");
    setFilterLabel(areaFilter, "到达机场");
    setFilterLabel(cityFilter, "到达城市");
  } else if (state.mode === "rail") {
    setFilterLabel(groupFilter, "车次类型");
    setFilterLabel(brandFilter, "座席类型");
    setFilterLabel(countryFilter, "出发站");
    setFilterLabel(areaFilter, "到达站");
    setFilterLabel(cityFilter, "年份");
  } else {
    setFilterLabel(groupFilter, "酒店集团");
    setFilterLabel(brandFilter, "品牌");
    setFilterLabel(countryFilter, "国家/地区");
    setFilterLabel(areaFilter, "省份/地区");
    setFilterLabel(cityFilter, "城市");
  }
  if (hotelModeButton) hotelModeButton.classList.toggle("active", state.mode === "hotel");
  if (placeModeButton) placeModeButton.classList.toggle("active", state.mode === "place");
  if (railModeButton) railModeButton.classList.toggle("active", state.mode === "rail");
  if (flightModeButton) flightModeButton.classList.toggle("active", state.mode === "flight");
  if (hotelModeButton) hotelModeButton.setAttribute("aria-pressed", String(state.mode === "hotel"));
  if (placeModeButton) placeModeButton.setAttribute("aria-pressed", String(state.mode === "place"));
  if (railModeButton) railModeButton.setAttribute("aria-pressed", String(state.mode === "rail"));
  if (flightModeButton) flightModeButton.setAttribute("aria-pressed", String(state.mode === "flight"));
  if (tagFilter) tagFilter.closest("label").hidden = state.mode !== "place";
  if (sortFilter) sortFilter.closest("label").hidden = !["rail", "flight"].includes(state.mode);
  updateManagementActions();
  mapLegend.innerHTML = state.mode === "place"
    ? getVisitTierLegendHtml()
    : state.mode === "flight"
      ? '<span><i class="legend-pin flight-airport-dot"></i>机场</span><span><i class="legend-line flight-line-sample"></i>飞行航段</span>'
    : state.mode === "rail"
      ? '<span><i class="legend-pin rail-station-dot"></i>铁路车站</span><span><i class="legend-line rail-line-sample"></i>铁路行程</span>'
    : '<span><i class="legend-pin legend-pin-normal"></i>普通酒店</span><span><i class="legend-pin legend-pin-deflagged"></i>已摘牌酒店</span>';
  if (state.mode === "place") {
    closeHotelForm();
    closeRailForm();
    if (manageNote) manageNote.hidden = !state.manageMode;
  } else if (state.mode === "hotel") {
    closePlaceForm();
    closeVisitRecordForm();
    closeBulkCityPanel();
    closeRailForm();
  } else {
    closeHotelForm();
    closePlaceForm();
    closeVisitRecordForm();
    closeBulkCityPanel();
    if (state.mode !== "rail") closeRailForm();
  }
}

function updateManagementActions() {
  state.manageMode = state.isAdvancedOpen;
  if (addHotelButton) addHotelButton.hidden = !state.manageMode || state.mode !== "hotel";
  if (addPlaceButton) addPlaceButton.hidden = !state.manageMode || state.mode !== "place";
  if (bulkAddCitiesButton) bulkAddCitiesButton.hidden = !state.manageMode || state.mode !== "place";
  if (addRailTripButton) addRailTripButton.hidden = !state.manageMode || state.mode !== "rail";
  if (exportRailTripsJsButton) exportRailTripsJsButton.hidden = !state.manageMode || state.mode !== "rail";
  if (clearRailOverrideButton) clearRailOverrideButton.hidden = !state.manageMode || state.mode !== "rail";
  if (exportPlacesJsonButton) exportPlacesJsonButton.hidden = true;
  if (importPlacesJsonButton) importPlacesJsonButton.hidden = true;
  if (advancedContent) advancedContent.hidden = !state.isAdvancedOpen;
  if (toggleAdvancedButton) {
    toggleAdvancedButton.textContent = state.isAdvancedOpen ? "高级管理 ▲" : "高级管理 ▼";
    toggleAdvancedButton.setAttribute("aria-expanded", String(state.isAdvancedOpen));
  }
  if (manageNote) {
    manageNote.hidden = !state.manageMode;
    manageNote.textContent = state.mode === "rail"
      ? "铁路修改会保存到当前浏览器；部署前请导出 rail-trips.js 并手动替换源文件。"
      : "网页内修改会保存到浏览器本地；如需长期备份，请导出 JSON。";
  }
}

function getCurrentItems() {
  if (state.mode === "place") return getFilteredPlaces();
  if (state.mode === "rail") return sortRailTripsForDisplay(getFilteredRailTrips());
  if (state.mode === "flight") return sortFlightTripsForDisplay(getFilteredFlightTrips());
  return getFilteredHotels();
}

function getPlaceCountryGroup(place) {
  const country = place?.country || "未填写";
  return ["中国", "中国大陆", "中国香港", "中国澳门", "中国台湾"].includes(country) ? "中国" : country;
}

function getChinaProvinceName(place) {
  const country = place?.country || "";
  if (country === "中国澳门") return "澳门";
  if (country === "中国香港") return "香港";
  if (country === "中国台湾") return "台湾";
  if (country === "中国" || country === "中国大陆") return place.province || place.region || "";
  return "";
}

function getChinaProvinceCount(items) {
  return uniqueValues(items, getChinaProvinceName).filter(Boolean).length;
}

function renderStats(items = getCurrentItems()) {
  if (state.mode === "flight") {
    setStatsLabels(["航段数", "承运方", "地点数", "总里程 km", "路线数量"]);
    hotelCount.textContent = items.length;
    cityCount.textContent = uniqueValues(items, (trip) => trip.airline).length;
    brandCount.textContent = getFlightUniqueAirports(items).length;
    document.querySelector("#groupCount").textContent = items.reduce((sum, trip) => sum + (Number(trip.distanceKm) || 0), 0).toFixed(0);
    document.querySelector("#deflaggedCount").textContent = uniqueValues(items, getFlightRouteKey).length;
    return;
  }
  if (state.mode === "rail") {
    setStatsLabels(["铁路出行", "涉及城市", "涉及车站", "路线数量", "总票面金额"]);
    const stationNames = getRailUniqueStations(items);
    const cities = uniqueValues([
      ...stationNames.map(getRailStation).filter(Boolean).map((station) => station.city),
      ...items.flatMap((trip) => [trip.fromCity, trip.toCity])
    ], (city) => city);
    hotelCount.textContent = items.length;
    cityCount.textContent = cities.length;
    brandCount.textContent = stationNames.length;
    document.querySelector("#groupCount").textContent = uniqueValues(items, getRailRouteKey).length;
    document.querySelector("#deflaggedCount").textContent = items.reduce((sum, trip) => sum + (Number.isFinite(trip.priceValue) ? trip.priceValue : 0), 0).toFixed(0);
    return;
  }
  if (state.mode === "place") {
    setStatsLabels(["城市/目的地", "国家/地区", "中国省级", "估算次数", "有酒店记录"]);
    hotelCount.textContent = items.length;
    cityCount.textContent = uniqueValues(items, getPlaceCountryGroup).length;
    brandCount.textContent = getChinaProvinceCount(items);
    document.querySelector("#groupCount").textContent = items.reduce((sum, place) => sum + getVisitCountEstimate(place), 0);
    document.querySelector("#deflaggedCount").textContent = items.filter((place) => place.hotelCount > 0).length;
    return;
  }
  setStatsLabels(["酒店", "城市", "品牌", "集团", "已摘牌"]);
  hotelCount.textContent = items.length;
  cityCount.textContent = uniqueValues(items, (hotel) => hotel.city).length;
  brandCount.textContent = uniqueValues(items, (hotel) => hotel.brand).length;
  document.querySelector("#groupCount").textContent = uniqueValues(items, (hotel) => hotel.group).length;
  document.querySelector("#deflaggedCount").textContent = items.filter((hotel) => hotel.isDeflagged).length;
}

const renderHotelList = renderList;
renderList = function(items) {
  if (state.mode === "flight") {
    renderFlightList(items);
    return;
  }
  if (state.mode === "rail") {
    renderRailList(items);
    return;
  }
  if (state.mode !== "place") {
    renderHotelList(items);
    return;
  }
  hotelList.innerHTML = "";
  const summary = `当前显示 ${items.length} / ${getAllPlaces().length} 个城市/目的地`;
  resultCount.textContent = summary;
  searchResultSummary.textContent = summary;
  if (items.length === 0) {
    hotelList.innerHTML = `<p class="empty-state">${state.searchQuery.trim() ? "没有找到匹配的城市/目的地。" : "暂无符合条件的城市/目的地"}</p>`;
    return;
  }
  if (shouldRenderFlatPlaceList()) {
    renderPlaceCards(items);
    return;
  }
  renderPlaceBrowseList(items);
};

function shouldRenderFlatPlaceList() {
  return Boolean(
    state.searchQuery.trim() ||
    state.city !== "all" ||
    state.tag !== "all" ||
    state.country !== "all" ||
    state.area !== "all"
  );
}

function renderRailList(items) {
  hotelList.innerHTML = "";
  const summary = `当前显示 ${items.length} / ${activeRailTrips.length} 条铁路出行`;
  resultCount.textContent = summary;
  searchResultSummary.textContent = summary;
  if (!items.length) {
    hotelList.innerHTML = `<p class="empty-state">${state.searchQuery.trim() ? "没有找到匹配的铁路出行。" : "暂无铁路出行记录"}</p>`;
    return;
  }
  items.forEach((trip) => {
    const stationInfo = getRailTripStations(trip);
    const card = document.createElement("article");
    card.className = "hotel-card rail-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.dataset.id = trip.id;
    if (trip.id === state.selectedId) card.classList.add("active");
    card.innerHTML = `
      <h2>${trip.trainNo || "车次待补充"}</h2>
      <p>${trip.date || "日期待补充"} · ${trip.trainType || "类型待补充"}</p>
      <p><strong>${trip.fromStation || "未知车站"}</strong> → <strong>${trip.toStation || "未知车站"}</strong></p>
      <p>${trip.seatType || "座席待补充"} · ${formatRailPrice(trip)}</p>
      <p>${stationInfo.hasCoords ? '<span class="source-pill">可绘制线路</span>' : '<span class="map-display-pill">缺少车站坐标</span>'}${getMemorySourceBadge(trip)}</p>
      ${state.manageMode ? `<div class="card-actions">
        <button type="button" data-rail-action="edit">编辑</button>
        <button type="button" class="danger" data-rail-action="delete">删除</button>
      </div>` : ""}
    `;
    card.addEventListener("click", (event) => {
      const action = event.target.closest("[data-rail-action]")?.dataset.railAction;
      if (action === "edit") {
        event.stopPropagation();
        openRailForm(trip);
        return;
      }
      if (action === "delete") {
        event.stopPropagation();
        deleteRailTrip(trip.id);
        return;
      }
      selectRailTrip(trip.id);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectRailTrip(trip.id);
      }
    });
    hotelList.appendChild(card);
  });
}

function renderFlightList(items) {
  hotelList.innerHTML = "";
  const summary = `当前显示 ${items.length} / ${activeFlightTrips.length} 条飞行记录`;
  resultCount.textContent = summary;
  searchResultSummary.textContent = summary;
  if (!items.length) {
    hotelList.innerHTML = `<p class="empty-state">${state.searchQuery.trim() ? "没有找到匹配的飞行记录。" : "暂无飞行记录"}</p>`;
    return;
  }
  items.forEach((trip) => {
    const airportInfo = getFlightTripAirports(trip);
    const card = document.createElement("article");
    card.className = "hotel-card flight-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.dataset.id = trip.id;
    if (trip.id === state.selectedId) card.classList.add("active");
    const airlineCode = getFlightAirlineCode(trip);
    const airlineLabel = [trip.airline || "航司待补充", airlineCode].filter(Boolean).join(" ");
    const modeLabel = getFlightModeLabel(trip);
    card.innerHTML = `
      <h2>${trip.flightNo || "航班号待补充"}</h2>
      <p>${trip.date || "日期待补充"} · ${airlineLabel}</p>
      <p><strong>${trip.fromAirport || "未知机场"}</strong> → <strong>${trip.toAirport || "未知机场"}</strong></p>
      <p>${trip.departTime || "出发时间待补充"} → ${trip.arriveTime || "到达时间待补充"} · ${Number.isFinite(trip.distanceKm) ? `${trip.distanceKm} km` : "里程待补充"}</p>
      <p><span class="source-pill">${modeLabel}</span>${airportInfo.hasCoords ? '<span class="source-pill">可绘制航段</span>' : '<span class="map-display-pill missing-coordinate-pill">缺少机场坐标</span>'}${getMemorySourceBadge(trip)}</p>
    `;
    card.addEventListener("click", () => selectFlightTrip(trip.id));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectFlightTrip(trip.id);
      }
    });
    hotelList.appendChild(card);
  });
}

function resetPlaceBrowse() {
  state.placeBrowse = { level: "country", country: "", province: "" };
}

function getGroupSummary(items = []) {
  return {
    placeCount: items.length,
    hotelCount: items.reduce((sum, place) => sum + (Number(place.hotelCount) || 0), 0),
    hotelCityCount: items.filter((place) => Number(place.hotelCount) > 0).length,
    visitCategory: getHighestVisitCategory(items)
  };
}

function makePlaceGroupCard({ title, subtitle, items, visitCategory, extraPills = [], onClick }) {
  const visitStyle = getAggregatedVisitStyle(visitCategory);
  const card = document.createElement("article");
  card.className = "hotel-card place-card place-group-card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.innerHTML = `
    <h2>${title}</h2>
    ${subtitle ? `<p>${subtitle}</p>` : ""}
    <p>城市/目的地 ${items.length} 个 · 关联酒店 ${items.reduce((sum, place) => sum + (Number(place.hotelCount) || 0), 0)} 家</p>
    <p><span class="visit-tier-pill visit-tier-${visitCategory.replace("+", "plus")}" style="--visit-tier-color:${visitStyle.color};--visit-tier-bg:${visitStyle.fillColor};">${visitStyle.label}</span>${extraPills.map((pill) => `<span class="map-display-pill">${pill}</span>`).join("")}</p>
    <p class="group-enter">进入</p>
  `;
  card.addEventListener("click", onClick);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  });
  return card;
}

function renderPlaceBrowseHeader(parts = []) {
  const header = document.createElement("div");
  header.className = "place-browse-header";
  const crumb = document.createElement("p");
  crumb.className = "place-breadcrumb";
  crumb.textContent = `当前显示：${parts.join(" > ") || "全部国家/地区"}`;
  header.appendChild(crumb);
  const actions = document.createElement("div");
  actions.className = "place-browse-actions";
  if (state.placeBrowse.level === "province" || state.placeBrowse.level === "city-list") {
    const backAll = document.createElement("button");
    backAll.type = "button";
    backAll.textContent = "返回全部国家/地区";
    backAll.addEventListener("click", () => {
      resetPlaceBrowse();
      renderAll();
      map.setView([35.8617, 104.1954], PROVINCE_LAYER_MAX_ZOOM, { animate: false });
    });
    actions.appendChild(backAll);
  }
  if (state.placeBrowse.level === "city-list" && state.placeBrowse.country === "中国") {
    const backProvince = document.createElement("button");
    backProvince.type = "button";
    backProvince.textContent = "返回中国省级列表";
    backProvince.addEventListener("click", () => {
      state.placeBrowse = { level: "province", country: "中国", province: "" };
      renderAll();
      focusCountryOnMap("中国");
    });
    actions.appendChild(backProvince);
  }
  if (actions.children.length) header.appendChild(actions);
  hotelList.appendChild(header);
}

function renderPlaceBrowseList(items) {
  const browse = state.placeBrowse || { level: "country", country: "", province: "" };
  if (browse.level === "province" && browse.country === "中国") {
    renderPlaceBrowseHeader(["中国"]);
    renderChinaProvinceGroups(items);
    return;
  }
  if (browse.level === "city-list") {
    const listItems = getBrowseCityItems(items);
    const crumbs = browse.country === "中国" ? ["中国", browse.province] : [browse.country];
    renderPlaceBrowseHeader(crumbs.filter(Boolean));
    if (!listItems.length) {
      hotelList.insertAdjacentHTML("beforeend", `<p class="empty-state">暂无符合条件的城市/目的地</p>`);
      return;
    }
    renderPlaceCards(listItems);
    return;
  }
  renderPlaceBrowseHeader(["全部国家/地区"]);
  renderCountryGroups(items);
}

function renderCountryGroups(items) {
  const groups = new Map();
  items.forEach((place) => {
    const country = getPlaceCountryGroup(place);
    if (!groups.has(country)) groups.set(country, []);
    groups.get(country).push(place);
  });
  [...groups.entries()].sort(([a], [b]) => a.localeCompare(b, "zh-Hans-CN")).forEach(([country, groupItems]) => {
    const summary = getGroupSummary(groupItems);
    hotelList.appendChild(makePlaceGroupCard({
      title: country,
      subtitle: `有酒店记录城市 ${summary.hotelCityCount} 个`,
      items: groupItems,
      visitCategory: summary.visitCategory,
      onClick: () => {
        if (country === "中国") {
          state.placeBrowse = { level: "province", country: "中国", province: "" };
          renderAll();
          focusCountryOnMap("中国");
        } else {
          state.placeBrowse = { level: "city-list", country, province: "" };
          renderAll();
          focusPlacesOnMap(groupItems);
        }
      }
    }));
  });
}

function renderChinaProvinceGroups(items) {
  const chinaItems = items.filter((place) => getPlaceCountryGroup(place) === "中国");
  const groups = new Map();
  chinaItems.forEach((place) => {
    const province = getChinaProvinceName(place);
    if (!province) return;
    if (!groups.has(province)) groups.set(province, []);
    groups.get(province).push(place);
  });
  [...groups.entries()].sort(([a], [b]) => a.localeCompare(b, "zh-Hans-CN")).forEach(([province, groupItems]) => {
    const summary = getGroupSummary(groupItems);
    const hasProvinceBoundary = Boolean((window.mainlandProvinceBoundaries || {})[`中国|${province}`]);
    hotelList.appendChild(makePlaceGroupCard({
      title: province,
      subtitle: `有酒店记录城市 ${summary.hotelCityCount} 个`,
      items: groupItems,
      visitCategory: summary.visitCategory,
      extraPills: [hasProvinceBoundary ? "行政区高亮" : "圆点显示"],
      onClick: () => {
        state.placeBrowse = { level: "city-list", country: "中国", province };
        renderAll();
        focusProvinceOnMap(province, groupItems);
      }
    }));
  });
}

function getBrowseCityItems(items) {
  const browse = state.placeBrowse || {};
  if (browse.country === "中国") {
    return items.filter((place) => getPlaceCountryGroup(place) === "中国" && getChinaProvinceName(place) === browse.province);
  }
  return items.filter((place) => getPlaceCountryGroup(place) === browse.country);
}

function renderPlaceCards(items) {
  items.forEach((place) => {
    const visitCategory = getPlaceVisitCategory(place);
    const visitStyle = getPlaceVisitStyle(place);
    const card = document.createElement("article");
    card.className = "hotel-card place-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.dataset.id = place.id;
    if (place.id === state.selectedId) card.classList.add("active");
    card.innerHTML = `
      <h2>${place.name}</h2>
      <p>${place.country}${getArea(place) ? ` · ${getArea(place)}` : ""}</p>
      <p>访问情况：<span class="visit-tier-pill visit-tier-${visitCategory.replace("+", "plus")}" style="--visit-tier-color:${visitStyle.color};--visit-tier-bg:${visitStyle.fillColor};">${getVisitCountText(place)}</span> · 关联酒店 ${place.hotelCount || 0} 家</p>
      <p>${getFirstVisitText(place)} - ${getLastVisitText(place)}</p>
      <p><span class="source-pill">${place.sourceLabel || (place.source === "manual" ? "手动记录" : "来自酒店记录")}</span><span class="map-display-pill">${getPlaceMapDisplayLabel(place)}</span></p>
      ${state.manageMode ? `<div class="visit-count-quick-edit" data-place-action="quick-edit">
        <label>访问情况
          <select data-place-visit-category>
            ${getVisitCountOptionsHtml(normalizeVisitCountCategory(place))}
          </select>
        </label>
        <button type="button" class="compact-primary" data-place-action="save-visit-label">保存</button>
      </div>` : ""}
      ${state.manageMode ? `<div class="card-actions">
        <button type="button" data-place-action="edit">${place.hasManual || place.source === "manual" ? "编辑" : "补充信息"}</button>
        ${place.hasManual || place.source === "manual" ? '<button type="button" class="danger" data-place-action="delete">删除手动记录</button>' : ""}
      </div>` : ""}
    `;
    card.addEventListener("click", (event) => {
      const actionTarget = event.target.closest("[data-place-action]");
      const action = actionTarget?.dataset.placeAction;
      if (action === "quick-edit") {
        event.stopPropagation();
        return;
      }
      if (action === "save-visit-label") {
        event.stopPropagation();
        const select = card.querySelector("[data-place-visit-category]");
        savePlaceVisitCountCategory(place, select?.value || "unknown");
        return;
      }
      if (action === "edit") {
        event.stopPropagation();
        openPlaceForm(place);
        return;
      }
      if (action === "delete") {
        event.stopPropagation();
        deletePlaceManual(place);
        return;
      }
      selectPlace(place.id);
    });
    card.addEventListener("keydown", (event) => {
      if (event.target !== card) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectPlace(place.id);
      }
    });
    hotelList.appendChild(card);
  });
}

function fitMapToItems(items, isPlace = false) {
  if (items.length === 0) {
    map.setView([35.8617, 104.1954], 4, { animate: false });
  } else if (items.length === 1) {
    const item = items[0];
    map.setView([isPlace ? item.latitude : item.lat, isPlace ? item.longitude : item.lng], isPlace ? 9 : 13, { animate: false });
  } else {
    const bounds = L.latLngBounds(items.map((item) => isPlace ? [item.latitude, item.longitude] : [item.lat, item.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }
  requestAnimationFrame(() => map.invalidateSize());
  window.setTimeout(() => map.invalidateSize(), 300);
}

function fitMapToPlace(place) {
  const layer = placeMapLayers.get(place.id);
  if (layer && layer._footprintLayerType === "polygon" && typeof layer.getBounds === "function") {
    map.fitBounds(layer.getBounds(), { padding: [40, 40] });
  } else if (getPlaceBoundary(place)) {
    const bounds = L.geoJSON(getPlaceBoundary(place)).getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40] });
      window.setTimeout(() => {
        if (map.getZoom() < CITY_LAYER_MIN_ZOOM) map.setZoom(CITY_LAYER_MIN_ZOOM);
      }, 0);
    }
  } else if (hasValidPlaceCoords(place)) {
    map.setView([place.latitude, place.longitude], 9, { animate: false });
  }
  requestAnimationFrame(() => map.invalidateSize());
  window.setTimeout(() => map.invalidateSize(), 300);
}

function fitMapToPlaceItems(items) {
  const bounds = L.latLngBounds([]);
  let count = 0;
  items.forEach((place) => {
    const layer = placeMapLayers.get(place.id);
    if (layer && layer._footprintLayerType === "polygon" && typeof layer.getBounds === "function") {
      bounds.extend(layer.getBounds());
      count += 1;
    } else if (hasValidPlaceCoords(place)) {
      bounds.extend([place.latitude, place.longitude]);
      count += 1;
    }
  });

  if (count === 0) {
    map.setView([35.8617, 104.1954], 4, { animate: false });
  } else if (count === 1) {
    const first = items.find((place) => {
      const layer = placeMapLayers.get(place.id);
      return (layer && layer._footprintLayerType === "polygon" && typeof layer.getBounds === "function") || hasValidPlaceCoords(place);
    });
    if (first) fitMapToPlace(first);
    return;
  } else {
    map.fitBounds(bounds, { padding: [40, 40] });
  }
  requestAnimationFrame(() => map.invalidateSize());
  window.setTimeout(() => map.invalidateSize(), 300);
}

function focusPlacesOnMap(items = []) {
  if (!Array.isArray(items) || !items.length) return;
  if (map.getZoom() < CITY_LAYER_MIN_ZOOM) map.setZoom(CITY_LAYER_MIN_ZOOM, { animate: false });
  currentPlaceMapLevel = "";
  renderMap(items);
  fitMapToPlaceItems(items);
}

function focusCountryOnMap(country) {
  const items = getFilteredPlaces().filter((place) => getPlaceCountryGroup(place) === country);
  if (!items.length) return;
  if (country === "中国") {
    map.setView([35.8617, 104.1954], PROVINCE_LAYER_MAX_ZOOM, { animate: false });
    currentPlaceMapLevel = "";
    renderMap(getFilteredPlaces());
    return;
  }
  if (map.getZoom() < CITY_LAYER_MIN_ZOOM) map.setZoom(CITY_LAYER_MIN_ZOOM, { animate: false });
  currentPlaceMapLevel = "";
  renderMap(items);
  fitMapToPlaceItems(items);
}

function focusProvinceOnMap(province, items = []) {
  const boundary = (window.mainlandProvinceBoundaries || {})[`中国|${province}`];
  if (boundary) {
    const bounds = L.geoJSON(boundary).getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40] });
      window.setTimeout(() => {
        if (map.getZoom() < CITY_LAYER_MIN_ZOOM) map.setZoom(CITY_LAYER_MIN_ZOOM);
        currentPlaceMapLevel = "";
        renderMap(getFilteredPlaces(), { fit: false });
      }, 0);
      return;
    }
  }
  map.setZoom(Math.max(map.getZoom(), CITY_LAYER_MIN_ZOOM));
  currentPlaceMapLevel = "";
  renderMap(getFilteredPlaces(), { fit: false });
  fitMapToPlaceItems(items);
}

function clearPlaceMapLayers() {
  markers.forEach((marker) => marker.remove());
  markers = [];
  placeMapLayers.clear();
  provinceMapLayers.forEach((layer) => layer.remove());
  provinceMapLayers.clear();
}

function getCurrentPlaceMapLevel() {
  return map.getZoom() <= PROVINCE_LAYER_MAX_ZOOM ? "province" : "city";
}

function getProvinceKeyFromPlace(place) {
  if (!place || !(place.country === "中国" || place.country === "中国大陆")) return "";
  const province = place.province || "";
  if (!province || ["香港", "澳门", "台湾"].includes(province)) return "";
  return `中国|${province}`;
}

function getProvinceNameFromKey(key) {
  return String(key || "").split("|").filter(Boolean).at(-1) || "";
}

function getProvinceAggregates(items = []) {
  const groups = new Map();
  items.forEach((place) => {
    const key = getProvinceKeyFromPlace(place);
    if (!key) return;
    const boundary = (window.mainlandProvinceBoundaries || {})[key];
    if (!boundary) return;
    const current = groups.get(key) || {
      key,
      province: getProvinceNameFromKey(key),
      boundary,
      places: []
    };
    current.places.push(place);
    groups.set(key, current);
  });
  return [...groups.values()].map((group) => ({
    ...group,
    cityCount: new Set(group.places.map((place) => place.name)).size,
    visitCategory: getHighestVisitCategory(group.places)
  }));
}

function getProvincePolygonStyle(province) {
  const visitStyle = getAggregatedVisitStyle(province.visitCategory);
  return {
    color: visitStyle.color,
    weight: 1.5,
    fillColor: visitStyle.fillColor,
    fillOpacity: Math.max(visitStyle.fillOpacity, 0.32)
  };
}

function renderProvinceMap(items, shouldFit = true) {
  clearPlaceMapLayers();
  currentPlaceMapLevel = "province";
  const provinces = getProvinceAggregates(items);
  provinces.forEach((province) => {
    const visitStyle = getAggregatedVisitStyle(province.visitCategory);
    const layer = L.geoJSON(province.boundary, {
      style: () => getProvincePolygonStyle(province),
      onEachFeature: (_feature, polygonLayer) => {
        polygonLayer.on({
          click: () => {
            map.fitBounds(layer.getBounds(), { padding: [36, 36] });
            const targetZoom = Math.max(CITY_LAYER_MIN_ZOOM, map.getZoom());
            window.setTimeout(() => map.setZoom(targetZoom), 0);
          },
          mouseover: () => polygonLayer.setStyle({ fillOpacity: 0.58, weight: 2.5 }),
          mouseout: () => polygonLayer.setStyle(getProvincePolygonStyle(province))
        });
      }
    }).addTo(map);
    layer.bindPopup(`${province.province}<br>已去过城市：${province.cityCount}<br>最高访问强度：${visitStyle.label}`);
    provinceMapLayers.set(province.key, layer);
  });

  mapLegend.innerHTML = getVisitTierLegendHtml("省级聚合");
  const hiddenCount = items.filter((place) => !getProvinceKeyFromPlace(place)).length;
  const noticeParts = ["当前显示：省级足迹。放大地图后显示城市级细节。"];
  if (hiddenCount > 0) noticeParts.push(`港澳、海外或非大陆目的地共 ${hiddenCount} 个，放大后以圆点显示。`);
  coordinateNotice.textContent = noticeParts.join(" ");

  if (!shouldFit) return;
  if (!provinces.length) {
    map.setView([35.8617, 104.1954], 4, { animate: false });
    return;
  }
  const bounds = L.latLngBounds([]);
  provinces.forEach((province) => {
    const layer = provinceMapLayers.get(province.key);
    if (layer && typeof layer.getBounds === "function") bounds.extend(layer.getBounds());
  });
  if (bounds.isValid()) map.fitBounds(bounds, { padding: [40, 40] });
}

function getPlacePolygonStyle(place) {
  const isActive = place.id === state.selectedId;
  const visitStyle = getPlaceVisitStyle(place);
  return {
    color: isActive ? visitStyle.color : visitStyle.color,
    weight: isActive ? 3 : 1,
    fillColor: visitStyle.fillColor,
    fillOpacity: isActive ? Math.min(visitStyle.fillOpacity + 0.12, 0.62) : visitStyle.fillOpacity
  };
}

const renderHotelMap = renderMap;
renderMap = function(items, options = {}) {
  const shouldFit = options.fit !== false;
  if (state.mode === "flight") {
    renderFlightMap(items, shouldFit);
    return;
  }
  if (state.mode === "rail") {
    renderRailMap(items, shouldFit);
    return;
  }
  if (state.mode !== "place") {
    clearPlaceMapLayers();
    currentPlaceMapLevel = "";
    renderHotelMap(items);
    return;
  }
  if (getCurrentPlaceMapLevel() === "province") {
    renderProvinceMap(items, shouldFit);
    return;
  }
  clearPlaceMapLayers();
  currentPlaceMapLevel = "city";
  mapLegend.innerHTML = getVisitTierLegendHtml("城市级");
  let fallbackCount = 0;
  const missingCount = items.filter((place) => !getPlaceBoundary(place) && !hasValidPlaceCoords(place)).length;
  items.forEach((place) => {
    const boundary = getPlaceBoundary(place);
    if (boundary) {
      const layer = L.geoJSON(boundary, {
        style: () => getPlacePolygonStyle(place),
        onEachFeature: (_feature, polygonLayer) => {
          polygonLayer.on({
            click: () => selectPlace(place.id),
            mouseover: () => polygonLayer.setStyle({ fillOpacity: 0.52, weight: 2 }),
            mouseout: () => polygonLayer.setStyle(getPlacePolygonStyle(place))
          });
        }
      }).addTo(map);
      layer._footprintLayerType = "polygon";
      layer.bindPopup(place.name);
      markers.push(layer);
      placeMapLayers.set(place.id, layer);
      return;
    }

    if (!hasValidPlaceCoords(place)) return;
    fallbackCount += 1;
    const visitStyle = getPlaceVisitStyle(place);
    const marker = L.circleMarker([place.latitude, place.longitude], {
      radius: getPlaceVisitCategory(place) === "long-term" || getPlaceVisitCategory(place) === "10+" ? 9 : 8,
      color: visitStyle.color,
      weight: 2,
      fillColor: visitStyle.fillColor,
      fillOpacity: visitStyle.markerOpacity
    }).addTo(map);
    marker._footprintLayerType = "marker";
    marker.bindPopup(place.name);
    marker.on("click", () => selectPlace(place.id));
    markers.push(marker);
    placeMapLayers.set(place.id, marker);
  });
  const noticeParts = ["当前显示：城市级足迹。缩小地图后显示省级聚合。"];
  if (fallbackCount > 0) noticeParts.push(`当前有 ${fallbackCount} 个城市/目的地使用圆点显示。`);
  if (missingCount > 0) noticeParts.push(`有 ${missingCount} 个城市/目的地缺少坐标，暂未显示在地图上。`);
  coordinateNotice.textContent = noticeParts.join(" ");
  if (shouldFit) fitMapToPlaceItems(items);
};

function renderRailMap(items, shouldFit = true) {
  clearPlaceMapLayers();
  const stationUsage = getRailStationUsage(items);
  const stationMarkers = new Map();
  const bounds = L.latLngBounds([]);
  let drawableTripCount = 0;
  const selectedTripId = state.selectedId;

  getRailUniqueStations(items).forEach((stationName) => {
    const station = getRailStation(stationName);
    if (!hasValidStationCoords(station)) return;
    const usage = stationUsage.get(stationName) || { departures: 0, arrivals: 0, total: 0 };
    const marker = L.circleMarker([station.latitude, station.longitude], {
      radius: 7,
      color: "#1d4ed8",
      weight: 2,
      fillColor: "#60a5fa",
      fillOpacity: 0.9
    }).addTo(map);
    marker.bindPopup(`${stationName}<br>${station.city || ""}${station.province ? ` · ${station.province}` : ""}<br>相关次数：${usage.total}（出发 ${usage.departures} / 到达 ${usage.arrivals}）`);
    marker.on("click", () => marker.openPopup());
    markers.push(marker);
    stationMarkers.set(stationName, marker);
    bounds.extend([station.latitude, station.longitude]);
  });

  items.forEach((trip) => {
    const { from, to, hasCoords } = getRailTripStations(trip);
    if (!hasCoords) return;
    drawableTripCount += 1;
    const isSelected = String(trip.id) === String(selectedTripId);
    const line = L.polyline(
      [[from.latitude, from.longitude], [to.latitude, to.longitude]],
      {
        color: isSelected ? "#dc2626" : "#2563eb",
        weight: isSelected ? 5 : 2,
        opacity: isSelected ? 0.95 : 0.38
      }
    ).addTo(map);
    line.bindPopup(`${trip.trainNo || "车次"}：${trip.fromStation} → ${trip.toStation}`);
    line.on("click", () => selectRailTrip(trip.id));
    markers.push(line);
    bounds.extend([from.latitude, from.longitude]);
    bounds.extend([to.latitude, to.longitude]);
  });

  const missingStations = getRailMissingStations(items);
  coordinateNotice.textContent = [
    `当前显示铁路车站点和行程直线。可绘制 ${drawableTripCount} / ${items.length} 条行程。`,
    missingStations.length ? `缺少坐标车站：${missingStations.join("、")}` : ""
  ].filter(Boolean).join(" ");
  mapLegend.innerHTML = '<span><i class="legend-pin rail-station-dot"></i>铁路车站</span><span><i class="legend-line rail-line-sample"></i>铁路行程</span>';
  if (shouldFit) {
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [40, 40] });
    else map.setView([35.8617, 104.1954], 4, { animate: false });
  }
  requestAnimationFrame(() => map.invalidateSize());
  window.setTimeout(() => map.invalidateSize(), 300);
}

function getRailMissingStations(items = activeRailTrips) {
  return getRailUniqueStations(items).filter((stationName) => !hasValidStationCoords(getRailStation(stationName)));
}

function renderFlightMap(items, shouldFit = true) {
  clearPlaceMapLayers();
  const airportUsage = getFlightAirportUsage(items);
  const bounds = L.latLngBounds([]);
  let drawableTripCount = 0;
  const selectedTripId = state.selectedId;

  getFlightUniqueAirports(items).forEach((airportName) => {
    const airport = getFlightAirport(airportName);
    if (!hasValidAirportCoords(airport)) return;
    const usage = airportUsage.get(airportName) || { departures: 0, arrivals: 0, total: 0 };
    const marker = L.circleMarker([airport.lat, airport.lng], {
      radius: 7,
      color: "#0369a1",
      weight: 2,
      fillColor: "#38bdf8",
      fillOpacity: 0.88
    }).addTo(map);
    marker.bindPopup(`${airportName}<br>${airport.city || ""}${airport.province ? ` · ${airport.province}` : ""}<br>相关次数：${usage.total}（出发 ${usage.departures} / 到达 ${usage.arrivals}）`);
    marker.on("click", () => marker.openPopup());
    markers.push(marker);
    bounds.extend([airport.lat, airport.lng]);
  });

  items.forEach((trip) => {
    const { from, to, hasCoords } = getFlightTripAirports(trip);
    if (!hasCoords) return;
    drawableTripCount += 1;
    const isSelected = String(trip.id) === String(selectedTripId);
    const line = L.polyline(
      [[from.lat, from.lng], [to.lat, to.lng]],
      {
        color: isSelected ? "#dc2626" : "#0284c7",
        weight: isSelected ? 5 : 2,
        opacity: isSelected ? 0.95 : 0.34
      }
    ).addTo(map);
    line.bindPopup(`${trip.flightNo || "航班"}：${trip.fromAirport} → ${trip.toAirport}`);
    line.on("click", () => selectFlightTrip(trip.id));
    markers.push(line);
    bounds.extend([from.lat, from.lng]);
    bounds.extend([to.lat, to.lng]);
  });

  const missingAirports = getFlightMissingAirports(items);
  coordinateNotice.textContent = [
    `当前显示机场点和飞行直线。可绘制 ${drawableTripCount} / ${items.length} 条航段。`,
    missingAirports.length ? `缺少坐标机场：${missingAirports.join("、")}` : ""
  ].filter(Boolean).join(" ");
  mapLegend.innerHTML = '<span><i class="legend-pin flight-airport-dot"></i>机场</span><span><i class="legend-line flight-line-sample"></i>飞行航段</span>';
  if (shouldFit) {
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [40, 40] });
    else map.setView([35.8617, 104.1954], 4, { animate: false });
  }
  requestAnimationFrame(() => map.invalidateSize());
  window.setTimeout(() => map.invalidateSize(), 300);
}

map.on("zoomend", () => {
  if (state.mode !== "place") return;
  const nextLevel = getCurrentPlaceMapLevel();
  if (nextLevel === currentPlaceMapLevel) return;
  renderMap(getFilteredPlaces(), { fit: false });
});

const renderHotelDetail = renderDetail;
renderDetail = function(item) {
  if (state.mode === "flight") {
    renderFlightDetail(item);
    return;
  }
  if (state.mode === "rail") {
    renderRailDetail(item);
    return;
  }
  if (state.mode !== "place") {
    renderHotelDetail(item);
    return;
  }
  if (!item) {
    hotelDetail.innerHTML = "<p>选择城市/目的地查看详情</p>";
    return;
  }
  const visitRecords = Array.isArray(item.visitRecords) && item.visitRecords.length ? item.visitRecords : [];
  const years = item.visitYears && item.visitYears.length ? item.visitYears.join(", ") : "待补充";
  const visitRecordList = visitRecords.length
    ? `<ul class="visit-record-list">${visitRecords.map((record) => `<li>${record}</li>`).join("")}</ul>`
    : "<p>待补充</p>";
  const groups = item.groupsInCity && item.groupsInCity.length ? item.groupsInCity.join("、") : "暂无";
  const brands = item.brandsInCity && item.brandsInCity.length ? item.brandsInCity.join("、") : "暂无";
  const tags = item.tags && item.tags.length ? item.tags.join("、") : "暂无";
  const boundaryAliasLine = (usesBoundaryAlias(item) || usesDirectAdminBoundary(item))
    ? `<p><strong>高亮边界：</strong>${getBoundaryNameFromKey(getBoundaryKey(item))}</p>`
    : "";
  const relatedHotels = (item.hotelsInCity || []).map((hotel) => `
    <li>
      <button type="button" class="related-hotel-card related-hotel-button" data-hotel-id="${hotel.id}">
      <strong>${getHotelName(hotel)}</strong>
      ${hotel.isDeflagged ? '<span class="status-tag">已摘牌</span>' : ""}
      <span>${hotel.group || "Unknown"} · ${hotel.brand}</span>
      </button>
    </li>
  `).join("") || '<li class="related-hotel-empty">暂无关联酒店记录</li>';
  hotelDetail.innerHTML = `
    <h2>${item.name}</h2>
    <div class="place-detail-grid">
      <p><strong>国家/地区</strong><span>${item.country || "待补充"}</span></p>
      <p><strong>省份/地区</strong><span>${getArea(item) || "待补充"}</span></p>
      <p><strong>访问情况</strong><span>${getVisitCountText(item)}</span></p>
      <p><strong>访问强度</strong><span>${getPlaceVisitStyle(item).label}</span></p>
      <p><strong>首次访问</strong><span>${getFirstVisitText(item)}</span></p>
      <p><strong>最近访问</strong><span>${getLastVisitText(item)}</span></p>
      <p><strong>关联酒店</strong><span>${item.hotelCount || 0} 家</span></p>
      <p><strong>地图显示</strong><span>${getPlaceMapDisplayText(item)}</span></p>
    </div>
    <button type="button" class="detail-link visit-record-edit" id="editVisitRecords">编辑访问情况与记录</button>
    <section class="visit-record-section">
      <h3>访问记录</h3>
      ${visitRecordList}
    </section>
    <p><strong>访问年份：</strong>${years}</p>
    <p><strong>住过集团：</strong>${groups}</p>
    <p><strong>住过品牌：</strong>${brands}</p>
    <p><strong>标签：</strong>${tags}</p>
    <p><strong>来源：</strong>${item.sourceLabel || (item.source === "manual" ? "手动记录" : "来自酒店记录")}</p>
    <p><strong>坐标状态：</strong>${getCoordinateStatusText(item.coordinateStatus)}</p>
    ${boundaryAliasLine}
    <section class="related-hotels-section">
      <h3>关联酒店</h3>
      <ul class="related-hotels">${relatedHotels}</ul>
    </section>
    <p><strong>备注：</strong>${item.note || "暂无"}</p>
  `;
  hotelDetail.querySelectorAll("[data-hotel-id]").forEach((button) => {
    button.addEventListener("click", () => jumpToHotel(button.dataset.hotelId));
  });
  hotelDetail.querySelector("#editVisitRecords")?.addEventListener("click", () => openVisitRecordForm(item));
};

function renderRailDetail(trip) {
  if (!trip) {
    hotelDetail.innerHTML = "<p>选择铁路行程查看详情</p>";
    return;
  }
  const { from, to, hasCoords } = getRailTripStations(trip);
  const fromCity = from?.city || trip.fromCity || "";
  const toCity = to?.city || trip.toCity || "";
  const fromArea = [fromCity, from?.province].filter(Boolean).join(" · ");
  const toArea = [toCity, to?.province].filter(Boolean).join(" · ");
  const isMemoryRecord = trip.source === "memory-reconstruction" || trip.status === "reconstructed";
  const memoryRows = isMemoryRecord
    ? `
      <p><strong>记录性质</strong><span>待核实记录</span></p>
      <p><strong>可信度</strong><span>${trip.confidence || "待补充"}</span></p>
      <p><strong>日期精度</strong><span>${trip.datePrecision || "待补充"}</span></p>
      <p><strong>原始约略日期</strong><span>${trip.originalApproxDate || "待补充"}</span></p>
      <p><strong>车次/车型线索</strong><span>${trip.equipment || "待补充"}</span></p>
    `
    : "";
  hotelDetail.innerHTML = `
    <h2>${trip.trainNo || "车次待补充"}</h2>
    <div class="place-detail-grid">
      <p><strong>日期</strong><span>${trip.date || "待补充"}</span></p>
      <p><strong>出发时间</strong><span>${trip.departureTime || "待补充"}</span></p>
      <p><strong>车次类型</strong><span>${trip.trainType || "待补充"}</span></p>
      <p><strong>出发站</strong><span>${trip.fromStation || "待补充"}${fromArea ? `（${fromArea}）` : ""}</span></p>
      <p><strong>到达站</strong><span>${trip.toStation || "待补充"}${toArea ? `（${toArea}）` : ""}</span></p>
      <p><strong>座席类型</strong><span>${trip.seatType || "待补充"}</span></p>
      <p><strong>票价</strong><span>${formatRailPrice(trip)}</span></p>
      <p><strong>数据来源</strong><span>${trip.sourceLabel || "铁路数据"}</span></p>
      <p><strong>坐标状态</strong><span>${hasCoords ? "两端车站坐标完整，可绘制行程线" : "缺少车站坐标，暂不绘制行程线"}</span></p>
      ${memoryRows}
    </div>
    ${trip.note ? `<p>${trip.note}</p>` : ""}
    ${isMemoryRecord && trip.notes && trip.notes !== trip.note ? `<p><strong>备注：</strong>${trip.notes}</p>` : ""}
    ${isMemoryRecord && trip.sources ? `<p><strong>线索来源：</strong>${trip.sources}</p>` : ""}
  `;
}

function selectRailTrip(id) {
  state.selectedId = id;
  const trip = activeRailTrips.find((item) => String(item.id) === String(id));
  const currentItems = getCurrentItems();
  renderDetail(trip);
  renderList(currentItems);
  renderMap(currentItems, { fit: false });
  if (!trip) return;
  const { from, to, hasCoords } = getRailTripStations(trip);
  if (hasCoords) {
    map.fitBounds(L.latLngBounds([[from.latitude, from.longitude], [to.latitude, to.longitude]]), { padding: [60, 60] });
  }
}

function getRailStationCity(stationName, fallback = "") {
  return getRailStation(stationName)?.city || fallback || "";
}

function openRailForm(trip = null) {
  state.railEditingId = trip ? trip.id : null;
  if (!railManagerPanel || !railForm) return;
  railManagerPanel.hidden = false;
  if (railFormTitle) railFormTitle.textContent = trip ? "编辑铁路记录" : "新增铁路记录";
  if (saveRailTripButton) saveRailTripButton.textContent = trip ? "保存修改" : "新增保存";
  railForm.reset();
  setField("#railOriginalId", trip?.id || "");
  setField("#railDate", trip?.date || "");
  setField("#railDepartureTime", trip?.departureTime || "");
  setField("#railTrainNo", trip?.trainNo || "");
  setField("#railTrainType", trip?.trainType || "");
  setField("#railFromStation", trip?.fromStation || "");
  setField("#railToStation", trip?.toStation || "");
  setField("#railFromCity", trip?.fromCity || getRailStationCity(trip?.fromStation));
  setField("#railToCity", trip?.toCity || getRailStationCity(trip?.toStation));
  setField("#railSeatType", trip?.seatType || "");
  setField("#railPrice", trip?.priceValue ?? "");
  setField("#railNote", trip?.note || trip?.notes || "");
}

function closeRailForm() {
  state.railEditingId = null;
  if (railManagerPanel) railManagerPanel.hidden = true;
  if (railForm) railForm.reset();
}

function readRailForm() {
  const original = activeRailTrips.find((trip) => String(trip.id) === String(state.railEditingId)) || {};
  const date = document.querySelector("#railDate").value.trim();
  const trainNo = document.querySelector("#railTrainNo").value.trim().toUpperCase();
  const fromStation = document.querySelector("#railFromStation").value.trim();
  const toStation = document.querySelector("#railToStation").value.trim();
  const priceRaw = document.querySelector("#railPrice").value.trim();
  if (!date) throw new Error("date 必填");
  if (!trainNo) throw new Error("trainNo 必填");
  if (!fromStation) throw new Error("fromStation 必填");
  if (!toStation) throw new Error("toStation 必填");
  const priceValue = priceRaw ? Number(priceRaw) : null;
  if (priceRaw && !Number.isFinite(priceValue)) throw new Error("price 需要填写有效数字，或留空");
  const trip = normalizeRailTripForStorage({
    ...original,
    date,
    departureTime: document.querySelector("#railDepartureTime").value.trim(),
    trainNo,
    trainType: document.querySelector("#railTrainType").value.trim() || getRailTrainTypeLabel(trainNo),
    fromStation,
    toStation,
    fromCity: document.querySelector("#railFromCity").value.trim(),
    toCity: document.querySelector("#railToCity").value.trim(),
    seatType: document.querySelector("#railSeatType").value.trim(),
    priceValue,
    note: document.querySelector("#railNote").value.trim(),
    source: original.source || "manual-rail-edit"
  });
  if (!trip.id) trip.id = createRailTripId(trip);
  return trip;
}

function saveRailTripFromForm(event) {
  event.preventDefault();
  try {
    const trip = readRailForm();
    const nextTrips = activeRailTrips.filter((item) => String(item.id) !== String(state.railEditingId));
    const idExists = nextTrips.some((item) => String(item.id) === String(trip.id));
    if (idExists) trip.id = `${trip.id}-${Date.now().toString(36)}`;
    nextTrips.push(trip);
    activeRailTrips = sortRailTrips(nextTrips);
    if (!saveRailTripsOverride()) return;
    state.selectedId = trip.id;
    closeRailForm();
    renderAll();
  } catch (error) {
    alert(error.message || "铁路记录保存失败。");
  }
}

function deleteRailTrip(id) {
  const trip = activeRailTrips.find((item) => String(item.id) === String(id));
  if (!trip) return;
  const label = `${trip.date || "日期待补充"} ${trip.trainNo || "车次待补充"} ${trip.fromStation || "未知车站"} → ${trip.toStation || "未知车站"}`;
  if (!confirm(`确定删除 ${label} 吗？`)) return;
  activeRailTrips = activeRailTrips.filter((item) => String(item.id) !== String(id));
  if (!saveRailTripsOverride()) return;
  if (String(state.selectedId) === String(id)) {
    state.selectedId = null;
    renderDetail(null);
  }
  closeRailForm();
  renderAll();
}

const railExportFieldOrder = [
  "id",
  "date",
  "departureTime",
  "departureTimeZone",
  "trainNo",
  "trainType",
  "fromStation",
  "toStation",
  "fromCity",
  "toCity",
  "fromRegionCode",
  "toRegionCode",
  "seatType",
  "priceCurrency",
  "priceValue",
  "distanceKm",
  "changeFlag",
  "status",
  "source",
  "sourceOrderHash",
  "orderHash",
  "note"
];
const railSensitiveExportFields = new Set([
  "passengerName",
  "passenger",
  "idCard",
  "documentNo",
  "orderNo",
  "eTicketNo",
  "ticketNo",
  "seatNo",
  "qrCode",
  "notificationId",
  "notificationIds"
]);

function orderRailTripForExport(trip) {
  const normalized = normalizeRailTripForStorage(trip);
  const ordered = {};
  railExportFieldOrder.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(normalized, key) && !railSensitiveExportFields.has(key)) {
      ordered[key] = normalized[key];
    }
  });
  Object.keys(normalized).sort().forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(ordered, key) && !railSensitiveExportFields.has(key)) {
      ordered[key] = normalized[key];
    }
  });
  return ordered;
}

function exportRailTripsJs() {
  const trips = sortRailTrips(activeRailTrips).map(orderRailTripForExport);
  const content = `// Exported from Footprint rail management. Public-safe rail footprint data.\nwindow.railTrips = ${JSON.stringify(trips, null, 2)};\n`;
  const blob = new Blob([content], { type: "application/javascript" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "rail-trips-edited.js";
  link.click();
  URL.revokeObjectURL(url);
}

function clearRailOverride() {
  if (!confirm("清除本地铁路修改后，将恢复 rail-trips.js 原始 204 条数据。是否继续？")) return;
  try {
    localStorage.removeItem(railTripsOverrideStorageKey);
    activeRailTrips = cloneData(defaultRailTrips);
    state.selectedId = null;
    closeRailForm();
    renderDetail(null);
    renderAll();
  } catch (error) {
    alert("清除失败：浏览器本地存储不可用。");
  }
}

function renderFlightDetail(trip) {
  if (!trip) {
    hotelDetail.innerHTML = "<p>选择航班/航段记录查看详情</p>";
    return;
  }
  const { from, to, hasCoords } = getFlightTripAirports(trip);
  const memoryRows = trip.source === "memory-reconstruction" || trip.status === "reconstructed"
    ? `
      <p><strong>记录性质</strong><span>待核实记录</span></p>
      <p><strong>可信度</strong><span>${trip.confidence || "待补充"}</span></p>
      <p><strong>日期精度</strong><span>${trip.datePrecision || "待补充"}</span></p>
      <p><strong>原始约略日期</strong><span>${trip.originalApproxDate || "待补充"}</span></p>
      <p><strong>机型/船型线索</strong><span>${trip.equipment || "待补充"}</span></p>
    `
    : "";
  hotelDetail.innerHTML = `
    <h2>${trip.flightNo || "航班号待补充"}</h2>
    <div class="place-detail-grid">
      <p><strong>日期</strong><span>${trip.date || "待补充"}</span></p>
      <p><strong>类型</strong><span>${getFlightModeLabel(trip)}</span></p>
      <p><strong>承运/运营</strong><span>${[trip.airline || "待补充", getFlightAirlineCode(trip)].filter(Boolean).join(" ")}</span></p>
      <p><strong>出发地</strong><span>${trip.fromAirport || "待补充"}${from ? `（${from.city} · ${from.province}）` : ""}</span></p>
      <p><strong>到达地</strong><span>${trip.toAirport || "待补充"}${to ? `（${to.city} · ${to.province}）` : ""}</span></p>
      <p><strong>出发时间</strong><span>${trip.departTime || "待补充"}</span></p>
      <p><strong>到达时间</strong><span>${trip.arriveTime || "待补充"}</span></p>
      <p><strong>里程</strong><span>${Number.isFinite(trip.distanceKm) ? `${trip.distanceKm} km` : "待补充"}</span></p>
      <p><strong>数据来源</strong><span>${trip.sourceLabel || "航班数据"}</span></p>
      <p><strong>坐标状态</strong><span>${hasCoords ? "两端机场坐标完整，可绘制航段线" : "缺少机场坐标，暂不绘制航段线"}</span></p>
      ${memoryRows}
    </div>
    ${trip.notes ? `<p><strong>备注：</strong>${trip.notes}</p>` : ""}
    ${trip.sources ? `<p><strong>线索来源：</strong>${trip.sources}</p>` : ""}
  `;
}

function selectFlightTrip(id) {
  state.selectedId = id;
  const trip = activeFlightTrips.find((item) => String(item.id) === String(id));
  const currentItems = getCurrentItems();
  renderDetail(trip);
  renderList(currentItems);
  renderMap(currentItems, { fit: false });
  if (!trip) return;
  const { from, to, hasCoords } = getFlightTripAirports(trip);
  if (hasCoords) {
    map.fitBounds(L.latLngBounds([[from.lat, from.lng], [to.lat, to.lng]]), { padding: [60, 60] });
  }
}

function clearFiltersForJump() {
  resetFilterState();
  state.selectedId = null;
  renderDetail(null);
}

function jumpToHotel(hotelId) {
  const hotel = activeHotels.find((item) => String(item.id) === String(hotelId));
  if (!hotel) {
    alert("没有找到这家酒店。");
    return;
  }
  state.mode = "hotel";
  clearFiltersForJump();
  renderAll();
  selectHotel(hotel.id);
  if (hasValidCoords(hotel)) {
    map.setView([hotel.lat, hotel.lng], 14, { animate: false });
    requestAnimationFrame(() => map.invalidateSize());
    window.setTimeout(() => map.invalidateSize(), 300);
  }
}

function jumpToPlace(placeKey) {
  state.mode = "place";
  clearFiltersForJump();
  renderAll();
  const place = getAllPlaces().find((item) => getPlaceKey({ ...item, city: item.name }) === placeKey);
  if (!place) {
    alert("没有找到这个城市/目的地。");
    return;
  }
  selectPlace(place.id);
  fitMapToPlace(place);
}

function createPlaceId(place) {
  return `place-${slugify([place.country, place.province || place.region, place.name].filter(Boolean).join("-"))}-${Date.now().toString(36)}`;
}

function scrollPanelIntoView(panel) {
  if (!panel) return;
  window.requestAnimationFrame(() => {
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function openPlaceForm(place = null) {
  const manualId = place?.manualId || (place?.source === "manual" ? place.id : "");
  const manualPlace = manualId ? activeManualPlaces.find((item) => item.id === manualId) : null;
  const source = manualPlace || place || {};
  state.placeEditingId = manualPlace ? manualPlace.id : null;
  if (placeManagerPanel) placeManagerPanel.hidden = false;
  if (placeFormTitle) placeFormTitle.textContent = manualPlace ? "编辑城市/目的地" : "新增城市/目的地";
  placeForm?.reset();
  setField("#placeOriginalId", manualPlace?.id || "");
  setField("#placeName", source.name || "");
  setField("#placeType", source.type || "city");
  setField("#placeCountry", source.country || "");
  setField("#placeProvince", source.province || "");
  setField("#placeRegion", source.region || "");
  setField("#placeLatitude", source.latitude ?? "");
  setField("#placeLongitude", source.longitude ?? "");
  setField("#placeCoordinateStatus", source.coordinateStatus === "missing" ? "missing" : "city-center");
  setField("#placeVisitCount", source.visitCount ?? "");
  setField("#placeFirstVisitYear", source.firstVisitYear ?? "");
  setField("#placeLastVisitYear", source.lastVisitYear ?? "");
  setField("#placeVisitYears", Array.isArray(source.visitYears) ? source.visitYears.join(", ") : "");
  setField("#placeTags", Array.isArray(source.tags) ? source.tags.join(", ") : "");
  setField("#placeNote", source.note || "");
  closeVisitRecordForm();
  scrollPanelIntoView(placeManagerPanel);
}

function closePlaceForm() {
  state.placeEditingId = null;
  if (placeManagerPanel) placeManagerPanel.hidden = true;
  placeForm?.reset();
}

function getPlaceManualKey(place) {
  return getPlaceKey({ ...place, city: place.name });
}

function getManualPlaceByKey(placeKey) {
  return activeManualPlaces.find((place) => getPlaceManualKey(normalizePlace(place)) === placeKey);
}

function createManualPlaceBase(currentPlace, source = "manual-edit") {
  return {
    id: createPlaceId(currentPlace),
    type: currentPlace.type || "city",
    name: currentPlace.name,
    country: currentPlace.country,
    province: currentPlace.province || "",
    region: currentPlace.region || "",
    latitude: Number.isFinite(currentPlace.latitude) ? currentPlace.latitude : null,
    longitude: Number.isFinite(currentPlace.longitude) ? currentPlace.longitude : null,
    coordinateStatus: currentPlace.coordinateStatus || "missing",
    visitRecords: Array.isArray(currentPlace.visitRecords) ? currentPlace.visitRecords : [],
    visitCountCategory: normalizeVisitCountCategory(currentPlace),
    visitCountLabel: currentPlace.visitCountLabel || "",
    visitCount: Number.isFinite(currentPlace.visitCount) ? currentPlace.visitCount : null,
    firstVisit: currentPlace.firstVisit || "",
    lastVisit: currentPlace.lastVisit || "",
    firstVisitYear: Number.isFinite(currentPlace.firstVisitYear) ? currentPlace.firstVisitYear : null,
    lastVisitYear: Number.isFinite(currentPlace.lastVisitYear) ? currentPlace.lastVisitYear : null,
    visitYears: Array.isArray(currentPlace.visitYears) ? currentPlace.visitYears : [],
    tags: Array.isArray(currentPlace.tags) ? currentPlace.tags : [],
    note: currentPlace.note || "",
    source
  };
}

function upsertManualPlaceByKey(placeKey, updatedPlace) {
  const manualPlace = getManualPlaceByKey(placeKey);
  activeManualPlaces = manualPlace
    ? activeManualPlaces.map((place) => place.id === manualPlace.id ? updatedPlace : place)
    : [...activeManualPlaces, updatedPlace];
  savePlacesToLocal();
}

function savePlaceVisitCountCategory(place, category) {
  const placeKey = getPlaceManualKey(place);
  const currentPlace = getAllPlaces().find((item) => getPlaceManualKey(item) === placeKey) || place;
  const manualPlace = getManualPlaceByKey(placeKey);
  const categoryInfo = normalizeVisitCountSelection(category);
  if (!manualPlace && categoryInfo.category === "unknown") return;
  createAutoSnapshot("before-save-visit-category");
  const base = manualPlace || createManualPlaceBase(currentPlace, "manual-edit");
  const updated = normalizePlace({
    ...base,
    visitCountCategory: categoryInfo.category,
    visitCountLabel: categoryInfo.label,
    visitCount: categoryInfo.numeric ?? null,
    source: manualPlace?.source || "manual-edit"
  });
  upsertManualPlaceByKey(placeKey, updated);
  markDataChanged("save-visit-category");
  renderAll();
  const merged = getAllPlaces().find((item) => getPlaceManualKey(item) === placeKey);
  if (merged && state.selectedId === place.id) {
    state.selectedId = merged.id;
    renderDetail(merged);
  }
}

function updateVisitRecordPreview() {
  if (!visitRecordPreview || !visitRecordsInput) return;
  try {
    const info = parseVisitRecords(visitRecordsInput.value);
    const categoryInfo = normalizeVisitCountSelection(visitCountCategoryInput?.value || "unknown");
    const displayText = categoryInfo.category !== "unknown" ? categoryInfo.label : info.visitCount ? `${info.visitCount} 次` : "待补充";
    visitRecordPreview.innerHTML = `
      <p><strong>访问情况：</strong><span>${displayText}</span></p>
      <p><strong>首次访问：</strong><span>${info.firstVisit || "待补充"}</span></p>
      <p><strong>最近访问：</strong><span>${info.lastVisit || "待补充"}</span></p>
    `;
  } catch (error) {
    visitRecordPreview.innerHTML = `<p class="form-error">${error.message}</p>`;
  }
}

function openVisitRecordForm(place) {
  if (!visitRecordPanel || !place) return;
  const placeKey = getPlaceManualKey(place);
  const manualPlace = getManualPlaceByKey(placeKey);
  const source = manualPlace ? normalizePlace(manualPlace) : place;
  state.visitEditingPlaceKey = placeKey;
  state.visitEditingPlaceSnapshot = { ...place };
  visitRecordPanel.hidden = false;
  setField("#visitRecordPlaceKey", placeKey);
  setField("#visitRecordPlaceName", place.name || "");
  setField("#visitCountCategoryInput", normalizeVisitCountCategory(source));
  setField("#visitRecordsInput", Array.isArray(source.visitRecords) ? source.visitRecords.join("\n") : "");
  setField("#visitRecordTags", Array.isArray(source.tags) ? source.tags.join(", ") : "");
  setField("#visitRecordNote", source.note || "");
  updateVisitRecordPreview();
  closeHotelForm();
  closePlaceForm();
  closeBulkCityPanel();
  scrollPanelIntoView(visitRecordPanel);
}

function closeVisitRecordForm() {
  state.visitEditingPlaceKey = "";
  state.visitEditingPlaceSnapshot = null;
  if (visitRecordPanel) visitRecordPanel.hidden = true;
  visitRecordForm?.reset();
}

function saveVisitRecordForm() {
  const placeKey = document.querySelector("#visitRecordPlaceKey")?.value || state.visitEditingPlaceKey;
  const currentPlace = getAllPlaces().find((place) => getPlaceManualKey(place) === placeKey) || state.visitEditingPlaceSnapshot;
  if (!currentPlace) throw new Error("没有找到这个城市/目的地。");
  const manualPlace = getManualPlaceByKey(placeKey);
  const visitInfo = parseVisitRecords(visitRecordsInput?.value || "");
  const categoryInfo = normalizeVisitCountSelection(visitCountCategoryInput?.value || "unknown");
  const tags = document.querySelector("#visitRecordTags").value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const note = document.querySelector("#visitRecordNote").value.trim();
  const base = manualPlace || createManualPlaceBase(currentPlace, "manual-edit");
  const updated = normalizePlace({
    ...base,
    visitRecords: visitInfo.visitRecords,
    visitCountCategory: categoryInfo.category,
    visitCountLabel: categoryInfo.label,
    visitCount: categoryInfo.numeric ?? visitInfo.visitCount,
    firstVisit: visitInfo.firstVisit,
    lastVisit: visitInfo.lastVisit,
    firstVisitYear: visitInfo.visitYears[0] || null,
    lastVisitYear: visitInfo.visitYears[visitInfo.visitYears.length - 1] || null,
    visitYears: visitInfo.visitYears,
    tags,
    note,
    source: manualPlace?.source || "manual-edit"
  });
  createAutoSnapshot("before-save-visit-records");
  activeManualPlaces = manualPlace
    ? activeManualPlaces.map((place) => place.id === manualPlace.id ? updated : place)
    : [...activeManualPlaces, updated];
  savePlacesToLocal();
  markDataChanged("save-visit-records");
  closeVisitRecordForm();
  renderAll();
  const merged = getAllPlaces().find((place) => getPlaceManualKey(place) === placeKey);
  if (merged) selectPlace(merged.id);
}

function parseListNumbers(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map(Number)
    .filter(Number.isFinite);
}

function readPlaceForm() {
  const name = document.querySelector("#placeName").value.trim();
  const country = document.querySelector("#placeCountry").value.trim();
  const latitude = parseNumber(document.querySelector("#placeLatitude").value);
  const longitude = parseNumber(document.querySelector("#placeLongitude").value);
  if (!name) throw new Error("name 必填");
  if (!country) throw new Error("country 必填");
  const latEmpty = String(document.querySelector("#placeLatitude").value).trim() === "";
  const lngEmpty = String(document.querySelector("#placeLongitude").value).trim() === "";
  if ((!latEmpty && !Number.isFinite(latitude)) || (!lngEmpty && !Number.isFinite(longitude))) {
    throw new Error("latitude / longitude 必须是有效数字或留空");
  }
  if (latEmpty !== lngEmpty) throw new Error("latitude 和 longitude 需要同时填写或同时留空");
  const existing = activeManualPlaces.find((place) => place.id === state.placeEditingId) || {};
  const place = {
    ...existing,
    id: existing.id || createPlaceId({ name, country, province: document.querySelector("#placeProvince").value.trim(), region: document.querySelector("#placeRegion").value.trim() }),
    type: document.querySelector("#placeType").value,
    name,
    country,
    province: document.querySelector("#placeProvince").value.trim(),
    region: document.querySelector("#placeRegion").value.trim(),
    latitude: latEmpty ? null : latitude,
    longitude: lngEmpty ? null : longitude,
    coordinateStatus: latEmpty ? "missing" : document.querySelector("#placeCoordinateStatus").value,
    visitCount: parseNumber(document.querySelector("#placeVisitCount").value),
    firstVisitYear: parseNumber(document.querySelector("#placeFirstVisitYear").value),
    lastVisitYear: parseNumber(document.querySelector("#placeLastVisitYear").value),
    visitYears: parseListNumbers(document.querySelector("#placeVisitYears").value),
    tags: document.querySelector("#placeTags").value.split(",").map((tag) => tag.trim()).filter(Boolean),
    note: document.querySelector("#placeNote").value.trim(),
    source: "manual"
  };
  return normalizePlace(place);
}

function savePlaceManual(place) {
  createAutoSnapshot(state.placeEditingId ? "before-edit-place" : "before-add-place");
  activeManualPlaces = state.placeEditingId
    ? activeManualPlaces.map((item) => item.id === state.placeEditingId ? place : item)
    : [...activeManualPlaces, place];
  savePlacesToLocal();
  markDataChanged(state.placeEditingId ? "edit-place" : "add-place");
  closePlaceForm();
  state.selectedId = getAllPlaces().find((item) => item.manualId === place.id || item.id === place.id)?.id || null;
  renderAll();
  const merged = getAllPlaces().find((item) => item.manualId === place.id || item.id === place.id);
  if (merged) selectPlace(merged.id);
}

function deletePlaceManual(place) {
  const manualId = place.manualId || place.id;
  if (!manualId || !confirm("确定删除这条手动城市/目的地记录吗？")) return;
  createAutoSnapshot("before-delete-place");
  activeManualPlaces = activeManualPlaces.filter((item) => item.id !== manualId);
  savePlacesToLocal();
  markDataChanged("delete-place");
  closePlaceForm();
  state.selectedId = null;
  renderAll();
}

const mainlandProvinceOrder = [
  "北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江",
  "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南",
  "湖北", "湖南", "广东", "广西", "海南", "重庆", "四川", "贵州",
  "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆"
];

function getBulkCityCatalog() {
  const sources = {
    ...(window.mainlandCityBoundaries || {}),
    ...(window.mainlandDirectAdminBoundaries || {})
  };
  return Object.keys(sources)
    .map((key) => {
      const [country, province, city] = key.split("|");
      return { key, country, province, city, boundary: sources[key] };
    })
    .filter((item) => item.country === "中国" && item.province && item.city)
    .sort((a, b) => {
      const provinceDiff = mainlandProvinceOrder.indexOf(a.province) - mainlandProvinceOrder.indexOf(b.province);
      if (provinceDiff !== 0) return provinceDiff;
      return a.city.localeCompare(b.city, "zh-Hans-CN");
    });
}

function getExistingPlaceKeys() {
  const keys = new Set();
  getAllPlaces().forEach((place) => {
    keys.add(getPlaceKey({ ...place, city: place.name }));
    keys.add(getBoundaryKey(place));
  });
  return keys;
}

function getBoundaryCenter(boundary) {
  const bounds = L.geoJSON(boundary).getBounds();
  if (!bounds.isValid()) return { latitude: null, longitude: null };
  const center = bounds.getCenter();
  return { latitude: center.lat, longitude: center.lng };
}

function closeBulkCityPanel() {
  if (bulkCityPanel) bulkCityPanel.hidden = true;
  state.bulkSelectedCityKeys = new Set();
}

function openBulkCityPanel() {
  if (!bulkCityPanel) return;
  closePlaceForm();
  closeVisitRecordForm();
  const catalog = getBulkCityCatalog();
  state.bulkSelectedCityKeys = new Set();
  state.bulkProvince = state.bulkProvince || catalog[0]?.province || "";
  bulkCityPanel.hidden = false;
  renderBulkCityPicker();
  scrollPanelIntoView(bulkCityPanel);
}

function renderBulkCityPicker() {
  if (!bulkProvinceList || !bulkCityGrid || !bulkCitySummary) return;
  const catalog = getBulkCityCatalog();
  const existingKeys = getExistingPlaceKeys();
  const provinceMap = new Map();
  catalog.forEach((item) => {
    if (!provinceMap.has(item.province)) provinceMap.set(item.province, []);
    provinceMap.get(item.province).push(item);
  });
  if (!state.bulkProvince || !provinceMap.has(state.bulkProvince)) {
    state.bulkProvince = provinceMap.keys().next().value || "";
  }

  bulkProvinceList.innerHTML = "";
  [...provinceMap.entries()].forEach(([province, cities]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "province-button";
    if (province === state.bulkProvince) button.classList.add("active");
    const addedCount = cities.filter((city) => existingKeys.has(city.key)).length;
    button.innerHTML = `<span>${province}</span><strong>${addedCount}</strong>`;
    button.addEventListener("click", () => {
      state.bulkProvince = province;
      renderBulkCityPicker();
    });
    bulkProvinceList.appendChild(button);
  });

  const currentCities = provinceMap.get(state.bulkProvince) || [];
  if (bulkProvinceTitle) bulkProvinceTitle.textContent = state.bulkProvince || "选择省份";
  bulkCityGrid.innerHTML = "";
  currentCities.forEach((city) => {
    const isAdded = existingKeys.has(city.key);
    const isSelected = state.bulkSelectedCityKeys.has(city.key);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "bulk-city-button";
    if (isAdded) button.classList.add("added");
    if (isSelected) button.classList.add("selected");
    button.innerHTML = `<span>${city.city}</span><small>${isAdded ? "已添加" : isSelected ? "待新增" : "未添加"}</small>`;
    button.addEventListener("click", () => {
      if (isAdded) return;
      if (state.bulkSelectedCityKeys.has(city.key)) state.bulkSelectedCityKeys.delete(city.key);
      else state.bulkSelectedCityKeys.add(city.key);
      renderBulkCityPicker();
    });
    bulkCityGrid.appendChild(button);
  });
  bulkCitySummary.textContent = `已选择新增 ${state.bulkSelectedCityKeys.size} 个城市`;
}

function saveBulkCities() {
  const selectedKeys = [...state.bulkSelectedCityKeys];
  if (selectedKeys.length === 0) {
    closeBulkCityPanel();
    return;
  }
  const existingKeys = getExistingPlaceKeys();
  const catalog = new Map(getBulkCityCatalog().map((item) => [item.key, item]));
  const newPlaces = selectedKeys
    .filter((key) => !existingKeys.has(key) && catalog.has(key))
    .map((key) => {
      const item = catalog.get(key);
      const center = getBoundaryCenter(item.boundary);
      return normalizePlace({
        id: createPlaceId({ country: item.country, province: item.province, name: item.city }),
        type: "city",
        name: item.city,
        country: item.country,
        province: item.province,
        region: "",
        latitude: center.latitude,
        longitude: center.longitude,
        coordinateStatus: Number.isFinite(center.latitude) && Number.isFinite(center.longitude) ? "city-center" : "missing",
        visitRecords: [],
        visitCount: 1,
        firstVisit: "",
        lastVisit: "",
        firstVisitYear: null,
        lastVisitYear: null,
        visitYears: [],
        tags: [],
        note: "",
        source: "manual-bulk"
      });
    });
  createAutoSnapshot("before-bulk-add-places");
  activeManualPlaces = [...activeManualPlaces, ...newPlaces];
  savePlacesToLocal();
  markDataChanged("bulk-add-places");
  closeBulkCityPanel();
  renderAll();
}

function exportPlacesJson() {
  const date = new Date().toISOString().slice(0, 10);
  const json = JSON.stringify(activeManualPlaces, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `footprint-places-manual-${date}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importPlacesJson(file) {
  if (!confirm("导入城市 JSON 会合并/覆盖当前手动城市记录，且不会影响酒店数据。继续吗？")) {
    importPlacesJsonFile.value = "";
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const data = JSON.parse(reader.result);
      if (!Array.isArray(data)) throw new Error("JSON root must be an array.");
      createAutoSnapshot("before-import-places-json");
      const incoming = data.map(normalizePlace);
      const byId = new Map(activeManualPlaces.map((place) => [place.id, place]));
      incoming.forEach((place) => byId.set(place.id, place));
      activeManualPlaces = [...byId.values()];
      savePlacesToLocal();
      markDataChanged("import-places-json");
      renderAll();
    } catch (error) {
      alert("导入失败：城市 JSON 格式错误。");
    } finally {
      importPlacesJsonFile.value = "";
    }
  });
  reader.readAsText(file);
}

function selectPlace(id) {
  state.selectedId = id;
  const place = getAllPlaces().find((item) => item.id === id);
  renderDetail(place);
  renderList(getFilteredPlaces());
  renderMap(getFilteredPlaces());
  if (place) {
    fitMapToPlace(place);
  }
}

function syncFilters() {
  updateModeUi();
  if (state.mode === "flight") {
    const airlines = uniqueValues(activeFlightTrips, (trip) => trip.airline);
    const years = uniqueValues(activeFlightTrips, getFlightTripYear).sort((a, b) => Number(b) - Number(a));
    const fromAirports = uniqueValues(activeFlightTrips, (trip) => trip.fromAirport);
    const toAirports = uniqueValues(activeFlightTrips, (trip) => trip.toAirport);
    const arriveCities = uniqueValues(activeFlightTrips.map((trip) => getFlightAirport(trip.toAirport)).filter(Boolean), (airport) => airport.city);
    if (state.flightAirline !== "all" && !airlines.includes(state.flightAirline)) state.flightAirline = "all";
    if (state.flightYear !== "all" && !years.includes(state.flightYear)) state.flightYear = "all";
    if (state.flightFrom !== "all" && !fromAirports.includes(state.flightFrom)) state.flightFrom = "all";
    if (state.flightTo !== "all" && !toAirports.includes(state.flightTo)) state.flightTo = "all";
    if (state.flightCity !== "all" && !arriveCities.includes(state.flightCity)) state.flightCity = "all";
    fillFilterOptions(groupFilter, airlines.map((value) => ({ value, label: value })), "全部航司");
    fillFilterOptions(brandFilter, years.map((value) => ({ value, label: value })), "全部年份");
    fillFilterOptions(countryFilter, fromAirports.map((value) => ({ value, label: value })), "全部出发机场");
    fillFilterOptions(areaFilter, toAirports.map((value) => ({ value, label: value })), "全部到达机场");
    fillFilterOptions(cityFilter, arriveCities.map((value) => ({ value, label: value })), "全部到达城市");
    groupFilter.value = state.flightAirline;
    brandFilter.value = state.flightYear;
    countryFilter.value = state.flightFrom;
    areaFilter.value = state.flightTo;
    cityFilter.value = state.flightCity;
    fillSortOptions(sortFilter, flightSortOptions);
    if (!flightSortOptions.some((item) => item.value === state.flightSort)) state.flightSort = "date-desc";
    if (sortFilter) sortFilter.value = state.flightSort;
    if (tagFilter) fillFilter(tagFilter, [], "标签");
    return;
  }
  if (state.mode === "rail") {
    const trainTypeOptions = [
      { value: "G", label: "G 高铁" },
      { value: "D", label: "D 动车" },
      { value: "C", label: "C 城际" },
      { value: "S", label: "S 市郊/其他" },
      { value: "other", label: "其他" }
    ];
    const seatOptions = [
      { value: "商务座", label: "商务座" },
      { value: "特等座", label: "特等座" },
      { value: "一等座", label: "一等座" },
      { value: "二等座", label: "二等座" },
      { value: "二等座无座", label: "二等座无座" },
      { value: "other", label: "其他" }
    ];
    const fromStations = uniqueValues(activeRailTrips, (trip) => trip.fromStation);
    const toStations = uniqueValues(activeRailTrips, (trip) => trip.toStation);
    const years = uniqueValues(activeRailTrips, getRailTripYear).sort((a, b) => Number(b) - Number(a));
    if (state.railType !== "all" && !trainTypeOptions.some((item) => item.value === state.railType)) state.railType = "all";
    if (state.railSeat !== "all" && !seatOptions.some((item) => item.value === state.railSeat)) state.railSeat = "all";
    if (state.railFrom !== "all" && !fromStations.includes(state.railFrom)) state.railFrom = "all";
    if (state.railTo !== "all" && !toStations.includes(state.railTo)) state.railTo = "all";
    if (state.railYear !== "all" && !years.includes(state.railYear)) state.railYear = "all";
    fillFilterOptions(groupFilter, trainTypeOptions, "全部类型");
    fillFilterOptions(brandFilter, seatOptions, "全部座席");
    fillFilterOptions(countryFilter, fromStations.map((value) => ({ value, label: value })), "全部出发站");
    fillFilterOptions(areaFilter, toStations.map((value) => ({ value, label: value })), "全部到达站");
    fillFilterOptions(cityFilter, years.map((value) => ({ value, label: value })), "全部年份");
    groupFilter.value = state.railType;
    brandFilter.value = state.railSeat;
    countryFilter.value = state.railFrom;
    areaFilter.value = state.railTo;
    cityFilter.value = state.railYear;
    fillSortOptions(sortFilter, railSortOptions);
    if (!railSortOptions.some((item) => item.value === state.railSort)) state.railSort = "date-desc";
    if (sortFilter) sortFilter.value = state.railSort;
    if (tagFilter) fillFilter(tagFilter, [], "标签");
    return;
  }
  if (state.mode === "place") {
    const allPlaces = getAllPlaces();
    fillFilter(groupFilter, [], "集团");
    fillFilter(brandFilter, [], "品牌");
    fillFilter(countryFilter, uniqueValues(allPlaces, (place) => place.country), "国家/地区");
    if (state.country !== "all" && !uniqueValues(allPlaces, (place) => place.country).includes(state.country)) state.country = "all";
    const areaBase = allPlaces.filter((place) => state.country === "all" || place.country === state.country);
    const areaValues = uniqueValues(areaBase, getArea);
    if (state.area !== "all" && !areaValues.includes(state.area)) state.area = "all";
    fillFilter(areaFilter, areaValues, "省份/地区");
    const cityBase = areaBase.filter((place) => state.area === "all" || getArea(place) === state.area);
    const cityValues = uniqueValues(cityBase, (place) => place.name);
    if (state.city !== "all" && !cityValues.includes(state.city)) state.city = "all";
    fillFilter(cityFilter, cityValues, "城市");
    const tagValues = uniqueValues(allPlaces.flatMap((place) => place.tags || []), (tag) => tag);
    fillFilter(tagFilter, tagValues, "标签");
    if (state.tag !== "all" && !tagValues.includes(state.tag)) state.tag = "all";
    countryFilter.value = state.country;
    areaFilter.value = state.area;
    cityFilter.value = state.city;
    if (tagFilter) tagFilter.value = state.tag;
    return;
  }
  const brandBase = activeHotels.filter((hotel) => state.group === "all" || hotel.group === state.group);
  const countryBase = brandBase.filter((hotel) => state.brand === "all" || hotel.brand === state.brand);
  fillFilter(groupFilter, uniqueValues(activeHotels, (hotel) => hotel.group), "集团");
  fillFilter(brandFilter, uniqueValues(brandBase, (hotel) => hotel.brand), "品牌");
  if (state.group !== "all" && !uniqueValues(activeHotels, (hotel) => hotel.group).includes(state.group)) state.group = "all";
  const brandValues = uniqueValues(brandBase, (hotel) => hotel.brand);
  if (state.brand !== "all" && !brandValues.includes(state.brand)) state.brand = "all";
  fillFilter(countryFilter, uniqueValues(countryBase, (hotel) => hotel.country), "国家/地区");
  if (state.country !== "all" && !uniqueValues(countryBase, (hotel) => hotel.country).includes(state.country)) state.country = "all";
  const areaValues = uniqueValues(getAreaBaseHotels(), getArea);
  if (state.area !== "all" && !areaValues.includes(state.area)) state.area = "all";
  fillFilter(areaFilter, areaValues, "省份/地区");
  const cityValues = uniqueValues(getCityBaseHotels(), (hotel) => hotel.city);
  if (state.city !== "all" && !cityValues.includes(state.city)) state.city = "all";
  fillFilter(cityFilter, cityValues, "城市");
  groupFilter.value = state.group;
  brandFilter.value = state.brand;
  countryFilter.value = state.country;
  areaFilter.value = state.area;
  cityFilter.value = state.city;
}

function renderAll() {
  syncFilters();
  const items = getCurrentItems();
  renderStats(items);
  render(items);
  updateDataSource();
  updateDataSafetyStatus();
}

renderAll();


