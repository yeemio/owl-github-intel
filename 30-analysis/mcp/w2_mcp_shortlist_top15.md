# W2 MCP Top 15 Shortlist (Deployability / Risk / Maintenance Cost)

## 评分口径
- `deployability_score`：接入速度、官方支持度、文档完整性、与主流Host兼容性（高分更好）
- `risk_score`：安全暴露面、版本漂移、供应链与权限风险（高分风险更高）
- `maintenance_cost_score`：升级频率、适配工作量、运行治理复杂度（高分成本更高）
- 数据基础来源：
  - 官方基线: [servers README](https://raw.githubusercontent.com/modelcontextprotocol/servers/main/README.md)
  - 社区清单: [awesome-mcp-servers README](https://raw.githubusercontent.com/punkpeye/awesome-mcp-servers/main/README.md)
  - 协议规范: [tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md), [transports](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports.md), [versioning](https://modelcontextprotocol.io/specification/versioning.md)
  - 治理成熟度: [SDK tiers](https://modelcontextprotocol.io/community/sdk-tiers.md)

## Top 15 总结
- **P0（立即采用）**
  - `python-sdk`, `typescript-sdk`: 双语言SDK基线，覆盖最大并减少单栈锁定。
  - `servers/src/everything`: 作为协议回归和工具行为一致性测试靶场。
  - `servers/src/filesystem`, `servers/src/git`: 快速落地本地Agent核心能力。
- **P1（近期纳管）**
  - `mcp-server-templates`: 内部MCP server工厂化模板。
  - `pipedream modelcontextprotocol`: 大规模SaaS连接器加速器。
  - `brave-search-mcp-server`: 远程API型server样板。
  - `go-sdk`, `csharp-sdk`, `java-sdk`: 企业后端栈兼容扩展。
  - `servers/src/fetch`: 外部信息抓取与安全策略校验基线。
- **P2（条件性引入）**
  - `metatool-app`, `forage`, `1mcp-app/agent`: 聚合/自动发现价值高，但需强治理（命名冲突、动态安装审计、权限边界）。

## 直接执行建议（按优先级）
1. 以 `python-sdk + typescript-sdk` 建双栈SDK门禁，并锁定支持的协议窗口。  
   来源: [SDK tiers](https://modelcontextprotocol.io/community/sdk-tiers.md), [versioning](https://modelcontextprotocol.io/specification/versioning.md)
2. 把 `servers/src/everything` 纳入CI回归，覆盖 `tools/list`、`tools/call`、`list_changed`。  
   来源: [tools spec](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md)
3. 本地能力先用 `filesystem + git` 落地，默认最小权限目录与人工确认。  
   来源: [connect local](https://modelcontextprotocol.io/docs/develop/connect-local-servers.md)
4. 远程能力统一走 Streamable HTTP 基线，禁止新项目继续使用旧 HTTP+SSE。  
   来源: [transports](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports.md)
5. 引入聚合网关前，先上线工具命名冲突检查和运行时能力验真（catalog vs `tools/list`）。

## 产物文件
- 排序明细：`w2_mcp_shortlist_top15.csv`
