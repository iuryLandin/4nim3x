(function() {
    animeList()
})()

function animeList(next) {
    if(!next) endpoint = endpAnime
    else endpoint = endpAnime + '?next=' + next
    axios
        .get((baseUrl + endpoint), headAxios ) //Coloquei o objeto que com o cabeçalho que é solicitado dentro de uma variável, salva em /js/rotas.js
        .then(res => montarTabelaAnime(res.data)) //Arrow function que chama a função de exibir a lista de animes
        .catch(err => console.log(err))
}

function montarTabelaAnime(data) {
    const list = $('#lista')
    data.anime.forEach(element => {
        let html = `
        <div class='anime'>
            <img onclick="abrirModal(${element.Id}, '${element.Nome}', '${encodeURIComponent(element.Desc)}')" src="${element.Imagem}" />
            <legend>${element.Nome}</legend>
        </div>` //eu identei o codigo html para ficar mais fácil pra mim compreender o que ta acontecendo aqui
        list.append(html)
    })
    if(!!data.Next) list.append(`<p align="center"><a id="verMais" href="#" onclick="verMais('${data.Next}')">VER MAIS</a></p>`)
    //fiz uma abstração nessa condicional aqui, qualquer coisa eu explico
}

function verMais(item){
    $(".anime").remove()
    $("#verMais").remove()
    animeList(item)
}