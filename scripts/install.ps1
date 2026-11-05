# Full Production Studio — copy skills into your AI agents' skills folders (Windows).
#   .\scripts\install.ps1                          # every agent found on this machine
#   .\scripts\install.ps1 -Agent claude,cursor     # only these
#   .\scripts\install.ps1 -Agent claude -Skill yt-script,motion-design
#   .\scripts\install.ps1 -Force                   # also replace same-named skills that are NOT from this studio
#
# Folders follow the agents' own docs (see vercel-labs/skills docs/agents.md):
#   claude -> ~\.claude\skills   cursor -> ~\.cursor\skills   gemini -> ~\.gemini\skills
#   agents -> ~\.agents\skills   (Codex, Cline, Zed, Warp, Pi ... read this shared folder; 'codex' is an alias)
#
# Safety: an existing skill folder is only replaced if it carries this studio's marker file.
param(
  [string[]]$Agent = @(),
  [string[]]$Skill = @(),
  [switch]$Force
)
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$Marker = '.full-production-studio'
$Targets = @{
  claude = Join-Path $HOME '.claude\skills'
  cursor = Join-Path $HOME '.cursor\skills'
  gemini = Join-Path $HOME '.gemini\skills'
  agents = Join-Path $HOME '.agents\skills'
  codex  = Join-Path $HOME '.agents\skills'
}

if ($Agent.Count -eq 0) {
  $Agent = @('claude','cursor','gemini') | Where-Object { Test-Path (Split-Path -Parent $Targets[$_]) }
  $Agent += 'agents'
}
if ($Skill.Count -eq 0) {
  $Skill = Get-ChildItem (Join-Path $Root 'skills') -Directory | ForEach-Object Name
}

$done = @{}
$skipped = 0
foreach ($a in $Agent) {
  if (-not $Targets.ContainsKey($a)) { throw "Unknown agent '$a' (use: claude, cursor, gemini, agents, codex)" }
  $dest = $Targets[$a]
  if ($done.ContainsKey($dest)) { continue }   # codex and agents share a folder
  $done[$dest] = $true
  New-Item -ItemType Directory -Force $dest | Out-Null
  $n = 0
  foreach ($s in $Skill) {
    $src = Join-Path $Root "skills\$s"
    if (-not (Test-Path (Join-Path $src 'SKILL.md'))) { Write-Warning "no skill named $s"; continue }
    $target = Join-Path $dest $s
    if ((Test-Path $target) -and -not (Test-Path (Join-Path $target $Marker)) -and -not $Force) {
      Write-Warning "kept your existing '$s' in $dest (not from this studio; use -Force to replace it)"
      $skipped++; continue
    }
    if (Test-Path $target) { Remove-Item -Recurse -Force -LiteralPath $target }
    Copy-Item -Recurse $src $target
    Set-Content -LiteralPath (Join-Path $target $Marker) -Value 'Installed by Full Production Studio. Safe to delete or update with scripts\install.ps1.'
    $n++
  }
  Write-Host "OK: $n skills -> $dest"
}
if ($skipped -gt 0) { Write-Host "Skipped $skipped existing skill(s) that are not from this studio." }
Write-Host 'Restart your agent to load the new skills.'
