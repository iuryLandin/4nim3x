const player = get.Id('player')

listen('keydown', keybFunc)
listen('input', changeVol)

$('.play-pause').click(playPause)
$('.fullscreen').click(toogleFS)
$('.vol-contrl').click(toogleAudio)
$('.add-10-sec').click(addTenSec)
$('.back-5-sec').click(backTwoSec)
$('.playr-seek').click(seekVideo)

/**
 * Função que é executada ao pressionar de qualquer tecla na DOM
 * @param {Object} param0 
 */
function keybFunc({ code, target }) {
  // get from control's list the action linked to the key pressed
  control = controls[code]
  // run the code if any were found.
  if (control) control(target)

  get.Id('vol-slider').value = player.volume * 100
}

/**
 * Função que modifica o estado de reprodução do video
 */
function playPause() {
  if (player.paused)
    player.play()
  else
    player.pause()
}

/**
 * Função que coloca o player em tela cheia ao clicar
 */
function toogleFS() {
  if (d.fullscreenElement)
    d.exitFullscreen()
  else
    d.body.requestFullscreen()
}

/**
 * função que muta e desmuta o video
 */
function toogleAudio() {
  player.muted = !player.muted
}

/**
 * função que adiciona 10s ao player de video
 */
function addTenSec() {
  player.currentTime += parseFloat( 10.0 )
}

function backTwoSec() {
  player.currentTime -= parseFloat(  5.0 )
}

function seekVideo({ offsetX: clickX }) {
  const { offsetWidth: barLength } = get.Id('progress-bar')
  const { duration } = player
  player.currentTime = clickX / barLength * duration
}

function changeVol() {
  const { value } = get.Id('vol-slider')

  player.volume = value / 100
}
