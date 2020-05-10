const videoContainer = get.Id('video-container')
let hideCtrls

listen('mousemove', showAndHideControls, videoContainer)
listen(  'click'  , showAndHideControls, videoContainer)

function showAndHideControls() {
  // clear the last timeout to prevent the controlsBar to close
  clearTimeout(hideCtrls)
  
  // show the controlsBar
  $('#controls').addClass('show-controls')

  // shows the div that control the play/pause
  // event when clicking at the player-view
  //
  // Obs: This timeout is used to guarantee that
  // mobile users don't pause instantly at click
  setTimeout(a => $('.player-view').show(), 50)

  // activate a timeout and save its id to hide the controlsBar
  hideCtrls = setTimeout(hideControls, 2500)
}

/**
 * Function with the responsability to hide the controlsbar
 * and the play/pause div
 */
function hideControls() {
  $('#controls').removeClass('show-controls')
  $('.player-view').hide()
}

// get the url to be loaded from a query param at the URL
// and apply it at the page.
(function loadUrl() {
  const { url } = get.UrlData()
  player.src = url
})()