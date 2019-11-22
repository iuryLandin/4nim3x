function verAnime(id, nome, desc, img) {
    let HTMLdesc = `<div class="descricao">${decodeURIComponent(desc)}</div>`
    $("#poster").attr('src', img);
    $("#titulo").html(nome);
    $("#desc").html(HTMLdesc);
    $("#home").hide();
    anime.fadeIn();
    getEpisodio(id);
}

function getEpisodio(id) {
    loading(true);
    axios
        .get(baseUrl+endpEpiso+id, headAxios)
        .then(res => montarTabelaEpisodio(res.data))
        .catch(err => console.warn(err))
}

function montarTabelaEpisodio(data) {
    epsLista.html("");
    mostraVideo(false)
    data.forEach(element => montaLink(element.Nome, "getlink", element.Id, epsLista))
    loading(false)
    epsLista.append(disqus)
    disqusChat()
}

function montaLink(nome, funcao, parametro, agregar, status = false){
    let html = `<a href="javascript: ${funcao}('${parametro}', '${nome}')" onclick="mostraVideo(${status})"><li>${nome}</li></a>`
    agregar.append(html)
    loading(false);
}