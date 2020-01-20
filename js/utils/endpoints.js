//Configuração referentes à página e os links que irão ser carregados
//Estas staticantes contêm os EndPoints usados na API
class EndPoints {
    qgElet  = 'https://qgeletronicos.com/animeapi'; //link qgEletronicos
    cinex   = 'http://cinex.96.lt/animeapi';        //link cinex
    baseUrl = `https://cors-anywhere.herokuapp.com/${this.cinex}`; //API
    anime   = '/anime?next=';    //lista de animes em ordem alfabética
    categ   = '/categoria';      //endpoint das categorias para seleção
    video   = '/video?id=';      //endpoint para acesso aos videos
    lanca   = '/lancamento';     //lista de animes da temporada
    episo   = '/episodio?id=';   //endpoint para acesso aos episodios
    safeImg = img => `${this.qgElet}/img?i=${img}`; //função que devolve um caminho das imagens seguras
    getApi  = endp => `${this.baseUrl+endp}`;       //função que devolve os links prontos para uso
}

// Cabeçalho usado no axios para obter as requisições
const headAxios = {headers: {'Access-Control-Allow-Origin': '*'}}