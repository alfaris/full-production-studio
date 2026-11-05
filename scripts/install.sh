#!/usr/bin/env bash
# Full Production Studio — copy skills into your AI agents' skills folders.
#   ./scripts/install.sh                 # every agent found on this machine
#   ./scripts/install.sh claude codex    # only these
#   ./scripts/install.sh claude -- yt-script motion-design   # only some skills
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

declare -A TARGETS=(
  [claude]="$HOME/.claude/skills"
  [codex]="$HOME/.codex/skills"
  [agents]="$HOME/.agents/skills"
  [gemini]="$HOME/.gemini/skills"
)

agents=(); skills=(); mode=agents
for a in "$@"; do
  if [[ $a == "--" ]]; then mode=skills; continue; fi
  if [[ $mode == agents ]]; then agents+=("$a"); else skills+=("$a"); fi
done

if [[ ${#agents[@]} -eq 0 ]]; then
  for a in claude codex gemini; do [[ -d "$(dirname "${TARGETS[$a]}")" ]] && agents+=("$a"); done
  agents+=(agents)   # shared ~/.agents/skills folder read by several tools
fi
if [[ ${#skills[@]} -eq 0 ]]; then
  for d in "$ROOT"/skills/*/; do skills+=("$(basename "$d")"); done
fi

for a in "${agents[@]}"; do
  dest="${TARGETS[$a]:-}"
  [[ -z $dest ]] && { echo "Unknown agent '$a' (use: ${!TARGETS[*]})"; exit 1; }
  mkdir -p "$dest"
  for s in "${skills[@]}"; do
    [[ -f "$ROOT/skills/$s/SKILL.md" ]] || { echo "  ! no skill named $s"; continue; }
    rm -rf "${dest:?}/${s:?}"
    cp -R "$ROOT/skills/$s" "$dest/$s"
  done
  echo "✓ ${#skills[@]} skills → $dest"
done
echo "Restart your agent to load the new skills."
