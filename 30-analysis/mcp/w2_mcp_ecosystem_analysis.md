# W2 MCP Ecosystem Analysis (Server / SDK / Awesome Deep Dive)

## Scope
- Scanned corpus: **50 projects** (10 official SDKs + 7 reference servers + 13 archived references/integration lineage + 20 awesome-list aggregators/integration hubs).
- Sources are web-only and traceable:
  - Official server/sdk baseline: [modelcontextprotocol/servers README](https://raw.githubusercontent.com/modelcontextprotocol/servers/main/README.md)
  - Community scale map: [awesome-mcp-servers README](https://raw.githubusercontent.com/punkpeye/awesome-mcp-servers/main/README.md)
  - Official protocol/spec/registry docs:
    - [Tools spec](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md)
    - [Transports spec](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports.md)
    - [Versioning spec](https://modelcontextprotocol.io/specification/versioning.md)
    - [SDK tiers](https://modelcontextprotocol.io/community/sdk-tiers.md)
    - [Registry overview](https://modelcontextprotocol.io/registry/about.md)
    - [Inspector](https://modelcontextprotocol.io/docs/tools/inspector.md)

## 1) Protocol Maturity (What is actually stable)

### Maturity ladder
- **L4 (high, production-leaning):** official SDKs + reference servers, but not uniform maturity; SDK tiering and conformance are now explicit governance mechanisms.  
  Sources: [SDK Tiering](https://modelcontextprotocol.io/community/sdk-tiers.md), [Servers README](https://raw.githubusercontent.com/modelcontextprotocol/servers/main/README.md)
- **L3 (medium, usable with guardrails):** large community aggregators/gateways in awesome list; strong utility, uneven conformance guarantees.  
  Source: [Awesome MCP Servers](https://raw.githubusercontent.com/punkpeye/awesome-mcp-servers/main/README.md)
- **L1-L2 (legacy/transition):** archived reference servers are explicitly non-current for production, useful as design history only.  
  Source: [Servers README archived section](https://raw.githubusercontent.com/modelcontextprotocol/servers/main/README.md)

### Important maturity signal shift
- The ecosystem moved from "repo popularity" to **conformance + tier + release discipline** as core maturity indicators.  
  Source: [SDK Tiering](https://modelcontextprotocol.io/community/sdk-tiers.md)

## 2) Tool Discovery Mechanism (How tools are found)

### Runtime discovery (protocol-native)
- Standard runtime discovery is `tools/list` + optional `notifications/tools/list_changed`; this is the mandatory baseline to interoperate with serious hosts.  
  Source: [Tools spec](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md)

### Registry discovery (catalog-native)
- Official registry provides metadata (`server.json`), namespace verification, install metadata, and API for aggregators.  
  Source: [Registry about](https://modelcontextprotocol.io/registry/about.md)
- Host apps are expected to consume aggregators/registries conforming to registry OpenAPI rather than hardcoding ad-hoc server lists.  
  Source: [Registry about](https://modelcontextprotocol.io/registry/about.md)

### Ecosystem reality
- Discovery has become **two-plane**:
  1) **Pre-runtime**: registry/awesome/marketplace selection
  2) **Runtime**: protocol `tools/list` resolution
- Most scaling pain now comes from synchronizing these planes (catalog metadata vs runtime capability truth).

## 3) Deployment Modes (How MCP is run in practice)

### Mode A: Local stdio (dominant for dev tools)
- Local servers are commonly run as subprocesses via Node/Python wrappers and configured per client.  
  Source: [Connect local servers](https://modelcontextprotocol.io/docs/develop/connect-local-servers.md)
- Strength: low latency and local data proximity.  
- Risk: permission overgrant, local env drift, package execution trust.

### Mode B: Remote streamable HTTP (growing for SaaS)
- Streamable HTTP is the current transport baseline; supports POST/GET and SSE streaming semantics.  
  Source: [Transports spec](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports.md)
- Strength: centralized governance/auth/deployment.
- Risk: auth complexity, cross-origin/security controls, multi-session reliability.

### Mode C: Hybrid gateway/aggregator
- A large part of awesome list is gateway/proxy/meta-server patterns (multi-server composition, discovery, policy, monetization).  
  Source: [Awesome MCP Servers](https://raw.githubusercontent.com/punkpeye/awesome-mcp-servers/main/README.md)
- Strength: one endpoint for many tools.
- Risk: name collisions, hidden capability mismatches, observability blind spots.

## 4) Compatibility Issues (Highest-friction items)

1. **Transport transition mismatch**  
   HTTP+SSE legacy vs Streamable HTTP current introduces client/server negotiation complexity.  
   Source: [Transports backward compatibility](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports.md)

2. **Protocol version negotiation drift**  
   MCP uses date versions; client/server must agree on one version per session.  
   Source: [Versioning](https://modelcontextprotocol.io/specification/versioning.md)

3. **Tool schema dialect mismatch**  
   JSON Schema defaults and schema strictness create real runtime incompatibilities if validation is weak.  
   Source: [Tools schema rules](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md)

4. **Extension support fragmentation**  
   Extensions are opt-in and unevenly implemented across clients.  
   Source: [Extension support matrix](https://modelcontextprotocol.io/extensions/client-matrix.md)

5. **Registry metadata vs runtime truth**  
   Registry says "installable", runtime may still fail due to env/auth/network assumptions.  
   Sources: [Registry](https://modelcontextprotocol.io/registry/about.md), [Inspector](https://modelcontextprotocol.io/docs/tools/inspector.md)

6. **Security posture variability in community servers**  
   Official reference repo explicitly warns examples are educational, not production-ready.  
   Source: [Servers README warning](https://raw.githubusercontent.com/modelcontextprotocol/servers/main/README.md)

## 5) Top 10 Practices We Can Adopt Directly

### P1. Capability contract template (required)
- Define a machine-readable contract per server: capabilities, transport(s), auth mode, schema dialect, supported protocol versions.
- Why: removes "it works on my host" ambiguity early.
- Template fields: `server_id`, `protocol_versions`, `transports`, `capabilities`, `extensions`, `auth`, `limits`, `breaking_policy`.
- Sources: [Tools spec](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md), [Versioning](https://modelcontextprotocol.io/specification/versioning.md)

### P2. Compatibility matrix gate (CI)
- Build a matrix test across at least two transports and two protocol versions where possible.
- Hard fail if `tools/list` or schema validation regresses.
- Source: [Transports](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports.md)

### P3. Discovery dual-check
- Pre-runtime check (registry metadata) + runtime check (`tools/list`) before enabling a server for production traffic.
- Source: [Registry](https://modelcontextprotocol.io/registry/about.md), [Tools list](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md)

### P4. Tool naming and collision policy
- Enforce a naming convention and collision linter in gateway/aggregator contexts.
- Recommend `<namespace>.<domain>.<action>` mapping for externally sourced tools.
- Source: [Tool name guidance](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md)

### P5. Schema-first validation + strict fail modes
- Validate tool input/output schema on both server and client side.
- Treat schema violations as compatibility defects, not runtime noise.
- Source: [Tools outputSchema and validation](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md)

### P6. Version strategy (calendar-version aware)
- Adopt explicit support window: `current`, `current-1` protocol revisions.
- Document fallback behavior and deprecation timeline.
- Source: [Versioning model](https://modelcontextprotocol.io/specification/versioning.md)

### P7. Transport hardening baseline
- For remote mode, enforce Origin checks, localhost bind defaults when local, session handling, and protocol-version header checks.
- Source: [Transport security requirements](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports.md)

### P8. Security permission profile per tool
- Classify each tool as read/write/privileged and require human confirmation for sensitive actions.
- Source: [Tools security guidance](https://modelcontextprotocol.io/specification/2025-11-25/server/tools.md)

### P9. Conformance + tier-aligned release process
- Use MCP conformance tests as release gate; map issue labels and response SLAs to tier targets.
- Source: [SDK tiering and conformance](https://modelcontextprotocol.io/community/sdk-tiers.md)

### P10. Inspector-driven integration test pack
- Standardize "inspect before publish": connectivity, capability negotiation, edge-case input, concurrent operations.
- Source: [MCP Inspector workflow](https://modelcontextprotocol.io/docs/tools/inspector.md)

## 6) Immediate Action Plan for Our Team

### Week 1
- Freeze protocol baseline (`2025-11-25`) and publish internal capability contract template.
- Build minimal compatibility matrix for `stdio` + `streamable HTTP`.

### Week 2
- Add discovery dual-check pipeline (registry metadata validation + runtime `tools/list` smoke test).
- Add tool naming collision linter for gateway/aggregator projects.

### Week 3
- Ship schema strict mode and error taxonomy (protocol error vs tool execution error).
- Run inspector-based certification on all candidate servers before enablement.

### Week 4
- Publish version/deprecation policy and release checklist aligned with SDK tiering concepts.
- Establish monthly re-scan job using this CSV schema for trend diffs.

---

Reference data table: `w2_mcp_ecosystem_map.csv`
