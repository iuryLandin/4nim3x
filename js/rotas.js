//Configuração referentes à página e os links que irão ser carregados
//Estas staticantes contêm os EndPoints usados na API
class EndPoints {
    //baseUrl = 'https://cors-anywhere.herokuapp.com/https://qgeletronicos.com/animeapi'
    baseUrl = 'https://qgeletronicos.com/animeapi'
    anime   = '/anime?next='    //lista de animes em ordem alfabética
    categ   = '/categoria'      //endpoint das categorias para seleção
    video   = '/video?id='      //endpoint para acesso aos videos
    lanca   = '/lancamento'     //lista de animes da temporada
    episo   = '/episodio?id='   //endpoint para acesso aos episodios
    getApi(endp) {
        return `${this.baseUrl+endp}`
    }
}

const headAxios = {headers: {'Access-Control-Allow-Origin': '*'}}

//links relativos à pagina
const d         = document
const lista     = $("#lista")
const epsLista  = $("#epsLista")
const epAtual   = $("#episodioAtual")
const opcoes    = $("#opcoes")
const anime     = $("#anime")
const video     = $("#video")
const vidPlayer = d.getElementById("videoPlayer")
const term      = document.querySelector('#searchbar')
let nextPage    = 0