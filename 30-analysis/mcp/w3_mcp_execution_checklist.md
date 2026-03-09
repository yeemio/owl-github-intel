# W3 MCP Execution Checklist (P0 -> P1)

## Goal
将 `w2_mcp_shortlist_top15` 的 P0/P1 项目转成可执行落地项，覆盖：协议、发现、部署、安全、回归。

## P0 (Week 1-2, 必做)

### 1) 协议基线冻结
- [ ] 固定会话主版本：`2025-11-25`
- [ ] 明确支持窗口：`current` + `current-1`
- [ ] 版本不匹配时统一返回兼容错误并触发降级流程
- 依据: [Versioning](https://modelcontextprotocol.io/specification/versioning.md)

### 2) 双栈 SDK 基线
- [ ] 默认 SDK 栈：`modelcontextprotocol/python-sdk` + `modelcontextprotocol/typescript-sdk`
- [ ] 新 server 至少提供一个栈的官方 SDK 实现
- [ ] 所有变更必须附 conformance 结果快照
- 依据: [SDK Tiers](https://modelcontextprotocol.io/community/sdk-tiers.md)

### 3) 工具发现与契约一致性
- [ ] 预发现（registry/目录）+ 运行时发现（`tools/list`）双校验
- [ ] `tools/list` 差异触发阻断，不允许静默上线
- [ ] 对 `listChanged` 场景做增量回归
- 依据: [Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md), [Registry](https://modelcontextprotocol.io/registry/about.md)

### 4) 本地执行安全基线
- [ ] `filesystem` 默认最小目录授权（deny-all -> allowlist）
- [ ] 高危工具调用必须人工确认
- [ ] 明确审计日志字段：who/when/tool/args/result
- 依据: [Connect Local](https://modelcontextprotocol.io/docs/develop/connect-local-servers.md), [Tools Security](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md)

### 5) 传输层统一
- [ ] 新项目统一 Streamable HTTP
- [ ] 仅保留有限兼容层处理旧 HTTP+SSE
- [ ] 强制 `MCP-Protocol-Version` 头校验
- 依据: [Transports](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports.md)

## P1 (Week 3-6, 建议)

### 6) Server 工厂化模板
- [ ] 接入模板项目（如 `mcp-server-templates`）统一生成骨架
- [ ] 模板内置 input/output schema 校验与错误分类
- [ ] 模板内置权限策略与审计中间件
- 依据: [Awesome MCP Servers](https://raw.githubusercontent.com/punkpeye/awesome-mcp-servers/main/README.md)

### 7) 聚合网关准入机制
- [ ] 聚合前做工具命名冲突扫描
- [ ] 统一命名规范：`<namespace>.<domain>.<action>`
- [ ] 聚合层对每个下游 server 维护健康度与兼容矩阵
- 依据: [Tools naming](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md)

### 8) Inspector 标准化验收
- [ ] 每个候选 server 必过 Inspector 基础脚本
- [ ] 覆盖：连接、能力协商、工具参数边界、并发与超时
- [ ] 验收记录入库，作为上线凭证
- 依据: [Inspector](https://modelcontextprotocol.io/docs/tools/inspector.md)

## Exit Criteria
- P0 完成率 >= 95%
- 关键工具（filesystem/git/fetch）回归通过率 100%
- 线上 server 全部具备契约文件与审计日志

