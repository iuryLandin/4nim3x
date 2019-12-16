function verAnime() {
     let HTMLdesc = `<div class="descricao">${decodeURIComponent(sessionStorage.getItem("desc"))}</div>`
    $("#poster").attr('src', sessionStorage.getItem("capa"));
     $(".back").css('background-image', "url("+sessionStorage.getItem("capa")+")" );
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
    animeEscolhido(animeDetails[0][0], animeDetails[0][1], animeDetails[0][2], "index.html", animeDetails[0][3]);

    //redireciona para pagina de anime
    location = "anime.html"
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