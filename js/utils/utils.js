function loading(status) {
    const loading = $("#loading")
    return (status) ? loading.show() : loading.hide()
}

// Quando for implementar a playlist, lembra de colocar uma chamada pra esse função passando
// o id do episódio pra ela atualizar a playlist com os valores pro episódio atual.
async function setPlaylist(episodeId) {
    // Recebe o id do anime em execução para criação da playlist
    currentAnime = get.Session("currentAnime")

    //pega da session a lista de episodios salva em "setEpsLista()"
    let videos = get.Session(currentAnime)

    //procura a posição do anime atual pra salvar o objeto anterior e o proximo na sessionStorage
    for (let i = 0; i < videos.length; i++){
        if (videos[i].Id == episodeId) {
            set.Session("playlist", {
                previous: videos[i+1],
                next:     videos[i-1],
                "next+1": videos[i-2],
                "next+2": videos[i-3]
            })
        }
    }
}