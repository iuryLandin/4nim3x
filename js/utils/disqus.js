(() => disqusChat())()

// // Descomente para configurar o Disqus
// var disqus_config = function () {
//     this.page.url = window.location.href + '?id=' + sessionStorage.getItem("idAnime");  // pega a url atual da pagina
//     this.page.identifier = sessionStorage.getItem("idAnime"); // pega o ID do anime
// };
			
function disqusChat() {
    var s = d.createElement('script');
    s.src = 'https://e-baka-1.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
}
