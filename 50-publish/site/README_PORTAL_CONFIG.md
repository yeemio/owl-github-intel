# Portal 配置说明

## 如何本地运行（必读）

**不能直接双击打开 `index.html`**：浏览器对 `file://` 会拦截 ES 模块和 `fetch`，页面会空白或无法交互。

**必须从仓库根目录启动 HTTP 服务**，否则门户里指向 `00-index`、`40-insights`、`20-normalized` 等的链接会 404。

1. 在终端中进入**仓库根目录**（`owl-github-intel`），执行其一：
   - `python -m http.server 3765`
   - `npx serve . -l 3765`
2. 用浏览器访问：**`http://localhost:3765/50-publish/site/`**（注意路径必须是 `/50-publish/site/`）。

这样搜索、筛选和所有卡片链接才能正常打开。若只从 `50-publish/site` 目录启动服务，页面会提示“部分链接会 404”。

**自检链接**：在仓库根目录先启动服务（如 `python -m http.server 3765`），再在另一终端执行 `node 50-publish/site/check-portal-links.js`，会生成 `50-publish/site/check-portal-links-report.md` 报告；若有 404 会列在报告中。

---

`portal.config.json` 控制门户的文案与导航分区，**无需改代码**即可扩展。

## 结构

| 字段 | 说明 |
|------|------|
| `text` | 按语言覆盖内置文案（`en` / `zh`），key 与 `app.js` 中 `DEFAULT_TEXT` 一致 |
| `sectionTitles` | 动态分区标题：`sectionTitles.<分区key>.en` / `.zh` |
| `groups` | 分区内容：key 为分区 id，value 为卡片数组 |

## 新增分区（仅改配置）

1. 在 `sectionTitles` 中增加一项，例如：  
   `"sectionTitles": { "mySection": { "en": "My Section", "zh": "我的分区" } }`
2. 在 `groups` 中增加同 key 的数组，每项格式：

```json
{
  "id": "unique-id",
  "theme": "operations",
  "tags": ["tag1", "tag2"],
  "en": ["Title", "Description"],
  "zh": ["标题", "描述"],
  "href": "../path/to/file.md"
}
```

- `href` 可为字符串或 `{ "en": "...", "zh": "..." }`
- `theme` / `tags` 参与主题与标签筛选及搜索

## 新增 Cycle 条目

在 `groups.cycleDigests` 中追加新对象，`tags` 建议包含 `cN`、`handoff`、`scan` 等，便于按周期或类型筛选。
