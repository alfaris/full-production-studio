#!/usr/bin/env bash
# Full Production Studio — copy skills into your AI agents' skills folders.
#   ./scripts/install.sh                          # every agent found on this machine
#   ./scripts/install.sh claude cursor            # only these
#   ./scripts/install.sh claude -- yt-script motion-design   # only some skills
#   ./scripts/install.sh --force …                # also replace same-named skills that are NOT from this studio
#
# Folders follow the agents' own docs (see vercel-labs/skills docs/agents.md):
#   claude → ~/.claude/skills    cursor → ~/.cursor/skills    gemini → ~/.gemini/skills
#   agents → ~/.agents/skills    (Codex, Cline, Zed, Warp, Pi … read this shared folder; `codex` is an alias)
#
# Safety: a skill folder that already exists is only replaced if it carries this studio's marker file.
# Your own skills with the same name (e.g. your own `captions`) are skipped unless you pass --force.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MARKER=".full-production-studio"

declare -A TARGETS=(
  [claude]="$HOME/.claude/skills"
  [cursor]="$HOME/.cursor/skills"
  [gemini]="$HOME/.gemini/skills"
  [agents]="$HOME/.agents/skills"
  [codex]="$HOME/.agents/skills"
)

agents=(); skills=(); mode=agents; force=0
for a in "$@"; do
  case "$a" in
    --force) force=1; continue ;;
    --) mode=skills; continue ;;
  esac
  if [[ $mode == agents ]]; then agents+=("$a"); else skills+=("$a"); fi
done

if [[ ${#agents[@]} -eq 0 ]]; then
  for a in claude cursor gemini; do [[ -d "$(dirname "${TARGETS[$a]}")" ]] && agents+=("$a"); done
  agents+=(agents)   # shared folder read by Codex and many other agents
fi
if [[ ${#skills[@]} -eq 0 ]]; then
  for d in "$ROOT"/skills/*/; do skills+=("$(basename "$d")"); done
fi

declare -A done_dest=()
skipped=0
for a in "${agents[@]}"; do
  dest="${TARGETS[$a]:-}"
  [[ -z $dest ]] && { echo "Unknown agent '$a' (use: claude cursor gemini agents codex)"; exit 1; }
  [[ -n "${done_dest[$dest]:-}" ]] && continue   # codex and agents share a folder
  done_dest[$dest]=1
  mkdir -p "$dest"
  n=0
  for s in "${skills[@]}"; do
    [[ -f "$ROOT/skills/$s/SKILL.md" ]] || { echo "  ! no skill named $s"; continue; }
    target="$dest/$s"
    if [[ -e "$target" && ! -f "$target/$MARKER" && $force -eq 0 ]]; then
      echo "  ! kept your existing '$s' in $dest (not from this studio; use --force to replace it)"
      skipped=$((skipped + 1)); continue
    fi
    rm -rf "${target:?}"
    cp -R "$ROOT/skills/$s" "$target"
    echo "Installed by Full Production Studio. Safe to delete or update with scripts/install.sh." > "$target/$MARKER"
    n=$((n + 1))
  done
  echo "✓ $n skills → $dest"
done
[[ $skipped -gt 0 ]] && echo "Skipped $skipped existing skill(s) that are not from this studio."
echo "Restart your agent to load the new skills."
