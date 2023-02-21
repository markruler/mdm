# Update changelog

# Add release tag
$version = (npm pkg get version).Trim()
Write-Output "Tagging release v${version}"
$remote = "origin"
git tag -a v${version} HEAD -m "Release v${version}"
git push ${remote} v${version}
