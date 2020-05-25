const d = document

var disqus_config = function () {
    this.page.url = location.origin + location.pathname
    this.page.identifier = import('./CzarK.js').then(res =>res.get.UrlData().id)
};

(function() {
    var s = d.createElement('script');
    s.src = 'https://4nim3x.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();