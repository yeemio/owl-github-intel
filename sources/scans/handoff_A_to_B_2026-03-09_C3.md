# Handoff A -> B (2026-03-09 C3)

Theme: Eval + Security failure modes

## A Window Hard Metric Status

- source_count >= 30: PASS (57)
- hard_evidence_count >= 10: PASS (47)
- new_claims >= 12: PASS (12)

## Claims To Challenge
- C3-A01: 评测框架之间的指标口径不一致会导致发布门禁误判。
- C3-A02: 安全红队结果若不进入回归集，会形成重复事故。
- C3-A03: Issue到PR的修复链路暴露出安全与评测配置漂移风险。
- C3-A04: 安全能力上线后若缺可观测闭环，误报/漏报难以及时校准。
- C3-A05: Prompt注入与越狱评测应与业务场景绑定，通用集不足以覆盖高风险路径。
- C3-A06: 模型升级带来的评测分数变化必须与成本、延迟联动判读。
- C3-A07: Guardrails规则集版本化不足会导致环境间行为不一致。
- C3-A08: RAG评测若仅看离线指标，线上事实性回归难被及时发现。
- C3-A09: 多工具链并发路径下，安全拦截与业务成功率存在张力。
- C3-A10: 文档/样例与默认配置不一致会放大安全误配置概率。
- C3-A11: 高频发布需要安全回归自动化，否则修复易被后续版本覆盖。
- C3-A12: 可靠团队通常把评测失败模式映射到明确回滚动作。

## Priority Attack Targets
1. C3-A01: 指标口径不一致是否真的导致门禁误判
2. C3-A05: 通用安全集 vs 业务特定高风险路径
3. C3-A09: 安全拦截与成功率冲突的边界条件

Evidence file: `D:/ai/owl-github-intel/sources/scans/evidence_2026-03-09_A_C3.csv`
Scan file: `D:/ai/owl-github-intel/sources/scans/scan_2026-03-09_A_C3.md`