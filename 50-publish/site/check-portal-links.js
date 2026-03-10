/**
 * Check all portal links return 200 when site is served from REPO ROOT.
 * Run from repo root: node 50-publish/site/check-portal-links.js
 * Requires: start a static server from repo root first, e.g.:
 *   python -m http.server 3765
 *   or: npx serve . -l 3765
 * Then open: http://localhost:3765/50-publish/site/
 */
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || "3765";
const BASE = `http://127.0.0.1:${PORT}/50-publish/site/index.html`;

const DEFAULT_HREFS = [
  "./content/en/overview.html",
  "./content/zh/overview.html",
  "./content/en/research-guide.html",
  "./content/zh/research-guide.html",
  "../PROJECT_OVERVIEW_PUBLIC.md",
  "../../00-index/RESEARCH_TRAIL_MAP.md",
  "../../00-index/START_HERE_7_DAY_PATH.md",
  "../../00-index/HIGH_VALUE_RESEARCH_QUESTIONS.md",
  "./content/en/execution-plan.html",
  "./content/zh/execution-plan.html",
  "./content/en/topic-agent.html",
  "./content/zh/topic-agent.html",
  "./content/en/topic-mcp.html",
  "./content/zh/topic-mcp.html",
  "./content/en/topic-rag.html",
  "./content/zh/topic-rag.html",
  "./content/en/topic-gateway.html",
  "./content/zh/topic-gateway.html",
  "./content/en/topic-eval.html",
  "./content/zh/topic-eval.html",
  "./content/en/topic-security.html",
  "./content/zh/topic-security.html",
  "./content/en/risk-radar.html",
  "./content/zh/risk-radar.html",
  "../../40-insights/risks/upgrade-risk-matrix.md",
  "../../40-insights/risks/master_risk_register_2026-03-09.csv",
  "../../20-normalized/repo_master_latest.csv",
  "../../40-insights/adoption_backlog_latest.md",
  "../../00-index/CHANGELOG.md",
];

const CONTENT_ASSETS = [
  "./content/styles-content.css",
];

function loadConfigHrefs() {
  const configPath = path.join(__dirname, "portal.config.json");
  if (!fs.existsSync(configPath)) return [];
  const raw = fs.readFileSync(configPath, "utf8");
  const config = JSON.parse(raw);
  const hrefs = [];
  if (config.groups && typeof config.groups === "object") {
    for (const items of Object.values(config.groups)) {
      if (!Array.isArray(items)) continue;
      for (const item of items) {
        if (item.href) {
          if (typeof item.href === "string") hrefs.push(item.href);
          else if (item.href.en) hrefs.push(item.href.en);
          if (typeof item.href === "object" && item.href.zh && item.href.zh !== item.href.en)
            hrefs.push(item.href.zh);
        }
      }
    }
  }
  return [...new Set(hrefs)];
}

function resolveUrl(href) {
  return new URL(href, BASE).href;
}

async function check(url, method = "GET") {
  try {
    const res = await fetch(url, { method, redirect: "follow" });
    return { status: res.status, ok: res.ok };
  } catch (e) {
    return { status: "ERR", ok: false, message: e.message };
  }
}

async function main() {
  const allHrefs = [...DEFAULT_HREFS, ...loadConfigHrefs(), ...CONTENT_ASSETS];
  const unique = [...new Set(allHrefs)];

  const results = [];
  for (const href of unique) {
    const url = resolveUrl(href);
    const out = await check(url);
    results.push({ href, url, ...out });
  }

  const failed = results.filter((r) => !r.ok);
  const ok = results.filter((r) => r.ok);

  console.log("Portal link check (serve from repo root, base:", BASE.replace("index.html", ""), ")\n");
  console.log("OK:", ok.length, "| Failed:", failed.length);
  if (failed.length) {
    console.log("\n--- Failed (404 or error) ---");
    failed.forEach((r) => console.log(r.status, r.href, r.message || ""));
  }

  const reportPath = path.join(__dirname, "check-portal-links-report.md");
  const report = [
    "# Portal link check report",
    "",
    "Run from repo root with server: `python -m http.server " + PORT + "` then open http://localhost:" + PORT + "/50-publish/site/",
    "",
    "| Status | Href | URL |",
    "|--------|------|-----|",
    ...results.map((r) => `| ${r.ok ? "OK" : r.status} | ${r.href} | ${r.url} |`),
  ].join("\n");
  fs.writeFileSync(reportPath, report, "utf8");
  console.log("\nReport written to", reportPath);

  process.exit(failed.length ? 1 : 0);
}

main();
