import { getters, mutations } from './player/states/Controls.js'

const vidContainer = get.Id('video-container')

const SHOW_CONTROLS = 'show-controls'

const playerView = $('.player-view')
const controlBar = $('#controls')

const TIME_HIDE_CNTRLS = 2500
const TIME_PRVT_MOBILE = 75

const showPlayerView = () => { playerView.show() }

import './player/updateVideoView.js'
import './player/controls.js'
import './player/player.js'

listen('mousemove', showControls, vidContainer)
listen(  'click'  , showControls, vidContainer)

function showControls() {
  // clear the last timeout to prevent the controlsBar to close
  // while mouse is moving
  let id = getters.getCtrlState()
  clearTimeout(id)
  
  // show the controlsBar
  controlBar.addClass(SHOW_CONTROLS)

  setTimeout(showPlayerView, TIME_PRVT_MOBILE)

  // activate a timeout and save its id to hide the controls
  id = setTimeout(hideControls, TIME_HIDE_CNTRLS)
  mutations.setCtrlState(id)
}

/**
 * Function with the responsability to hide controlsbar
 * and the play/pause div
 */
function hideControls() {
  controlBar.removeClass(SHOW_CONTROLS)
  playerView.hide()
}

const i = Math.ceil( Math.random() * 9 )
player.poster = `static/poster-${i}.jpg`

export default showControls