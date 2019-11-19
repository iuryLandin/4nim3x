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
    .get(baseUrl + endpEpiso + id, headAxios)
    .then(res => montarTabelaEpisodio(res.data))
}

function montarTabelaEpisodio(data) {
    epsLista.html("");
    loading(false);
    data.forEach(element => montaLink(element.Nome, "getlink", element.Id, epsLista))
    epsLista.append(disqus)
    disqusChat()
}

function getlink(id) {
    opcoes.html("");
    loading(true);
    anime.hide();
    video.fadeIn();
    axios
        .get(baseUrl + endpVideo + id, headAxios)
        .then(res => res.data.forEach(element => montaLink(element.Nome, "player", element.Endereco, opcoes)))
}

function montaLink(nome, funcao, parametro, agregar){
    let html = `<a href="javascript: ${funcao}('${parametro}')"><li>${nome}</li></a>`
    agregar.append(html)
    loading(false)
}


function voltar(de , para){
    $('#' + de).fadeOut();
    $("#" + para).show();

}