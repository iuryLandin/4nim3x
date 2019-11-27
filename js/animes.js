function verAnime() {
    let HTMLdesc = `<div class="descricao">${decodeURIComponent(sessionStorage.getItem("desc"))}</div>`
    $("#poster").attr('src', sessionStorage.getItem("capa"));
    $("#titulo").html(sessionStorage.getItem("nome"));
    $("#desc").html(HTMLdesc);
    $("#home").hide();
    anime.fadeIn();
    getEpisodio();
}

function getEpisodio() {
    loading(true);
    let Endp = new EndPoints()
    let id = sessionStorage.getItem("id")
    axios
        .get(Endp.getApi(Endp.episo+id), headAxios)
        .then(res => montarTabelaEpisodio(res.data, id))
        .catch(err => console.warn(err))
}

function montarTabelaEpisodio(data, id) {
    // mostraVideo(false)
    console.log(data)
    data.forEach(element => montaLink(element.Nome, "videoEscolhido", element.Id, epsLista, id))
    loading(false)
    lerProgresso(id)
    epsLista.append(disqus)
    disqusChat()
}

function montaLink(nome, funcao, parametro, agregar, id) {
    let html = `
    <a href="${funcao!="player"?"video.html":"#"}" onclick="${funcao}('${parametro}', '${nome}')">
        <li class="listaEpisodios" onclick="marcarEp('${funcao}', this, '${id}')" clicado="">${nome}</li>
    </a>`
    agregar.append(html)
    loading(false);
}