const updateVideoView = () => {
  const { paused, muted, progress, volume } = getVideoState()

  $('#progress').width(progress)
  $('.vol-active').width(`${85 - ((volume * 100)-(volume*15))}px`)
  $('#play-btn').text(paused ? 'play_arrow':'pause')

  if (!volume) 
    $('#volume').text('volume_mute')
  else
    $('#volume').text((volume > 0.5) ? 'volume_up':'volume_down')
  if (muted)
    $('#volume').text('volume_off')

  requestAnimationFrame(updateVideoView)
}

/**
 * Função que coleta e organiza as informações do estado do player de video
 * @returns {{ paused: Boolean, muted: Boolean, progress: String, volume: Number }}
 */
function getVideoState() {
  // Pega as informações do estado do player de vídeo
  const {
    currentTime,
    duration,
    paused,
    volume,
    muted
  } = player

  // converte o tempo em milissegundos para porcentagem assistida
  const progress = `${( (currentTime / duration) * 100).toFixed(2)}%`

  // retorna os dados do video dentro de um objeto para modificar a view
  return { paused, muted, progress, volume }
}

updateVideoView()