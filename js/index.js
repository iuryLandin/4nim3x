function animeList(next = 0) {
    let Endp = new EndPoints()
    loading(true)
    if (d.getElementById("verMais")) d.getElementById("verMais").parentElement.remove()
    if (next==0)d.querySelectorAll(".anime").forEach(element => element.remove())
    axios
        .get(Endp.getApi(Endp.anime+next), headAxios)
        .then(res => montarTabelaAnime(res))
        .catch(err => console.warn(err))
    closeNav()
}

function montarTabelaAnime(res) {
nextPage = res.data.Next
loading(false)
res.data.anime.forEach(element => montarAnime(element))
if(nextPage) lista.append(`<p style="text-align: center"><a id="verMais" href="javascript:void(0)" onclick="animeList('${nextPage}')">VER MAIS</a></p>`)
}

function getlink() {
    let Endp = new EndPoints()
    let id = sessionStorage.getItem("videoId")
    $("#episodioAtual")[0].innerHTML = sessionStorage.getItem("videoNome")
    opcoes.html("");  
    loading(true);
    axios
        .get(Endp.getApi(Endp.video+id), headAxios)
        .then(res => {
            console.log(res)
            res.data.forEach(element => montaLink(element.Nome, "player", element.Endereco, opcoes, true))
        })
        .catch(err => console.warn(err))
}

function montarAnime(element){
loading(false);
lista.append(`
    <div class='anime'>
        <a href="anime.html">
            <img onclick="animeEscolhido(${element.Id}, '${element.Nome}', '${encodeURIComponent(element.Desc)}', this.src)" src="${element.Imagem}"/>
        </a>
        <legend>${element.Nome}</legend>
    </div>`)
}

function animeEscolhido(id, nome, desc, capa){
    sessionStorage.setItem("nome", nome)
    sessionStorage.setItem("desc", desc)
    sessionStorage.setItem("capa", capa)
    sessionStorage.setItem("id", id)
}

function videoEscolhido(id, nome){
    sessionStorage.setItem("videoId", id)
    sessionStorage.setItem("videoNome", nome)
}


function animeLanc() {
    let Endp = new EndPoints()
    loading(true)
    axios
        .get(Endp.getApi(Endp.lanca), headAxios)
        .then(res => res.data.forEach(element => montarAnime(element)))
        .catch(err => console.warn(err))
    closeNav()
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