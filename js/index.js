const Endp = new EndPoints()

function animeList(next = 0) {
    closeNav()
    loading(true)
    if (!next) d.querySelectorAll(".anime").forEach(element => element.remove())
    if (verMais) verMais.parentElement.remove()
    axios
        .get(Endp.getApi(Endp.anime + next), headAxios)
        .then(res => montarTabelaAnime(res.data))
        .catch(err => console.warn(err))
}

function montarTabelaAnime(data) {
    loading(false)
    data.anime.forEach(element => montarAnime(element, "index.html"))
    if (data.Next) lista.append(`
    <p style="text-align: center">
        <a id="verMais" href="javascript:void(0)" onclick="animeList('${data.Next}')">VER MAIS</a>
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

// Descomente para configurar o Disqus
// var disqus_config = function () {
//     this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
//     this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
// };

function disqusChat() {
    var s = d.createElement('script');
    s.src = 'https://e-baka-1.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
}  