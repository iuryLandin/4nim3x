function verAnime(id, nome, desc, img) {
    let HTMLdesc = `<div class="descricao">${decodeURIComponent(desc)}</div>`
    $("#poster").attr('src', img.src);
    $("#titulo").html(nome);
    $("#desc").html(HTMLdesc);
    $("#home").hide();
    anime.fadeIn();
    getEpisodio(id);
}

function getEpisodio(id) {
    epsLista.html("")
    let Endp = new EndPoints()
    loading(true);
    axios
        .get(Endp.getApi(Endp.episo+id), headAxios)
        .then(res => montarTabelaEpisodio(res.data, id))
        .catch(err => console.warn(err))
}

function montarTabelaEpisodio(data, id) {
    mostraVideo(false)
    data.forEach(element => montaLink(element.Nome, "getlink", element.Id, epsLista, '', id))
    loading(false)
    lerProgresso(id)
    epsLista.append(disqus)
    disqusChat()
}

function montaLink(nome, funcao, parametro, agregar, status = false, id) {
    let html = `
    <a href="javascript: ${funcao}('${parametro}', '${nome}')" onclick="mostraVideo(${status})">
        <li class="listaEpisodios" onclick="marcarEp('${funcao}', this, '${id}')" clicado="">${nome}</li>
    </a>`
    agregar.append(html)
    loading(false);
}