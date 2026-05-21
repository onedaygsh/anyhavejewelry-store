$ErrorActionPreference = "Stop"

$ApiToken = 'qvF1nUibg50RAm2bfwzlKHRZkz7joaU5wfjq0nZO95b65f82'
$Domain = 'anyhavejewelry.com'
$Username = 'u319294541'
$BaseUrl = 'https://developers.hostinger.com'
$FilePath = 'anyhave-site.zip'
$ArchiveName = 'anyhave-site.zip'

if (-not (Test-Path $FilePath)) {
    Write-Error "Archive not found: $FilePath. Run 'npm run build' and 'npm run archive' first."
    exit 1
}

Write-Host "Fetching upload credentials..."
$credsUrl = "$BaseUrl/api/hosting/v1/files/upload-urls"
$body = @{ username = $Username; domain = $Domain } | ConvertTo-Json -Compress
$headers = @{
    Authorization = "Bearer $ApiToken"
    'Content-Type' = 'application/json'
}
$creds = Invoke-RestMethod -Uri $credsUrl -Method Post -Body $body -Headers $headers

$uploadBase = $creds.url.TrimEnd('/')
$auth = $creds.auth_key
$authRest = $creds.rest_auth_key

Write-Host "Upload base: $uploadBase"

# POST create resource
Write-Host "Creating upload resource..."
$postUrl = "$uploadBase/$ArchiveName`?override=true"
$postHeaders = @{
    'X-Auth' = $auth
    'X-Auth-Rest' = $authRest
    'upload-length' = (Get-Item $FilePath).Length.ToString()
}
$response = Invoke-WebRequest -Uri $postUrl -Method Post -Headers $postHeaders
$location = $response.Headers['Location']
if (-not $location) { $location = "$uploadBase/$ArchiveName" }
# If location is relative path, prepend the base URL
if ($location -notmatch '^https?://') {
    $baseUri = [System.Uri]$uploadBase
    $location = (New-Object System.Uri($baseUri, $location)).AbsoluteUri
}
Write-Host "Resource created (201), Location: $location"

# PATCH upload file
Write-Host "Uploading $ArchiveName ($((Get-Item $FilePath).Length) bytes)..."
$patchUrl = $location

[System.Net.ServicePointManager]::DefaultConnectionLimit = 10

$webClient = New-Object System.Net.WebClient
$webClient.Headers.Add('X-Auth', $auth)
$webClient.Headers.Add('X-Auth-Rest', $authRest)
$webClient.Headers.Add('upload-offset', '0')
$webClient.Headers.Add('Content-Type', 'application/offset+octet-stream')

# Set timeout via reflection
$property = $webClient.GetType().GetProperty('Timeout', [System.Reflection.BindingFlags]::Instance -bor [System.Reflection.BindingFlags]::NonPublic)
if ($property) {
    $property.SetValue($webClient, 600000)
    Write-Host "Timeout set to 10 minutes"
}

$webClient.UploadFile($patchUrl, 'PATCH', $FilePath)
Write-Host "Upload successful!"

# Trigger deploy
Write-Host "Triggering deployment..."
$deployUrl = "$BaseUrl/api/hosting/v1/accounts/$Username/websites/$Domain/deploy"
$deployBody = @{ archive_path = $ArchiveName } | ConvertTo-Json -Compress
$deployHeaders = @{
    Authorization = "Bearer $ApiToken"
    'Content-Type' = 'application/json'
}
$result = Invoke-RestMethod -Uri $deployUrl -Method Post -Body $deployBody -Headers $deployHeaders
Write-Host "Deploy triggered: $($result.message)"
