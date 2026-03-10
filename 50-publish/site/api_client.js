const STORAGE_API_BASE = "owl.portal.apiBase";

function inferDefaultApiBase() {
  const h = (typeof window !== "undefined" && window.location && window.location.hostname) || "";
  if (h === "localhost" || h === "127.0.0.1") return "http://127.0.0.1:8800";
  return "";
}

export function getApiBase() {
  try {
    const url = new URL(window.location.href);
    const qp = url.searchParams.get("apiBase");
    if (qp) return qp;
  } catch (_e) {
    // ignore
  }
  return localStorage.getItem(STORAGE_API_BASE) || inferDefaultApiBase();
}

export function setApiBase(next) {
  if (!next) localStorage.removeItem(STORAGE_API_BASE);
  else localStorage.setItem(STORAGE_API_BASE, next);
}

export async function postJson(path, payload) {
  const base = getApiBase();
  if (!base) {
    const err = new Error("API base is not configured");
    // @ts-ignore
    err.code = "NO_API_BASE";
    throw err;
  }
  const url = base.replace(/\/+$/, "") + path;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload || {}),
  });
  const text = await res.text();
  let data = null;
  try {
    data = JSON.parse(text);
  } catch (_e) {
    data = { raw: text };
  }
  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

