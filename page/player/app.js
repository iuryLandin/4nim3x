const videoContainer = get.Id('video-container')
const { url } = get.UrlData()
var hoverControls

listen('mousemove', showHideControls, videoContainer)

player.src = url

function showHideControls() {
  clearTimeout(hoverControls)
  get.Id('controls').classList.add('show-controls')
  hoverControls = setTimeout(hideControls, 1500)
}

function hideControls() {
  get.Id('controls').classList.remove('show-controls')
}