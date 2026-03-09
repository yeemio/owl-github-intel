# W4 MCP Aggregator Threat Model (1MCP / Forage / MetaMCP Patterns)

## Scope
面向三类聚合/网关模式的威胁建模与缓解策略：
- 单端点聚合器（1MCP 类）
- 动态发现/动态安装聚合器（Forage 类）
- 多租户命名空间中间件网关（MetaMCP 类）

参考来源：
- [1MCP README](https://raw.githubusercontent.com/1mcp-app/agent/main/README.md)
- [Forage README](https://raw.githubusercontent.com/isaac-levine/forage/main/README.md)
- [MetaMCP README](https://raw.githubusercontent.com/metatool-ai/metatool-app/main/README.md)
- [MCP Transports](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports.md)
- [MCP Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md)

## Threat Surface Inventory

### Surface S1: Discovery Plane
- Registry/marketplace/awesome list 发现到的 server 元数据可能与运行时行为不一致。
- **Primary risks**:
  - 伪装 package / 供应链污染
  - 元数据误导（宣称能力与实际不符）

### Surface S2: Installation Plane (dynamic install)
- 动态安装可绕过传统变更流程，扩大攻击窗口。
- **Primary risks**:
  - 恶意包执行
  - 未授权安装导致权限扩张

### Surface S3: Aggregation Plane
- 多 server 汇聚后工具命名冲突、权限语义冲突、错误语义冲突。
- **Primary risks**:
  - 调错工具（confused deputy）
  - 低信任 server 污染高信任调用路径

### Surface S4: Transport/Auth Plane
- 远程 endpoint 暴露后面临 Origin、session、token 泄露、代理误配风险。
- **Primary risks**:
  - CORS/Origin 绕过
  - API key 泄露
  - stdio-only 客户端通过代理桥接导致 auth 行为异常

### Surface S5: Observability/Control Plane
- 缺失链路审计时，无法定位“谁调用了哪个下游 server”。
- **Primary risks**:
  - 不可追溯
  - 事故恢复延迟

## STRIDE-Oriented Risk Table

| ID | Category | Scenario | Impact | Likelihood | Risk |
|---|---|---|---|---|---|
| T1 | Spoofing | 恶意 server 冒充可信 namespace | High | Medium | High |
| T2 | Tampering | 动态安装包被篡改或投毒 | High | Medium | High |
| T3 | Repudiation | 聚合转发后无调用链审计 | High | Medium | High |
| T4 | Info Disclosure | 聚合器日志泄露 token/secret | High | Medium | High |
| T5 | DoS | 下游 server 不稳定拖垮统一端点 | High | High | Critical |
| T6 | EoP | 低权限工具借聚合层拿到高权限路径 | High | Medium | High |
| T7 | Confused Deputy | 工具同名冲突导致错误执行 | Medium | High | High |
| T8 | Policy Drift | 目录允许列表/网络允许列表长期漂移 | Medium | High | High |

## Controls (Required)

### C1. Trust and Provenance
- 仅允许已验证来源 registry/package（白名单）进入自动安装。
- 动态安装必须“审批 + 审计 + 可回滚”三联。
- 对应风险：T1/T2/T6

### C2. Namespaced Tool Identity
- 强制工具命名规范：`<source>.<domain>.<action>`
- 聚合前执行冲突扫描（阻断同名不同语义）
- 对应风险：T7

### C3. Per-Server Security Boundary
- 每个下游 server 运行在独立权限域（进程/容器/网络策略）
- 不允许共享高权限环境变量给所有子 server
- 对应风险：T4/T6

### C4. Transport and Auth Hardening
- Streamable HTTP 强制 Origin 校验、会话策略、协议头校验
- API key 仅 header 传递，禁止 query 参数长期使用
- 对应风险：T4/T5

### C5. Runtime Safety Guards
- 调用级限流、熔断、超时、重试预算
- 对高危工具强制人工确认
- 对应风险：T5/T6

### C6. End-to-End Audit Chain
- 日志至少包含：gatewayRequestId、downstreamServerId、toolName、actor、authContext、result、latency
- 聚合器必须可追踪“入口请求 -> 下游转发 -> 返回结果”
- 对应风险：T3

## Pattern-Specific Guidance

### 1) 1MCP-like Unified Endpoint
- **Strength**: 配置统一、客户端接入成本低。
- **Risk focus**: 汇聚导致 blast radius 增大。
- **Must-do**:
  - 下游分级信任（trusted/conditional/untrusted）
  - 每次发布执行下游健康探测与降级策略演练

### 2) Forage-like Dynamic Install
- **Strength**: 工具发现与接入极快。
- **Risk focus**: 供应链 + 权限扩张。
- **Must-do**:
  - 安装来源白名单
  - 审批票据绑定 install 操作
  - 安装后自动执行最小 smoke + 合约检查

### 3) MetaMCP-like Namespace Gateway
- **Strength**: 多租户与中间件治理能力强。
- **Risk focus**: 多租户隔离与代理桥接复杂度。
- **Must-do**:
  - namespace 级策略隔离
  - API key / OIDC 策略分离与轮换
  - stdio 代理桥接路径单独压测与审计

## Attack Simulation Playbook (Minimum)

1. **Supply-chain injection simulation**
- 场景：动态安装一个未在白名单的包。
- 期望：安装请求被阻断，审计日志记录完整。

2. **Tool collision simulation**
- 场景：两个下游 server 注册同名工具。
- 期望：聚合失败并输出冲突报告。

3. **Credential leakage simulation**
- 场景：下游响应中包含 secret/token。
- 期望：返回前脱敏，日志中不落明文。

4. **Downstream outage simulation**
- 场景：关键下游 server 超时/崩溃。
- 期望：网关熔断、降级工具集、主服务可用。

5. **Origin bypass simulation**
- 场景：非法 Origin 发起远程请求。
- 期望：403 拒绝，触发安全告警。

## Exit Criteria (Aggregator Go-Live)
- [ ] 高风险项（T1/T2/T5/T6）均有强制控制与自动化测试
- [ ] 动态安装路径全量可审计、可回滚
- [ ] 工具冲突扫描纳入 pre-merge/pre-prod 双阶段
- [ ] 下游故障演练达标（不影响主入口可用性）

