const Endp = new EndPoints()

function openIndexPage(){
    if (!localStorage.getItem("animes")) animeList()
    else if (((new Date().getTime()) >= localStorage.getItem("animes")[0])) {
        localStorage.setItem("animes", [])
        animeListFromSession()
    }
    else animeListFromSession()
}

function animeList(next = 0) {
    closeNav()
    loading(true)
    if (d.getElementById("verMais")) d.getElementById("verMais").parentElement.remove()
    axios
        .get(Endp.getApi(Endp.anime + next), headAxios)
        .then(res => montarTabelaAnime(res.data))
        .catch(err => console.warn(err))
    saveSession()
}

function montarTabelaAnime(data) {
    loading(false)
    data.anime.forEach(element => montarAnime(element, "index.html"))
    if (data.Next) lista.append(`
    <p style="text-align: center">
        <a id="verMais" href="javascript:animeList('${data.Next}')">CARREGAR MAIS</a>
    </p>`)
}

function montarAnime(element, origem) {
    loading(false)
    lista.append(`
    <div class='anime'>
        <a href="anime.html">
            <img onclick="animeEscolhido(${element.Id}, '${element.Nome}', '${encodeURIComponent(element.Desc)}', '${origem}', this.src)" src="${element.Imagem}"/>
        </a>
        <legend>${element.Nome}</legend>
    </div>`)
}

function getlink() {
    let id = sessionStorage.getItem("videoId")
    epAtual[0].innerHTML = sessionStorage.getItem("videoNome")
    loading(true);
    axios
        .get(Endp.getApi(Endp.video + id), headAxios)
        .then(res => res.data.forEach(element => montaLink(element.Nome, "playVid", element.Endereco, opcoes, true)))
        .catch(err => console.warn(err))
}

function animeEscolhido(id, nome, desc, origem, capa) {
    sessionStorage.setItem("nome", nome)
    sessionStorage.setItem("desc", desc)
    sessionStorage.setItem("capa", capa)
    sessionStorage.setItem("id", id)
    sessionStorage.setItem("origem", origem)
}

function videoEscolhido(id, nome) {
    sessionStorage.setItem("videoId", id)
    sessionStorage.setItem("videoNome", nome)
}


function animeLanc() {
    closeNav()
    loading(true)
    axios
        .get(Endp.getApi(Endp.lanca), headAxios)
        .then(res => res.data.forEach(element => montarAnime(element, "lancamentos.html")))
        .catch(err => console.warn(err))
}
