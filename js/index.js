(() => animeList())()

function animeList(next = null) {
    lista[0].innerHTML = ""
    loading(true);
    if(!next) endpoint = endpAnime
    else endpoint = endpAnime + '?next=' + next
    axios
        .get((baseUrl + endpoint), headAxios ) //Coloquei o objeto que com o cabeçalho que é solicitado dentro de uma variável, salva em /js/rotas.js
        .then(res => montarTabelaAnime(res.data)) //Arrow function que chama a função de exibir a lista de animes
        .catch(err => console.log(err))
    closeNav()
}

function montarTabelaAnime(data) {
    loading(false);
    data.anime.forEach(element => {
        let html = `
        <div class='anime'>
            <img onclick="verAnime(${element.Id}, '${element.Nome}', '${encodeURIComponent(element.Desc)}', this.src)" src="${element.Imagem}" />
            <legend>${element.Nome}</legend>
        </div>` //eu identei o codigo html para ficar mais fácil pra mim compreender o que ta acontecendo aqui
        lista.append(html)
    })
    if(!!data.Next) lista.append(`<p align="center"><a id="verMais" href="#" onclick="verMais('${data.Next}')">VER MAIS</a></p>`)
    //fiz uma abstração nessa condicional aqui, qualquer coisa eu explico
}

function animeLanc() {
    lista[0].innerHTML = ""
    axios
        .get(baseUrl + endpLanca, headAxios)
        .then(res => {
            res.data.forEach(element => {
                let html = `
                <div class='anime'>
                    <img onclick="verAnime(${element.Id}, '${element.Nome}', '${encodeURIComponent(element.Desc)}')" src="${element.Imagem}" />
                    <legend>${element.Nome}</legend>
                </div>` //eu identei o codigo html para ficar mais fácil pra mim compreender o que ta acontecendo aqui
                lista.append(html)
            })
        })
        .catch(err => console.warn(err))
    closeNav()
}

function verMais(item){
    $(".anime").remove()
    $("#verMais").remove()
    animeList(item)
}

