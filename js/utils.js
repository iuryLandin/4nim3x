function loading(status) {
    const loading = $("#loading")
    return (status) ? loading.show() : loading.hide()
}

function loadingAnimes(status) {
    const loadingAnimes = $("#loading-animes")
    return (status) ? loadingAnimes.show() : loadingAnimes.hide()
}
function compartilhar() {
    $('.shareDiv')
        .slideToggle();
}

function share(rede) {
    // remove os espaços do titulo e da descrição
    title = title.replace(/ /g, "§")
    desc = desc.replace(/ /g, "§")

    // remove o link inseguro da imagem
    img = img.split("http://png.techrevolution.com.br/")[1]

    const link = `${location.origin}/share.html?id=${id}=${title}=${desc}=${img}`
    const msg = 'Ei, assiste esse anime... Clica no link: \n'
    
    // detecta a rede social escolhida para compartilhar o anime
    if (rede == 'fb' ) url = `https://www.facebook.com/sharer/sharer.php?u=${link}`
    if (rede == 'wpp') url = `https://api.whatsapp.com/send?text=${msg + link}`

    $('.shareDiv').slideToggle();
    window.open(url);
}