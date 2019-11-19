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
}

function montarTabelaEpisodio(data) {
    epsLista.html("");
    loading(false);
    data.forEach(element => montaLink(element.Nome, "getlink", element.Id, epsLista))
    mostraVideo(false)
    epsLista.append(disqus)
    disqusChat()
}

function montaLink(nome, funcao, parametro, agregar, status = false){
    let html = `<a href="javascript: ${funcao}('${parametro}')" onclick="mostraVideo(${status})"><li>${nome}</li></a>`
    agregar.append(html)
    loading(false)
}

function mostraVideo(condicao){
    d.getElementById("videoPlayer").style.display = (condicao)?"block":"none"
}