function verAnime() {
     let HTMLdesc = `<div class="descricao">${decodeURIComponent(sessionStorage.getItem("desc"))}</div>`
    $("#poster").attr('src', sessionStorage.getItem("capa"));
    $("#titulo").html(sessionStorage.getItem("nome"));
    $("#desc").html(HTMLdesc);
    $("#home").hide();
    anime.fadeIn();
    getEpisodio();
}

function verAnimeCompartilhado() {

    //verifica se a lista de busca ta criada, se ja estiver so carrega a lista
    openIndexPage()

    //pega parametro passado pela url
    let param =  location.search.split('id=')[1]

    //a funcao retorna um objeto instanciado com os dados do anime passado pelo parametro
    let animeDetails = getAnimeById(param);
    
    //Salvar todas as informações separadamente no sessionStorage
    animeEscolhido(animeDetails.Id, animeDetails.Nome, animeDetails.Descricao, "index.html", animeDetails.Capa);

    //renderiza o anime na tela
     let HTMLdesc = `<div class="descricao">${decodeURIComponent(sessionStorage.getItem("desc"))}</div>`
    $("#poster").attr('src', sessionStorage.getItem("capa"));
    $("#titulo").html(sessionStorage.getItem("nome"));
    $("#desc").html(HTMLdesc);
    $("#home").hide();
    anime.fadeIn();
    //getEpisodio();
}


function getEpisodio() {
    loading(true);
    let id = sessionStorage.getItem("id")
    axios
        .get(Endp.getApi(Endp.episo+id), headAxios)
        .then(res => montarTabelaEpisodio(res.data, id))
        .catch(err => console.warn(err))
}

function montarTabelaEpisodio(data, id) {
    data.forEach(element => montaLink(element.Nome, "videoEscolhido", element.Id, epsLista, id))
    loading(false)
    lerProgresso(id)
    disqusChat()
}

function montaLink(nome, funcao, parametro, agregar, id) {
    let html = `
    <a href="${(funcao!="playVid")?"video.html":"javascript:void(0)"}" onclick="${funcao}('${parametro}', '${nome}')">
        <li class="listaEpisodios" onclick="marcarEp('${funcao}', this, '${id}')" clicado="">${nome}</li>
    </a>`
    agregar.append(html)
    loading(false);
}