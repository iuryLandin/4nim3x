
const volSlider = get.Id('vol-slider')
const player    = get.Id('player')

listen('keydown', keybFunc)
listen( 'input', changeVol)

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
  $('#vol-slider').val(player.volume * 100)
}

function changeVol() {
  // prevents the controls from hide while the volume is modified
  showAndHideControls()

  // get the current input value at the volume slider
  const { value } = volSlider

  // apply the value to the player
  player.volume = value / 100
}
