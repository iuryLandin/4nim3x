const id   = sessionStorage.getItem("idAnime")                        //Pega o id no link da página
const nome = decodeURIComponent(location.search.split('nome=')[1])  //Pega o nome no link da página

//Prepara a página com as informações salvas na localStorage
function verAnime() {
    let elem = getAnimeById(id)[0] //pega os dados dos animes salvo na LS
    $("#titulo").html(elem[1]);
    $("#desc")  .html(`<div class="descricao">${elem[2]}</div>`);
    $(".back")  .css('background-image', `url(${elem[3]})`);
    $("#poster").attr('src', elem[3]);
    getEpisodios();
}

// Carrega os dados da lista de episoóios, como links e id's de video
function getEpisodios() {
    loading(true);
    axios
    .get(Endp.getApi(Endp.episo + id), headAxios)
        .then(res => montTabEpisodios(res.data))
        .catch(err => console.warn(err))
}

//Monta a tabela de episodios item por item, recebe os dados dos animes como parametro em forma de array
function montTabEpisodios(data) {
    data.forEach(elem => montaItem("videoEscolhido", Object.values(elem)))
    lerProgresso(id)
    loading(false)
    disqusChat()
}

/********************************************************************************************
/* Monta genericamente a lista de episodios e a lista de opções de qualidade                *
/*          fn   Recebe um String que contem a função que será executada ao clicar no item  *
/*          elem Recebe os dados dos animes que serão adicionados dentro do html            *
/*******************************************************************************************/
function montaItem(fn, elem) {
    listaDeItens.append(`
    <a href="javascript: ${fn}('${encodeURIComponent(JSON.stringify(elem))}')">
        <li class="listaEpisodios" onclick="marcarEp(this)">${elem[1]}</li>
    </a>`)
}

// Salva os dados do anime escolhido no link e carrega a pagina video.html
function videoEscolhido(anime) {
  anime = JSON.parse(decodeURIComponent(anime))
  location = `video.html?id=${anime[0]}&nome=${anime[1]}`
}

async function getlinks() {
    loading(true);
    epAtual.innerHTML = nome
    await axios
        .get(Endp.getApi(Endp.video + id), headAxios)                   //pega os dados do video com base no id
        .then(res => res.data                                           //contém os links para cada qualidade disponível
            .forEach(elem => montaItem("playVid", Object.values(elem)))) //para cada item anterior é criado um botão
        .catch(err => console.warn(err))
    loading(false)
}

//usado para marcar os eps como "já visualizados", recebe um parâmetro html que é um path direto para o episódio clicado
function marcarEp(html) {
    if (location.pathname != "/video.html"){
        html.classList.add("epVisto")
        salvaProgresso(id, html.innerHTML)
    }
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

/// Depreciado
// function verAnimeCompartilhado() {

//     //verifica se a lista de busca ta criada, se ja estiver so carrega a lista
//     openIndexPage()

//     //pega parametro passado pela url
//     let id = location.search.split('id=')[1]

//     //a funcao retorna um objeto instanciado com os dados do anime passado pelo idetro
//     let animeDetails = getAnimeById(param)[0];

//     //Salvar todas as informações separadamente no sessionStorage
//     animeEscolhido(animeDetails[0], animeDetails[1], animeDetails[2], "index.html", animeDetails[3]);

//     //redireciona para pagina de anime
//     location = "anime.html"
// }
