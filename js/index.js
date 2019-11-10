(function() {
    animeList()
})()

function animeList(next) {
    if(!next) endpoint = endpAnime
    else endpoint = endpAnime + '?next=' + next
    axios
        .get((baseUrl + endpoint), headAxios ) //Coloquei o objeto que com o cabeçalho que é solicitado dentro de uma variável, salva em /js/rotas.js
        .then(res => montarTabelaAnime(res.data.anime)) //Arrow function que chama a função de exibir a lista de animes
        .catch(err => console.log(err))
}

function getEpisodio(id) {
    axios
        .get(baseUrl + endpEpiso + id, headAxios)
        .then(res => montarTabelaEpisodio(res.data)) //Arrow function que chama a função de exibir a lista de episódios
}

function montarTabelaAnime(data) {
    const list = $('#lista')
    data.forEach(element => {
        let html = `
        <div class='anime'>
            <img onclick="abrirModal(${element.Id}, '${element.Nome}', '${encodeURIComponent(element.Desc)}')" src="${element.Imagem}" />
            <legend>${element.Nome}</legend>
        </div>` //eu identei o codigo html para ficar mais fácil pra mim compreender o que ta acontecendo aqui
        list.append(html)
    })
    if(!data.Next) list.append(`<p align="center"><a href="#" onclick="verMais('${data.Next}')">VER MAIS</a></p>`)
    //fiz uma abstração nessa condicional aqui, qualquer coisa eu explico
}

function montarTabelaEpisodio(data) {
    //LIMPAR UL
    $("#epsLista").html("");
    console.log(data)
    data.forEach(element => {
        let html =`<li><a href="#">${element.Nome}</a></li>`;
        $("#epsLista").append(html);
    });
}


function abrirModal(id, nome, desc) {
    let HTMLdesc = `
    <div class="container">
        <h3>${nome}</h3>
        <div class="descricao">${decodeURIComponent(desc)}</div>
    </div>`
    $("#desc").html(HTMLdesc);
    getEpisodio(id);
    modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
}

function abrirVideo(link) {
    axios
        .get(link)
        .then(res => {
            console.log(res.data[0])})
}