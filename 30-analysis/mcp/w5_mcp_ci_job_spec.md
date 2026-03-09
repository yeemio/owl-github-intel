# W5 MCP CI Job Specification (Premerge / Preprod / Postdeploy)

## Purpose
将 W3/W4 的 Gate 与测试矩阵落成可执行流水线规范（不绑定具体 CI 平台实现），用于平台/安全/QA 协同发布。

## Inputs
- Gate definitions: `w3_mcp_ci_gates.csv`
- Test cases: `w3_mcp_gate_testcases.csv`
- P0 tool matrix: `w4_mcp_p0_tool_test_matrix.csv`
- Contract template/spec:
  - `w3_mcp_server_contract_template.json`
  - `w4_mcp_server_contract_field_spec.md`

## Pipeline Topology

### Stage 1: `premerge`
目标：阻断协议、契约、schema、传输硬性不合规变更。

#### Job PM-01 `validate_contract_schema`
- **Depends on**: none
- **Checks**:
  - 契约 JSON 格式与字段级规则（L1/L2）
  - `defaultVersion in supportedVersions`
  - transport 必要字段完整
- **Maps to gates**: `G01`, `G03`
- **Artifacts**:
  - `artifacts/premerge/contract-validation.json`
- **Fail policy**: hard fail

#### Job PM-02 `validate_tools_contract_diff`
- **Checks**:
  - 启动候选 server（stdio/remote mock）
  - 抓取 `tools/list`
  - 对比 contract 声明与运行时输出
- **Maps to gates**: `G03`, `G05`
- **Artifacts**:
  - `artifacts/premerge/tools-list.json`
  - `artifacts/premerge/tools-diff.json`
- **Fail policy**: hard fail unless approved change ticket attached

#### Job PM-03 `validate_schema_io`
- **Checks**:
  - `inputSchema`/`outputSchema` 用例校验（含负例）
  - 工具执行错误必须显式 `isError`
- **Maps to gates**: `G04`
- **Artifacts**:
  - `artifacts/premerge/schema-tests.json`
- **Fail policy**: hard fail

#### Job PM-04 `validate_transport_headers`
- **Checks**:
  - remote 调用必须携带 `MCP-Protocol-Version`
  - 非法 header/version 行为验证
- **Maps to gates**: `G02`
- **Artifacts**:
  - `artifacts/premerge/transport-header-tests.json`
- **Fail policy**: hard fail

---

### Stage 2: `preprod`
目标：上线前完成安全与运行特性验证（包括聚合器专项）。

#### Job PP-01 `security_origin_session_auth`
- **Checks**:
  - Origin 校验
  - session 生命周期
  - API key/OAuth/OIDC 路径健壮性
- **Maps to gates**: `G06`
- **Artifacts**:
  - `artifacts/preprod/security-origin-auth.json`
- **Fail policy**: hard fail

#### Job PP-02 `least_privilege_policy_checks`
- **Checks**:
  - filesystem allowlist 合规
  - 禁止 root/wildcard overprivilege
  - 高危工具确认链启用
- **Maps to gates**: `G07`
- **Artifacts**:
  - `artifacts/preprod/least-privilege.json`
- **Fail policy**: hard fail

#### Job PP-03 `inspector_smoke_and_edge`
- **Checks**:
  - Inspector smoke（连接、能力协商、工具调用）
  - edge case（超时、并发、错误恢复）
- **Maps to gates**: `G08`
- **Artifacts**:
  - `artifacts/preprod/inspector-smoke.json`
- **Fail policy**: hard fail

#### Job PP-04 `conformance_threshold_check`
- **Checks**:
  - conformance 分数阈值（按内部 tier policy）
- **Maps to gates**: `G09`
- **Artifacts**:
  - `artifacts/preprod/conformance-report.json`
- **Fail policy**: hard fail

#### Job PP-05 `registry_runtime_consistency`
- **Checks**:
  - registry/metadata 与 runtime capabilities 一致性
  - 聚合器场景下 namespace/tool 映射一致性
- **Maps to gates**: `G10`
- **Artifacts**:
  - `artifacts/preprod/registry-runtime-consistency.json`
- **Fail policy**: hard fail

---

### Stage 3: `postdeploy`
目标：发布后持续证明可控与可回滚。

#### Job PD-01 `audit_log_completeness`
- **Cadence**: every 30 min during canary, hourly after GA
- **Checks**:
  - required audit fields completeness >= 99%
- **Maps to gates**: `G11`
- **Artifacts**:
  - `artifacts/postdeploy/audit-completeness.json`
- **Fail policy**:
  - <99%: freeze rollout + incident

#### Job PD-02 `rollback_readiness_drill`
- **Cadence**: before full rollout and monthly thereafter
- **Checks**:
  - 回滚至上一个稳定版本并恢复关键工具可用性
  - RTO <= contract rollback threshold
- **Maps to gates**: `G12`
- **Artifacts**:
  - `artifacts/postdeploy/rollback-drill.json`
- **Fail policy**:
  - fail => no full rollout

## Severity and Stop Rules
- `critical` finding: immediate stop + rollback consideration
- `high` finding: block stage promotion
- `medium` finding: allow only with time-bound waiver

## Evidence Retention Policy
- premerge artifacts: 90 days
- preprod artifacts: 180 days
- postdeploy artifacts: 365 days
- incident-related artifacts: >= 540 days

## References
- [Versioning](https://modelcontextprotocol.io/specification/versioning.md)
- [Transports](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports.md)
- [Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md)
- [SDK Tiers](https://modelcontextprotocol.io/community/sdk-tiers.md)
- [Inspector](https://modelcontextprotocol.io/docs/tools/inspector.md)
