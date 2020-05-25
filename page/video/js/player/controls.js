import { get, listen } from '../../../../js/utils/CzarK.js'
import showControls from '../player.js'

const videoContnr = get.Id('video-container')
const progressBar = get.Id('progress-bar')
const volSlider   = get.Id('vol-slider')
const player = get.Id('player')

$('.back-5-sec').click(rtrnFiveSec)
$('.vol-contrl').click(toogleMute)
$('.playr-seek').click(seekVideo)
$('.play-pause').click(playPause)
$('.add-10-sec').click(addTenSec)
$('.fullscreen').click(tgFullScr)

listen('input', changeVol)

const keyboard = {
  ArrowRight: addTenSec,
  ArrowLeft: rtrnFiveSec,
  ArrowDown: decreaseVolume,
  ArrowUp: increaseVolume,
  Space: playPause,
  KeyM: toogleMute,
  KeyF: tgFullScr
}

/**
 * Função que modifica o estado de reprodução do video
 */
function playPause() {
  const { paused } = player 

  if (paused)
    player.play()
  else
    player.pause()
}

/**
 * Function that increase the player volume by 1/20
 */
function increaseVolume() {
  if (player.volume < 0.94 )
    player.volume += parseFloat(1/20)
  else
    player.volume = parseFloat(1)
}

/**
 * Function that descrease the player volume by 1/20
 */
function decreaseVolume() {
  if (player.volume > 0.05 )
    player.volume -= parseFloat(1/20)
  else
    player.volume  = parseFloat(0)
}

/**
 * function that toogle the fullscreen status of the player
 */
function tgFullScr() {
  if (document.fullscreenElement)
    document.exitFullscreen()
  else
    videoContnr.requestFullscreen()
}

/**
 * function that toogle the muted status of the player 
 */
function toogleMute() {
  player.muted = !player.muted
}

/**
 * function that add 10s to the current time of the player
 */
function addTenSec() {
  player.currentTime += parseFloat( 10.0 )
}

/**
 * function that remove 5s to the current time of the player
 */
function rtrnFiveSec() {
  player.currentTime -= parseFloat(  5.0 )
}

/**
 * Function with the responsability of seeking the video playback when the progressbar is clicked
 * @param {{offsetX: Number}} param0 offsetX contains the click position that user clicked
 */
function seekVideo({ offsetX: clickXPos }) {
  // get from the player the current video duration
  const { duration } = player

  // get from the progressBar the current width
  const { offsetWidth: barWidth } = progressBar

  // get the new time 
  const newTime = (clickXPos / barWidth) * duration

  // apply the new time to the player
  player.currentTime = newTime
}

function changeVol() {
  const player = get.Id('player')
  // prevents the controls from hide while the volume is modified
  showControls()

  // get the current input value at the volume slider
  const { value } = volSlider

  // apply the value to the player
  player.volume = value / 100
}

export default keyboard