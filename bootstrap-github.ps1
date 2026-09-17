param(
  [string]$Repo = "worasetrs/shangrila-architecture-workflow",
  [ValidateSet("private","public")][string]$Visibility = "private"
)

$ErrorActionPreference = "Stop"
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  Write-Host "GitHub CLI (gh) is not installed. Install it, then run: gh auth login" -ForegroundColor Yellow
  exit 1
}

gh auth status
if ($LASTEXITCODE -ne 0) { throw "GitHub CLI is not authenticated. Run: gh auth login" }

$visibilityFlag = if ($Visibility -eq "public") { "--public" } else { "--private" }

gh repo create $Repo $visibilityFlag --source . --remote origin --push
if ($LASTEXITCODE -ne 0) { throw "Repository creation/push failed." }

Write-Host "Created and pushed: https://github.com/$Repo" -ForegroundColor Green
