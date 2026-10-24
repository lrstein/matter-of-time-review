#!/bin/bash
# A Matter of Time: double-click to play.
# Starts a small local web server for site/ (the game needs one to read
# site/content/story.md) and opens the game in your default browser.
# Close this window, or press Ctrl+C, to stop the server.

cd "$(dirname "$0")/.." || exit 1
PORT=8000
# If port 8000 is busy, try the next few.
while lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; do PORT=$((PORT + 1)); done

echo "A Matter of Time is running at http://localhost:$PORT"
echo "Close this window to stop it."
(sleep 1 && open "http://localhost:$PORT") &
exec python3 tools/serve.py "$PORT"
