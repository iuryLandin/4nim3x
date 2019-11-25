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
if(res.data.Next) lista.append(`<p style="text-align: center"><a id="verMais" href="javascript:void(0)" onclick="animeList('${res.data.Next}')">VER MAIS</a></p>`)
}

function getlink(id, nome) {
let Endp = new EndPoints()
$("#episodioAtual")[0].innerHTML = nome
opcoes.html("");  
loading(true);
anime.hide();
video.fadeIn();
axios
    .get(Endp.getApi(Endp.video+id), headAxios)
    .then(res => res.data.forEach(element => montaLink(element.Nome, "player", element.Endereco, opcoes, true)))
    .catch(err => console.warn(err))
}

function montarAnime(element){
loading(false);
lista.append(`
<div class='anime'><a href="#"><img onclick="verAnime(${element.Id}, '${element.Nome}', '${encodeURIComponent(element.Desc)}', this)" src="${element.Imagem}"/></a><legend>${element.Nome}</legend></div>`)
}

function animeLanc() {
    let Endp = new EndPoints()
    loading(true)
    d.querySelectorAll(".anime").forEach(element => element.remove())
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