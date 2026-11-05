# Full Production Studio — copy skills into your AI agents' skills folders (Windows).
#   .\scripts\install.ps1                          # every agent found on this machine
#   .\scripts\install.ps1 -Agent claude,codex      # only these
#   .\scripts\install.ps1 -Agent claude -Skill yt-script,motion-design
param(
  [string[]]$Agent = @(),
  [string[]]$Skill = @()
)
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$Targets = @{
  claude = Join-Path $HOME '.claude\skills'
  codex  = Join-Path $HOME '.codex\skills'
  agents = Join-Path $HOME '.agents\skills'
  gemini = Join-Path $HOME '.gemini\skills'
}

if ($Agent.Count -eq 0) {
  $Agent = @('claude','codex','gemini') | Where-Object { Test-Path (Split-Path -Parent $Targets[$_]) }
  $Agent += 'agents'
}
if ($Skill.Count -eq 0) {
  $Skill = Get-ChildItem (Join-Path $Root 'skills') -Directory | ForEach-Object Name
}

foreach ($a in $Agent) {
  if (-not $Targets.ContainsKey($a)) { throw "Unknown agent '$a' (use: $($Targets.Keys -join ', '))" }
  $dest = $Targets[$a]
  New-Item -ItemType Directory -Force $dest | Out-Null
  foreach ($s in $Skill) {
    $src = Join-Path $Root "skills\$s"
    if (-not (Test-Path (Join-Path $src 'SKILL.md'))) { Write-Warning "no skill named $s"; continue }
    $target = Join-Path $dest $s
    if (Test-Path $target) { Remove-Item -Recurse -Force -LiteralPath $target }
    Copy-Item -Recurse $src $target
  }
  Write-Host "OK: $($Skill.Count) skills -> $dest"
}
Write-Host 'Restart your agent to load the new skills.'
