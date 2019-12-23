const id   = sessionStorage.getItem("idAnime") || null;             //Pega o id do anime na Session
const nome = decodeURIComponent(location.search.split('=')[1]); //Pega o nome no link da página
const idVideo = sessionStorage.getItem("idVideo") || null;          //Pega o id do episodio na session

//Prepara a página com as informações salvas na localStorage
async function verAnime() {
    let elem = getAnimeById(id)[0] || []; //pega os dados dos animes salvo na LS
    if (elem.length==0) elem = await getAnimeFromApi(id); //confirma que vai ser aberto o anime
    $("#titulo").html(elem[1]);
    $("#desc")  .html(`<div class="descricao">${elem[2]}</div>`);
    $(".back")  .css('background-image', `url(${elem[3]})`);
    $("#poster").attr('src', elem[3]);
    getEpisodios();
}

//
async function getAnimeFromApi() {
    let animes = await axios.get(Endp.getApi(Endp.lanca));
    animes = Object.values(animes.data.filter(row => row.Id == id)[0]);
    animes.splice(3, 1);
    return animes;
}

// Carrega os dados da lista de episoóios, como links e id's de video
function getEpisodios() {
    loading(true);
    if (sessionStorage.getItem(`${id}`)){
        let data = JSON.parse(sessionStorage.getItem(`${id}`));
        montTabEpisodios(data);
    }else {
        axios
            .get(Endp.getApi(Endp.episo + id), headAxios)
            .then(res => {
                montTabEpisodios(res.data)
                setEpsLista(res.data) //envia os dados do anime para uma função que vai criar uma lista na sessão
            })
            .catch(err => console.warn(err));
    }
}

//Monta a tabela de episodios item por item, recebe os dados dos animes como parametro em forma de array
function montTabEpisodios(data) {
    data.forEach(elem => montaItem("videoEscolhido", Object.values(elem)));
    lerProgresso(id);
    disqusChat();
    loading(false);
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
    </a>`);
}

// Salva os dados do anime escolhido no link e carrega a pagina video.html
function videoEscolhido(anime) {
  anime = JSON.parse(decodeURIComponent(anime));
  sessionStorage.setItem("idVideo", anime[0]);
  montarPlaylist(anime);
  location = `video.html?nome=${anime[1]}`;
}

async function getlinks() {
    loading(true);
    epAtual.innerHTML = nome;
    await axios
        .get(Endp.getApi(Endp.video + idVideo), headAxios)              //pega os dados do video com base no id
        .then(res => res.data                                           //contém os links para cada qualidade disponível
            .forEach(elem => montaItem("playVid", Object.values(elem)))) //para cada item anterior é criado um botão
        .catch(err => console.warn(err));
    loading(false);
}

//usado para marcar os eps como "já visualizados", recebe um parâmetro html que é um path direto para o episódio clicado
function marcarEp(html) {
    if (location.pathname != "/video.html"){
        html.classList.add("epVisto");
        salvarProgresso(id, html.innerHTML);
    }
}

//Salva a lista de episodios na sessão pra diminuir o gasto da api em animes muito grandes.
//Ajuda a criar a playlist de episodios 
function setEpsLista(data){
    sessionStorage.setItem(`${id}`, JSON.stringify(data))
}

// Descomente para configurar o Disqus
var disqus_config = function () {
    this.page.url = window.location.href + '?id=' + sessionStorage.getItem("idAnime");  // pega a url atual da pagina
    this.page.identifier = sessionStorage.getItem("idAnime"); // pega o ID do anime
};
			
function disqusChat() {
    var s = d.createElement('script');
    s.src = 'https://e-baka-1.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
}





//função assíncrona que cria a playlist na sessionStorage no formato
//recebe como parametro um objeto que contém o Id, o nome e a Data de postagem do anime;
//
//na minha visão é semi-recursiva, você pode passar os objetos que ela salva na session como
//parametro pra função funcionar, e na verdade, recomendo que faça isso.
//
// ["anterior": Object, "proximo": Object]
async function montarPlaylist(anime) {
    //pega da session a lista de episodios salva em "setEpsLista()"
    let videos = JSON.parse(sessionStorage.getItem(id))

    //procura a posição do anime atual pra salvar o objeto anterior e o proximo na sessionStorage
    for (let i=0; i<videos.length;i++){
        if (videos[i].Nome == anime[1]) {
            sessionStorage
                .setItem("playlist", JSON.stringify({"anterior": videos[i+1], "proximo": videos[i-1]}))
        }
    }
}



// function montarPlaylistProx() {
//     let playlist = JSON.parse(sessionStorage.getItem('playlist'));
//     let pos = posEpAtual();
//     let prox = pos + 1;
// 
//     let max = playlist.length;
// 
// 
//     if(max > 10) max = 9;
// 
//     for (i = 0; i < max ; i++) {
//         let id = playlist[prox + i].Id;
//         $.ajax({
//             url: Endp.getApi(Endp.video + id),
//             success: function (data) {
//                 videoPlaylist.push({ 'file': data[0].Endereco, 'mediaid': prox });
// 
//                 var pl = JSON.stringify(videoPlaylist);
//                 jwplayer.key = "ABCdeFG123456SeVenABCdeFG123456SeVen=="
//                 jwplayer("myElement").setup({
//                     "playlist": JSON.parse(pl)
//                 });
//             }
//         });
//     }
// 
// 
// }
// 
// function verAnimeCompartilhado() {
// 
//     //verifica se a lista de busca ta criada, se ja estiver so carrega a lista
//     openIndexPage()
// 
//     //pega parametro passado pela url
//     let id = location.search.split('id=')[1]
// 
//     //a funcao retorna um objeto instanciado com os dados do anime passado pelo idetro
//     let animeDetails = getAnimeById(param)[0];
// 
//     //Salvar todas as informações separadamente no sessionStorage
//     animeEscolhido(animeDetails[0], animeDetails[1], animeDetails[2], "index.html", animeDetails[3]);
// 
//     //redireciona para pagina de anime
//     location = "anime.html"
// }
// 
// function posEpAtual() {
//     let playlist = JSON.parse(sessionStorage.getItem('playlist'));
//     let epAtual = sessionStorage.getItem('videoId');
// 
//     //let result = playlist.filter((x)=>x.Id === epAtual);
// 
//     let pos = playlist.findIndex((x) => x.Id === epAtual);
// 
//     console.log(playlist[pos]);
//     return pos;
// }        
// 
//function playlist() {
//     loading(true);
//     axios
//         .get(Endp.getApi(Endp.episo + id), headAxios)
//         .then(res => criarPlaylist(res.data, id))
//         .catch(err => console.warn(err));
// }                
// 
// function criarPlaylist(data, animeId) {
//     sessionStorage.setItem('playlist', JSON.stringify(data));
//     loading(false);
// }