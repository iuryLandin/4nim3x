import { listen, get } from '../../../../js/utils/CzarK.js'
import keyboard from './controls.js'

const volumeBar = $('#vol-slider')

listen('keydown', keybFunc)

/**
 * Função que é executada ao pressionar de qualquer tecla na DOM
 * @param {{code: String, target: Element}} param0 
 */
function keybFunc({ code }) {
  // get from control's list the action linked to the key pressed
  const func = keyboard[code]

  // run the code if it exists.
  if (func) func()

  //Update the volume slider position after a key be pressed
  updateVolume()
}

/**
 * Update the volume slider position after a keypress
 */
function updateVolume() {
  const player = get.Id('player')
  volumeBar.val(player.volume * 100)
}
