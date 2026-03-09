# Handoff A -> B (2026-03-09 C1)

Theme: MCP + Gateway reliability

## A Window Hard Metric Status

- source_count >= 30: PASS (60)
- hard_evidence_count >= 10: PASS (50)
- new_claims >= 12: PASS (12)

## Claims To Challenge
- C-A01: MCP连接层的兼容性与变更频率高，接口契约漂移是持续风险。
- C-A02: Gateway层（尤其多模型路由）中认证/限流/配额错误是高频故障入口。
- C-A03: Issue到PR的修复链路显示：可靠性问题多数靠工程护栏而非单点算法优化解决。
- C-A04: Release节奏越快，升级回归与配置不兼容概率越高，需要明确升级闸门。
- C-A05: Agent runtime在并发和状态管理下容易暴露非确定性故障。
- C-A06: 可观测链路若缺span/trace传播，会直接削弱故障定位速度。
- C-A07: 工具调用/函数调用参数约束不严，常导致线上隐性失败。
- C-A08: 文档与样例漂移会把“可复现”问题放大为“看似随机”故障。
- C-A09: 跨仓库集成时，版本矩阵管理不足会引发依赖冲突。
- C-A10: MCP server生态扩展快，但治理策略（权限、审计、回滚）常滞后。
- C-A11: 生产问题多发生在边界流量与异常输入，不在happy-path基准里。
- C-A12: 可靠性成熟团队普遍采用“发布状态机+自动回滚+回灌评测”闭环。

## Priority Attack Targets
1. C-A02 (auth/rate-limit) -> find counterexamples where issue cause is not gateway but downstream SDK
2. C-A04 (release risk) -> find stable fast-release repos that avoid regressions
3. C-A12 (closed loop necessity) -> find cases where closed loop absent but reliability still high

Evidence file: `D:/ai/owl-github-intel/10-raw/scans/evidence_2026-03-09_A_C1.csv`
Scan file: `D:/ai/owl-github-intel/10-raw/scans/scan_2026-03-09_A_C1.md`