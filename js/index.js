(() => animeList())()

function animeList(next = null) {
    lista[0].innerHTML = ""
    loading(true);
    if(!next) endpoint = endpAnime
    else endpoint = endpAnime + '?next=' + next
    axios
        .get((baseUrl+endpoint),headAxios)
        .then(res => montarTabelaAnime(res.data))
        .catch(err => console.warn(err))
    closeNav()
}

function montarTabelaAnime(data) {
    loading(false);
    data.anime.forEach(element => montarAnime(element))
    if(data.Next) lista.append(`<p align="center"><a id="verMais" href="#" onclick="verMais('${data.Next}')">VER MAIS</a></p>`)
}

function animeLanc() {
    loading(true);
    lista[0].innerHTML = ""
    axios
        .get(baseUrl + endpLanca, headAxios)
        .then(res => res.data.forEach(element => montarAnime(element)))
        .catch(err => console.warn(err))
    closeNav()
}

function verMais(item){
    $(".anime").remove()
    $("#verMais").remove()
    animeList(item)
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