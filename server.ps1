$root = "c:\Users\lorda\.gemini\antigravity\scratch\livraison site com"
$port = 3000

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  Serveur SnackExpress demarre !" -ForegroundColor Green
Write-Host "  Ouvre : http://localhost:$port" -ForegroundColor Yellow
Write-Host "  Appuie Ctrl+C pour arreter" -ForegroundColor Red
Write-Host "======================================" -ForegroundColor Cyan

while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $resp = $ctx.Response

    $path = $req.Url.LocalPath
    if ($path -eq "/") { $path = "/index.html" }

    $file = Join-Path $root $path.TrimStart("/")

    if (Test-Path $file -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($file)
        $ext = [System.IO.Path]::GetExtension($file).ToLower()
        $mime = switch ($ext) {
            ".html" { "text/html; charset=utf-8" }
            ".css"  { "text/css" }
            ".js"   { "application/javascript" }
            ".png"  { "image/png" }
            ".jpg"  { "image/jpeg" }
            ".ico"  { "image/x-icon" }
            default { "application/octet-stream" }
        }
        $resp.ContentType = $mime
        $resp.ContentLength64 = $bytes.Length
        $resp.OutputStream.Write($bytes, 0, $bytes.Length)
        Write-Host "  OK  $path" -ForegroundColor Green
    } else {
        $resp.StatusCode = 404
        Write-Host "  404 $path" -ForegroundColor Red
    }

    $resp.Close()
}
