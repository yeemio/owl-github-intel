function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function highlightText(content, query) {
  const text = escapeHtml(content);
  const q = (query || "").trim();
  if (!q) return text;

  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${escaped})`, "gi");
  return text.replace(re, "<mark>$1</mark>");
}

export function ensureControlBar(id) {
  let node = document.getElementById(id);
  if (!node) {
    node = document.createElement("div");
    node.id = id;
    node.className = "search-controls";
    const hint = document.getElementById("searchHint");
    hint?.after(node);
  }
  return node;
}

export function ensureStatusNode(id) {
  let node = document.getElementById(id);
  if (!node) {
    node = document.createElement("div");
    node.id = id;
    node.className = "status-banner";
    const controls = document.getElementById("search-controls");
    if (controls) {
      controls.after(node);
    } else {
      const hint = document.getElementById("searchHint");
      hint?.after(node);
    }
  }
  return node;
}

export function setStatus(id, text, type) {
  const node = ensureStatusNode(id);
  node.textContent = text;
  node.dataset.type = type || "ready";
}

export function renderLinks(targetId, items, options) {
  const root = document.getElementById(targetId);
  if (!root) return;
  root.innerHTML = "";
  const lang = options.lang;
  const query = options.query || "";
  const itemClass = options.itemClass || "link-item";

  items.forEach((item) => {
    const href = typeof item.href === "string" ? item.href : item.href[lang];
    const a = document.createElement("a");
    a.href = href;
    a.className = itemClass;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.dataset.search = item.searchable || "";
    a.dataset.theme = item.theme || "";
    a.dataset.tags = (item.tags || []).join(",");

    const title = highlightText(item[lang][0], query);
    const desc = highlightText(item[lang][1], query);
    a.innerHTML = `${title}<small>${desc}</small>`;
    root.appendChild(a);
  });
}
