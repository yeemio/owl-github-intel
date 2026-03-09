# Handoff A -> B (2026-03-09 C2)

Theme: MCP + Gateway reliability

## A Window Hard Metric Status

- source_count >= 30: PASS (67)
- hard_evidence_count >= 10: PASS (57)
- new_claims >= 12: PASS (12)

## Claims To Challenge
- C2-A01: MCP client-server兼容问题在多实现并行演进时更容易出现。
- C2-A02: Gateway可靠性故障常与认证/配额/代理配置联动出现。
- C2-A03: issue到pr再到release的闭环速度直接影响故障窗口长度。
- C2-A04: 仅看release频率不足以判断风险，必须结合回归门禁强度。
- C2-A05: 并发场景下agent状态与工具调用幂等性是高风险点。
- C2-A06: trace链路断点会导致根因定位时间成倍上升。
- C2-A07: 工具schema约束与运行时参数校验缺失会产生隐性失败。
- C2-A08: 跨仓版本矩阵管理是MCP+Gateway落地的基础治理能力。
- C2-A09: 弱相关基础设施（网络、证书、容器镜像）可触发核心路径故障。
- C2-A10: 文档/示例漂移会把可修复问题放大成排障成本。
- C2-A11: 可靠系统普遍具备canary+自动回滚+回灌评测机制。
- C2-A12: 边界流量与异常输入场景应作为C2优先挑战对象。

## Priority Attack Targets
1. C2-A04: 检查高频发布但低事故率反例
2. C2-A02: 检查认证配额错误是否主要归因于下游
3. C2-A11: 检查无闭环但稳定运行的低复杂度案例

Evidence file: `D:/ai/owl-github-intel/10-raw/scans/evidence_2026-03-09_A_C2.csv`
Scan file: `D:/ai/owl-github-intel/10-raw/scans/scan_2026-03-09_A_C2.md`