param(
  [int]$BasePort = 43173,
  [switch]$NoOpen
)

$ErrorActionPreference = 'Stop'

function Test-PortAvailable {
  param([int]$Port)

  $listener = $null

  try {
    $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
    $listener.Start()
    return $true
  } catch {
    return $false
  } finally {
    if ($listener) {
      $listener.Stop()
    }
  }
}

function Get-LaunchPort {
  param([int]$PreferredPort)

  $candidatePorts = @(
    $PreferredPort,
    43189,
    43217,
    43237,
    43261,
    43313,
    43337
  ) + (1..20 | ForEach-Object { $PreferredPort + $_ })

  foreach ($port in ($candidatePorts | Select-Object -Unique)) {
    if (Test-PortAvailable -Port $port) {
      return $port
    }
  }

  throw "No available port found. Close the existing dev server or pass a new -BasePort value."
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Resolve-Path $scriptDir
$frontendDir = Join-Path $repoRoot 'frontend'
$nodeModulesDir = Join-Path $frontendDir 'node_modules'

if (-not (Test-Path (Join-Path $frontendDir 'package.json'))) {
  throw "Cannot find frontend\\package.json. Script location looks wrong: $repoRoot"
}

$npmCommand = Get-Command npm.cmd -ErrorAction SilentlyContinue
if (-not $npmCommand) {
  throw "Cannot find npm.cmd. Please install Node.js and make sure npm is available in PATH."
}

if (-not (Test-Path $nodeModulesDir)) {
  Write-Host "[info] frontend dependencies not found. Running npm install ..." -ForegroundColor Yellow
  Push-Location $frontendDir
  try {
    & $npmCommand.Source install
  } finally {
    Pop-Location
  }
}

$launchPort = Get-LaunchPort -PreferredPort $BasePort
$launchArgs = @('run', 'dev', '--', '--host', '127.0.0.1', '--port', $launchPort, '--strictPort', 'false')

if (-not $NoOpen) {
  $launchArgs += '--open'
}

Write-Host "[info] Starting Skill Preflight Panel ..." -ForegroundColor Cyan
Write-Host "[info] Preferred port: $BasePort, launch port: $launchPort" -ForegroundColor Cyan
Write-Host "[info] Frontend directory: $frontendDir" -ForegroundColor DarkGray
Write-Host "[info] Press Ctrl+C to stop the dev server." -ForegroundColor DarkGray

Push-Location $frontendDir
try {
  & $npmCommand.Source @launchArgs
} finally {
  Pop-Location
}
