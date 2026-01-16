# 프로젝트 재구성 후 정리 스크립트

Write-Host "프로젝트 재구성 정리 시작..." -ForegroundColor Green

# 1. hooks 폴더에서 사용하지 않는 기존 파일들 삭제
Write-Host "`n[1/2] 기존 hooks 파일들 삭제 중..." -ForegroundColor Yellow
$hooksToRemove = @(
    ".\src\hooks\useClickOutside.ts",
    ".\src\hooks\useDebounce.ts",
    ".\src\hooks\useIsMounted.ts",
    ".\src\hooks\useLocalStorage.ts",
    ".\src\hooks\useMediaQuery.ts",
    ".\src\hooks\usePrevious.ts"
)

foreach ($file in $hooksToRemove) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  삭제됨: $file" -ForegroundColor Gray
    }
}

# 2. components/common 폴더에서 사용하지 않는 기존 파일들 삭제
Write-Host "`n[2/2] 기존 components 파일들 삭제 중..." -ForegroundColor Yellow
$componentsToRemove = @(
    ".\src\components\common\Button.tsx",
    ".\src\components\common\Button.css",
    ".\src\components\common\Loading.tsx",
    ".\src\components\common\Loading.css"
)

foreach ($file in $componentsToRemove) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  삭제됨: $file" -ForegroundColor Gray
    }
}

Write-Host "`n정리 완료!" -ForegroundColor Green
Write-Host "`n재구성 결과:" -ForegroundColor Cyan
Write-Host "  ✅ hooks: 6개 파일 → 4개 그룹 파일로 통합" -ForegroundColor White
Write-Host "  ✅ layouts/MainLayout: Header/, Sidebar/, Footer/ 서브폴더 구조" -ForegroundColor White
Write-Host "  ✅ components/common: Button/, Loading/ 폴더 구조" -ForegroundColor White
Write-Host "  ✅ constants: 5개 목적별 파일로 분리" -ForegroundColor White
