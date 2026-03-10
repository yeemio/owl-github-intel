#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


REPO_ROOT = Path(__file__).resolve().parents[2]
INTEL_CORE_PATH = REPO_ROOT / "packages" / "intel_core"


def load_intel_core():
    import sys

    if str(INTEL_CORE_PATH) not in sys.path:
        sys.path.insert(0, str(INTEL_CORE_PATH))
    from intel_core import IntelStore, analyze_inventory, recommend_by_intent, render_markdown  # type: ignore
    from intel_core.rank import Constraints  # type: ignore

    return IntelStore, analyze_inventory, recommend_by_intent, render_markdown, Constraints


IntelStore, analyze_inventory, recommend_by_intent, render_markdown, Constraints = load_intel_core()
STORE = IntelStore(REPO_ROOT)


def _read_json(handler: BaseHTTPRequestHandler) -> dict:
    length = int(handler.headers.get("Content-Length") or "0")
    raw = handler.rfile.read(length) if length > 0 else b"{}"
    if not raw:
        return {}
    return json.loads(raw.decode("utf-8"))


def _write_json(handler: BaseHTTPRequestHandler, status: int, payload: dict) -> None:
    data = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(data)))
    handler.end_headers()
    handler.wfile.write(data)


def _cors(handler: BaseHTTPRequestHandler) -> None:
    handler.send_header("Access-Control-Allow-Origin", "*")
    handler.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    handler.send_header("Access-Control-Allow-Headers", "Content-Type")


def _append_submission(repo_or_url: str) -> str:
    # MVP: append to CSV with monotonic-ish id.
    path = REPO_ROOT / "data" / "db" / "submissions.csv"
    path.parent.mkdir(parents=True, exist_ok=True)
    ts = int(time.time())
    submission_id = f"S{ts}"
    line = f"{submission_id},{repo_or_url},{time.strftime('%Y-%m-%d')},queued,\n"
    with path.open("a", encoding="utf-8", newline="\n") as f:
        f.write(line)
    return submission_id


class Handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(204)
        _cors(self)
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/health":
            self.send_response(200)
            _cors(self)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(b'{"ok":true}')
            return

        _write_json(self, 404, {"error": "not_found"})

    def do_POST(self):
        parsed = urlparse(self.path)
        try:
            if parsed.path == "/recommend":
                body = _read_json(self)
                query = (body.get("query") or "").strip()
                c = body.get("constraints") or {}
                constraints = Constraints(
                    lane=(c.get("lane") or None),
                    license_deny=(c.get("license_deny") or None),
                    risk_tolerance=(c.get("risk_tolerance") or None),
                )
                report = recommend_by_intent(STORE, query=query, constraints=constraints)
                md = render_markdown(report)
                self.send_response(200)
                _cors(self)
                _write_json(self, 200, {"report": report.to_dict(), "markdown": md})
                return

            if parsed.path == "/analyze/inventory":
                body = _read_json(self)
                repos = body.get("repos") or []
                if not isinstance(repos, list):
                    _write_json(self, 400, {"error": "repos must be a list"})
                    return
                report = analyze_inventory(STORE, [str(x) for x in repos])
                md = render_markdown(report)
                _write_json(self, 200, {"report": report.to_dict(), "markdown": md})
                return

            if parsed.path == "/submit":
                body = _read_json(self)
                repo_or_url = (body.get("repo_or_url") or "").strip()
                if not repo_or_url:
                    _write_json(self, 400, {"error": "repo_or_url required"})
                    return
                sid = _append_submission(repo_or_url)
                _write_json(self, 200, {"submission_id": sid, "status": "queued"})
                return

            _write_json(self, 404, {"error": "not_found"})
        except Exception as e:
            _write_json(self, 500, {"error": "internal_error", "message": str(e)})

    def log_message(self, fmt: str, *args) -> None:
        # Keep logs minimal.
        return


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--host", default="127.0.0.1")
    ap.add_argument("--port", type=int, default=8800)
    args = ap.parse_args()

    server = ThreadingHTTPServer((args.host, args.port), Handler)
    print(f"intel_api listening on http://{args.host}:{args.port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

