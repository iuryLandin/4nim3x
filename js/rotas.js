//Configuração referentes à página e os links que irão ser carregados
//Estas constantes contêm os EndPoints usados na API
const baseUrl = 'https://cors-anywhere.herokuapp.com/http://cinex.96.lt/animeapi'
const headAxios = {headers: {'Access-Control-Allow-Origin': '*'}}
//endpoints
const endpAnime = '/anime'          //lista de animes em ordem alfabética
const endpCateg = '/categoria'      //endpoint das categorias para seleção
const endpVideo = '/video?id='      //endpoint para acesso aos videos
const endpLanca = '/lancamento'     //lista de animes da temporada
const endpEpiso = '/episodio?id='   //endpoint para acesso aos episodios

//links relativos à pagina
const d = document
const lista = $('#lista')
const epsLista = $("#epsLista")
const opcoes = $("#opcoes")
const anime = $("#anime")
const video = $("#video")

// disqus
const disqus = `<div id="disqus_thread"></div>`