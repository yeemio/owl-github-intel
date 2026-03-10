# W4 MCP Server Contract Field Spec (Field-Level)

## Purpose
为 `w3_mcp_server_contract_template.json` 提供字段级规范，确保不同团队产出的 MCP Server 契约可被统一校验、统一上线。

## Document Scope
- 适用对象：所有拟接入主平台的 MCP server（本地/远程/聚合）
- 覆盖维度：协议、传输、能力、工具、安全、兼容性、运维、审计
- 规范来源：
  - [MCP Versioning](https://modelcontextprotocol.io/specification/versioning.md)
  - [MCP Transports](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports.md)
  - [MCP Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md)
  - [SDK Tiering](https://modelcontextprotocol.io/community/sdk-tiers.md)
  - [Registry About](https://modelcontextprotocol.io/registry/about.md)

## Field Specification

### 1) Root Metadata

#### `contractVersion` (required)
- **Type**: string
- **Rule**: semver (`major.minor.patch`)
- **Policy**:
  - major: 契约结构破坏性变更
  - minor: 向后兼容字段新增
  - patch: 文档与默认值修正
- **Reject if**: 非 semver / 缺失

#### `serverId` (required)
- **Type**: string
- **Rule**: 推荐 reverse-dns 风格（`io.company.server-name`）
- **Reason**: 对齐 registry 命名治理与跨团队去重
- **Reject if**: 包含空格、非法字符、重名

#### `repository` (required)
- **Type**: URL
- **Rule**: 必须可公开访问（内部私有仓需在组织内镜像并记录）
- **Reject if**: URL 不可达或与发行物不一致

---

### 2) Protocol Block

#### `protocol.supportedVersions` (required)
- **Type**: string[]
- **Rule**: 元素必须为 `YYYY-MM-DD`
- **Minimum**: 至少包含 1 个可用版本
- **Best practice**: 至少声明 `current` + `current-1`

#### `protocol.defaultVersion` (required)
- **Rule**: 必须出现在 `supportedVersions` 中
- **Reject if**: default 不在支持列表

#### Example (valid)
```json
{
  "supportedVersions": ["2025-11-25", "2025-03-26"],
  "defaultVersion": "2025-11-25"
}
```

---

### 3) Transports Block

#### `transports.stdio.enabled`
- **Use when**: 本地客户端（desktop/IDE 本地代理）
- **Required sibling**: `launch.command`, `launch.args`
- **Reject if**: enabled=true 但启动参数缺失

#### `transports.streamableHttp.enabled`
- **Use when**: 远程 server / 多租户部署
- **Required siblings**:
  - `endpoint` (https url strongly recommended)
  - `requiresProtocolHeader` (must be true for prod)
  - `originValidation` (must be true for prod)
  - `sessionManagement` (recommended true)
- **Reject if**: 远程模式下未启用 Origin 校验

---

### 4) Capabilities Block

#### `capabilities.tools.enabled` (required for tool servers)
- **Rule**: 若 server 提供工具，必须 true

#### `capabilities.tools.listChanged`
- **Rule**: 动态工具集服务器必须 true（聚合器/自动安装类）
- **Test**: 工具新增或下线时发出 `notifications/tools/list_changed`

#### `capabilities.resources/prompts.enabled`
- **Rule**: 不支持则显式 false，避免客户端误判

---

### 5) Tools Array

#### `tools[].name` (required)
- **Rule**:
  - 1-128 chars
  - 推荐字符集：`A-Z a-z 0-9 _ - .`
  - 建议命名：`<namespace>.<domain>.<action>`
- **Reject if**: 空格、重名、超长

#### `tools[].inputSchemaRef` / `outputSchemaRef`
- **Rule**: 必须指向存在的 schema 文件；schema 可被 JSON Schema 校验器解析
- **Policy**:
  - outputSchema 强烈建议提供
  - 无参数工具也应提供 object schema

#### `tools[].requiresHumanConfirmation`
- **Rule**:
  - write/privileged 类工具必须 true
  - read-only 可 false

#### `tools[].riskLevel`
- **Allowed**: `low`, `medium`, `high`, `critical`
- **Policy**: `high/critical` 必须绑定人工确认 + 审计

---

### 6) Security Block

#### `security.authMode`
- **Allowed**: `none`, `api_key`, `oauth2`, `oauth2_or_api_key`, `oidc`
- **Policy**:
  - 生产禁止 `none`（除非完全离线本地场景）

#### `security.leastPrivilege`
- **Rule**:
  - `enabled` 必须 true
  - path/network allowlist 至少配置一类
- **Reject if**: allowlist 全空且 server 具备外部访问能力

#### `security.rateLimit`
- **Rule**: 远程 server 必填
- **Minimum**: `requestsPerMinute > 0`, `burst > 0`

#### `security.auditLogging.requiredFields`
- **Minimum required**:
  - requestId
  - timestamp
  - actor
  - toolName
  - resultStatus
  - latencyMs
- **Reject if**: 缺失最小字段

---

### 7) Compatibility Block

#### `compatibility.knownIssues`
- **Rule**: 每条 issue 应含 `id`, `summary`, `workaround`
- **Policy**: 空数组可接受，但发布前应复核

#### `compatibility.extensionSupport`
- **Rule**: 未支持扩展必须显式 false
- **Why**: 避免 host 误开启扩展流程

---

### 8) Operations Block

#### `operations.healthcheck`
- **Rule**: 远程部署必须有健康检查路径
- **SLO**: 推荐声明可用性目标（如 `99.9%`）

#### `operations.rollback`
- **Rule**: 必须定义回滚策略与最大恢复时长
- **Reject if**: 无 rollback 定义

---

## Validation Levels

### Level 1: Syntax
- JSON 格式正确
- 字段类型正确

### Level 2: Contract Semantics
- defaultVersion 属于 supportedVersions
- transport-enabled 与必要字段一致
- tools 命名/唯一性符合规则

### Level 3: Runtime Consistency
- 契约声明与运行时 `tools/list` 一致
- 传输安全行为与契约一致（Origin/header/session）

## Common Anti-Patterns
- 只写“支持 HTTP”但未声明 `MCP-Protocol-Version` 头策略
- 只提供 input schema，不提供 output schema
- 将高危工具标记为 `requiresHumanConfirmation=false`
- 聚合器动态安装却未声明审计与来源策略

## Acceptance Checklist
- [ ] 字段级校验通过（L1 + L2）
- [ ] 运行时一致性校验通过（L3）
- [ ] 高危工具确认链与审计链验证通过
- [ ] 回滚演练报告可追溯

