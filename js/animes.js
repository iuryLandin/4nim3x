function verAnime() {
    let HTMLdesc = `<div class="descricao">${decodeURIComponent(sessionStorage.getItem("desc"))}</div>`
    $("#poster").attr('src', sessionStorage.getItem("capa"));
    $(".back").css('background-image', "url(" + sessionStorage.getItem("capa") + ")");
    $("#titulo").html(sessionStorage.getItem("nome"));
    $("#desc").html(HTMLdesc);
    $("#home").hide();
    anime.fadeIn();
    getEpisodio();
}

/***************************************************************************************
/* 
/* */
function getlink() {
    let id = sessionStorage.getItem("videoId")
    epAtual[0].innerHTML = sessionStorage.getItem("videoNome")
    loading(true);
    axios
        .get(Endp.getApi(Endp.video + id), headAxios)
        .then(res => res.data
            .forEach(element => montaLink(element.Nome, "playVid", element.Endereco, opcoes, true)))
        .catch(err => console.warn(err))
}




function verAnimeCompartilhado() {

    //verifica se a lista de busca ta criada, se ja estiver so carrega a lista
    openIndexPage()

    //pega parametro passado pela url
    let param = location.search.split('id=')[1]

    //a funcao retorna um objeto instanciado com os dados do anime passado pelo parametro
    let animeDetails = getAnimeById(param);

    //Salvar todas as informações separadamente no sessionStorage
    animeEscolhido(animeDetails[0][0], animeDetails[0][1], animeDetails[0][2], "index.html", animeDetails[0][3]);

    //redireciona para pagina de anime
    location = "anime.html"
}


function playlist() {
    loading(true);
    let id = sessionStorage.getItem("id")
    axios
        .get(Endp.getApi(Endp.episo + id), headAxios)
        .then(res => criarPlaylist(res.data, id))
        .catch(err => console.warn(err))
}


function criarPlaylist(data, animeId) {
    sessionStorage.setItem('playlist', JSON.stringify(data));
    loading(false);
}

function posEpAtual() {
    let playlist = JSON.parse(sessionStorage.getItem('playlist'));
    let epAtual = sessionStorage.getItem('videoId');

    //let result = playlist.filter((x)=>x.Id === epAtual);

    let pos = playlist.findIndex((x) => x.Id === epAtual);

    console.log(playlist[pos]);
    return pos;
}

var videoPlaylist = new Array;
function montarPlaylist() {
    let playlist = JSON.parse(sessionStorage.getItem('playlist'));
    let pos = posEpAtual();
    let prox = pos + 1;



    //adiciona o primeiro video a playlist
    $.ajax({
        url: Endp.getApi(Endp.video + sessionStorage.getItem('videoId')),
        success: function (data) {
            videoPlaylist.push({ 'file': data[0].Endereco, 'mediaid': pos });
            console.log("=============");
            montarPlaylistProx();
           
        }
    });

    


}

function montarPlaylistProx() {
    let playlist = JSON.parse(sessionStorage.getItem('playlist'));
    let pos = posEpAtual();
    let prox = pos + 1;

    let max = playlist.length;


    if(max > 10) max = 9;

    for (i = 0; i < max ; i++) {
        let id = playlist[prox + i].Id;
        $.ajax({
            url: Endp.getApi(Endp.video + id),
            success: function (data) {
                videoPlaylist.push({ 'file': data[0].Endereco, 'mediaid': prox });
                
                var pl = JSON.stringify(videoPlaylist);
                jwplayer.key = "ABCdeFG123456SeVenABCdeFG123456SeVen=="
                jwplayer("myElement").setup({
                    "playlist": JSON.parse(pl)
                });
            }
        });
    }


}

function getEpisodio() {
    loading(true);
    let id = sessionStorage.getItem("id")
    axios
        .get(Endp.getApi(Endp.episo + id), headAxios)
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
    <a href="${(funcao != "playVid") ? "video.html" : "javascript:void(0)"}" onclick="${funcao}('${parametro}', '${nome}')">
        <li class="listaEpisodios" onclick="marcarEp('${funcao}', this, '${id}')">${nome}</li>
    </a>`
    agregar.append(html)
    loading(false);
}