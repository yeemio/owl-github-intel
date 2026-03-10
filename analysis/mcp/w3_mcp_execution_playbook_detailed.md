# W3 MCP Execution Playbook (Detailed)

## Objective
把 W2 Top15 从“选型建议”推进到“可上线实施”：每个阶段有输入、动作、阈值、失败处置、退出条件。

## Stage A - Intake and Trust (Day 0-2)

### A1. Source Integrity Intake
- **Input**: 候选 server/sdk 的 repo URL、发布渠道、维护状态。
- **Actions**:
  - 验证是否官方参考/官方 SDK/社区项目。
  - 标记“迁移状态”（例如模板项目 legacy -> 新仓库）。
- **Pass threshold**:
  - 项目来源清晰且维护状态明确（active/legacy/archived）。
- **Fail action**:
  - 进入 `quarantine`，禁止进入 PoC。
- **Evidence**:
  - [servers README](https://raw.githubusercontent.com/modelcontextprotocol/servers/main/README.md)
  - [awesome list](https://raw.githubusercontent.com/punkpeye/awesome-mcp-servers/main/README.md)
  - [templates migration note](https://raw.githubusercontent.com/Data-Everything/mcp-server-templates/main/README.md)

### A2. License and Policy Screening
- **Input**: 许可证、发行说明、鉴权方式。
- **Actions**:
  - 对 `NOASSERTION` 执行法务前置评估。
  - 识别 API key / OAuth / OIDC 依赖。
- **Pass threshold**:
  - 许可证可落地，或存在明确豁免路径。
- **Fail action**:
  - 仅允许沙箱环境试验，不可生产接入。

## Stage B - Protocol Conformance (Day 2-5)

### B1. Version Negotiation Gate
- **Input**: 客户端与服务端支持版本集合。
- **Actions**:
  - 会话必须协商到单一版本；固定 `2025-11-25` 为主版本。
  - 兼容 `current-1` 仅在必要路径开启。
- **Pass threshold**:
  - 协商失败率 < 0.1%（预发压测）。
- **Fail action**:
  - 回落到稳定版本并冻结发布。
- **Evidence**: [Versioning](https://modelcontextprotocol.io/specification/versioning.md)

### B2. Tool Contract Gate
- **Input**: `tools/list` 输出与契约文件。
- **Actions**:
  - 校验 `name/title/description/inputSchema/outputSchema`。
  - 验证 `listChanged` 通知与增量刷新。
- **Pass threshold**:
  - 契约一致率 100%，无未审批差异。
- **Fail action**:
  - 阻断合并并生成差异报告。
- **Evidence**: [Tools spec](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md)

### B3. Transport Gate
- **Input**: 传输模式（stdio/streamable HTTP）。
- **Actions**:
  - 远程服务强制校验 `MCP-Protocol-Version`。
  - 校验 Origin 规则和 session 生命周期。
- **Pass threshold**:
  - 错误头部/非法 Origin 全部被拒绝。
- **Fail action**:
  - 禁止部署。
- **Evidence**: [Transports](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports.md)

## Stage C - Security and Runtime Governance (Day 5-8)

### C1. Privilege Boundary
- **Input**: 工具权限清单（read/write/privileged）。
- **Actions**:
  - 高危工具强制人工确认。
  - 本地文件与网络均采用 allowlist。
- **Pass threshold**:
  - 0 个高危工具绕过确认链。
- **Fail action**:
  - 自动降级到只读工具集。
- **Evidence**:
  - [Connect local](https://modelcontextprotocol.io/docs/develop/connect-local-servers.md)
  - [Tools security considerations](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md)

### C2. Dynamic Discovery Control (for Aggregators)
- **Input**: 动态安装/自动发现能力（Forage/1MCP/MetaMCP 类）。
- **Actions**:
  - 安装行为必须显式用户确认。
  - 维护 install 审计日志与来源白名单。
- **Pass threshold**:
  - 所有动态安装均有审批记录和来源链。
- **Fail action**:
  - 禁用动态安装，仅允许预置目录。
- **Evidence**:
  - [Forage README](https://raw.githubusercontent.com/isaac-levine/forage/main/README.md)
  - [1MCP README](https://raw.githubusercontent.com/1mcp-app/agent/main/README.md)
  - [MetaMCP README](https://raw.githubusercontent.com/metatool-ai/metatool-app/main/README.md)

## Stage D - Reliability and Operations (Day 8-12)

### D1. Inspector Certification
- **Input**: 候选 server endpoint / stdio command。
- **Actions**:
  - 运行 Inspector 标准用例：连接、能力协商、工具边界参数、错误恢复。
- **Pass threshold**:
  - Smoke/edge cases 全通过。
- **Fail action**:
  - 标记 `not-certified`，退出上线队列。
- **Evidence**: [Inspector](https://modelcontextprotocol.io/docs/tools/inspector.md)

### D2. Observability and Incident Hooks
- **Input**: tool call 日志、延迟、错误码、拒绝率。
- **Actions**:
  - 记录最小审计字段：requestId/timestamp/toolName/actor/result/latency。
  - 聚合层记录“下游服务器名 + 转发链路”。
- **Pass threshold**:
  - 审计字段完整性 >= 99%。
- **Fail action**:
  - 触发发布冻结与 incident。

### D3. Rollback Drill
- **Input**: 当前版本与回滚目标版本。
- **Actions**:
  - 执行一次真实回滚演练（不是文档演练）。
  - 验证回滚后协议协商和核心工具可用性。
- **Pass threshold**:
  - 15 分钟内恢复服务。
- **Fail action**:
  - 禁止继续灰度放量。

## Stage E - Go-Live Decision

### Release Decision Matrix
- **Go**: A/B/C/D 阶段全部达到阈值。
- **Conditional Go**: 仅低风险 read-only 工具开放，write/privileged 延后。
- **No-Go**: 任何协议协商失败、鉴权绕过、审计缺失。

## Detailed Test Cases (Minimum Set)

1. **Version mismatch case**
- 请求头版本非法 -> 必须 400。
- 来源: [Transports](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports.md)

2. **tools/list drift case**
- 契约声明 10 个工具，运行时出现第 11 个未审批工具 -> 阻断。
- 来源: [Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md)

3. **Schema hard-fail case**
- 输入不满足 JSON Schema -> 返回可操作错误，不允许 silent fallback。
- 来源: [Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md)

4. **Origin defense case**
- 非法 Origin 访问远程端点 -> 403。
- 来源: [Transports security warning](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports.md)

5. **Dynamic install governance case**
- 未审批安装请求 -> 必须拒绝并记录审计。
- 来源: [Forage](https://raw.githubusercontent.com/isaac-levine/forage/main/README.md)

## Deliverables Mapping
- 细粒度矩阵: `w2_mcp_deep_dive_top15_matrix.csv`
- CI Gates: `w3_mcp_ci_gates.csv`
- 契约模板: `w3_mcp_server_contract_template.json`
- 本执行手册: `w3_mcp_execution_playbook_detailed.md`
