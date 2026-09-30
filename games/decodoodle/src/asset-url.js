var scriptUrl = new URL(document.currentScript.src)
// The platform supplies a base for published games. In the dev harness,
// bundles live under dist/ while the game's assets are served one level up.
var assetRoot = document.querySelector('base[href]')
  ? new URL(document.baseURI)
  : new URL(/\/dist\/[^/]*$/.test(scriptUrl.pathname) ? '../' : './', scriptUrl)

export function assetUrl(path) {
  return new URL(path, assetRoot).href
}
