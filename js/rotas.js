//Configuração referentes à página e os links que irão ser carregados
//Estas staticantes contêm os EndPoints usados na API
class EndPoints {
    baseUrl = 'https://cors-anywhere.herokuapp.com/https://qgeletronicos.com/animeapi'
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
//cabeçalho usado no axios para obter as requisições

const d             = document // Constante que referência de forma rápida a base do DOM
const lista         = $("#lista")
const listaDeItens  = $("#listaDeItens")
const epAtual       = $("#episodioAtual")[0]
const video         = $("#video")
const vidPlayer     = d.getElementById("videoPlayer")
const searchBar     = d.getElementById("searchbar")