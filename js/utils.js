function loading(status) {
    const loading = $("#loading")
    return (status) ? loading.show() : loading.hide()
}

function loadingAnimes(status) {
    const loadingAnimes = $("#loading-animes")
    return (status) ? loadingAnimes.show() : loadingAnimes.hide()
}
function compartilhar() {
    // remove os espaços do titulo e da descrição
    title = title.replace(/ /g, '§')
    title = title.replace(/“/g, '£')
    title = title.replace(/'/g, '£')
    title = title.replace(/"/g, '£')
    desc = desc.replace(/ /g, '§')
    desc = desc.replace(/“/g, '£')
    desc = desc.replace(/'/g, '£')
    desc = desc.replace(/"/g, '£')
    const link = `${location.origin}/share.html?id=${id}=${title}=${desc}=${img}`
    get.Id("url-2-copy").value = link
    $('.shareDiv')
        .slideToggle();
}

function share(rede) {
    // remove os espaços do titulo e da descrição
    title = title.replace(/ /g, '§')
    title = title.replace(/“/g, '£')
    title = title.replace(/'/g, '£')
    title = title.replace(/"/g, '£')
    desc = desc.replace(/ /g, '§')
    desc = desc.replace(/“/g, '£')
    desc = desc.replace(/'/g, '£')
    desc = desc.replace(/"/g, '£')

    // remove o link inseguro da imagem
    img = img.split('http://png.techrevolution.com.br/')[1]

    const link = `${location.origin}/share.html?id=${id}=${title}=${desc}=${img}`
    const msg = 'Ei, assiste esse anime... Clica no link: \n'
    
    // detecta a rede social escolhida para compartilhar o anime
    if (rede == 'fb'  ) url = `https://www.facebook.com/sharer/sharer.php?u=${link}`
    else if (rede == 'wpp' ) url = `https://api.whatsapp.com/send?text=${msg + link}`
    else if (rede == 'copy') {
        get.Id("url-2-copy").select()
        document.execCommand('copy')
    }
    
    setTimeout(() => $('.shareDiv').slideToggle(), 250)
    if (rede != 'copy') window.open(url);
    // else setTimeout(alert('Texto copiado para a area de transferência'), 250)
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