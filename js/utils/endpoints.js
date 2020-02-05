//Configuração referentes à página e os links que irão ser carregados
//Estas staticantes contêm os EndPoints usados na API
const Endp = {
    qgElet: 'https://qgeletronicos.com/animeapi', //link qgEletronicos
    cinex : 'http://cinex.96.lt/animeapi',        //link cinex
    anime : '/anime?next=',    //lista de animes em ordem alfabética
    categ : '/categoria',      //endpoint das categorias para seleção
    video : '/video?id=',      //endpoint para acesso aos videos
    lanca : '/lancamento',     //lista de animes da temporada
    episo : '/episodio?id=',   //endpoint para acesso aos episodios
    baseUrl() {
        return `https://cors-anywhere.herokuapp.com/${this.cinex}` //API
    },
}

function safeImg(imgURL) {
    return `${Endp.qgElet}/img?i=${imgURL}` //função que devolve um caminho das imagens seguras
}

function getApiLink(endpoint) {
    return `${Endp.baseUrl() + endpoint}`       //função que devolve os links prontos para uso
}

// Cabeçalho usado no axios para obter as requisições
const Head = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
}

export {
    getApiLink,
    safeImg,
    Endp,
    Head,
}