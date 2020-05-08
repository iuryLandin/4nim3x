const controls = {
  Space(target) {
    if (target.id != 'player') {
      if (player.paused)
        player.play()
      else
        player.pause()
    }
  },
  ArrowRight() {
    player.currentTime += parseFloat( 10.0 )
  },
  ArrowLeft() {
    player.currentTime -= parseFloat(  2.5 )
  },
  ArrowUp() {
    if (player.volume < 0.94 )
      player.volume += parseFloat( 1/20 )
    else
      player.volume = parseFloat( 1 )
  },
  ArrowDown() {
    if (player.volume > 0.05 )
      player.volume -= parseFloat( 1/20 )
    else
      player.volume = parseFloat( 0 )
  },
  KeyF() {
    if (d.fullscreenElement)
      d.exitFullscreen()
    else
      d.body.requestFullscreen()
  },
  KeyM() {
    player.muted = !player.muted
  }
}