//Configuração referentes à página e os links que irão ser carregados
//Estas staticantes contêm os EndPoints usados na API
class EndPoints {
    qgElet  = 'https://qgeletronicos.com/animeapi' //link seguro da API
    baseUrl = `https://cors-anywhere.herokuapp.com/http://cinex.96.lt/animeapi`; //API
    anime   = '/anime?next=';    //lista de animes em ordem alfabética
    categ   = '/categoria';      //endpoint das categorias para seleção
    video   = '/video?id=';      //endpoint para acesso aos videos
    lanca   = '/lancamento';     //lista de animes da temporada
    episo   = '/episodio?id=';   //endpoint para acesso aos episodios
    safeImg = img => `${this.qgElet}/img?i=${img}`; //função que devolve um caminho da imagem segura
    getApi  = endp => `${this.baseUrl+endp}`; //função que devolve os links prontos para uso
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