import { get } from '../../frameworks/czark.js'

function loadVid(url) {
    const videoPlayer = get.Id('videoPlayer')
    // Adiciona a URL do video ao player
    videoPlayer.src = url

    // Inicia o carregamento do video
    videoPlayer.play()

    //Exibe o vídeo para o usuario
    videoPlayer
        .style
        .display = "block"
}

export default loadVid