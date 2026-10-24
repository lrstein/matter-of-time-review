"""The game's local web server (started by tools/start.command).

It serves site/ only, the folder the live site is deployed from. Like `python3 -m http.server`,
but it listens on 127.0.0.1 only, answers only requests addressed to localhost (so a web page
can't reach it through DNS rebinding), and never serves hidden files.
"""
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent.parent / "site"
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
HOSTS = {"localhost:%d" % PORT, "127.0.0.1:%d" % PORT}
BLOCKED = {"image-studio", "node_modules", "tools"}


class Handler(SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass

    def end_headers(self):
        # Always check for a newer file, so an edit (or an update to the game) shows on reload.
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def allowed(self):
        if self.headers.get("Host") not in HOSTS:
            return False
        parts = [p for p in unquote(urlparse(self.path).path).split("/") if p]
        return not any(p.startswith(".") or p in BLOCKED for p in parts)

    def do_GET(self):
        if not self.allowed():
            return self.send_error(404)
        super().do_GET()

    def do_HEAD(self):
        if not self.allowed():
            return self.send_error(404)
        super().do_HEAD()


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", PORT), partial(Handler, directory=str(ROOT)))
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
