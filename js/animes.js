function verAnime(id, nome, desc, img) {
    let HTMLdesc = `<div class="descricao">${decodeURIComponent(desc)}</div>`
    $("#poster").attr('src', img.src);
    $("#titulo").html(nome);
    $("#desc").html(HTMLdesc);
    $("#home").hide();
    anime.fadeIn();
    getEpisodio(id);
}

function getEpisodio(id) {
    let Endp = new EndPoints()
    loading(true);
    axios
        .get(Endp.getApi(Endp.episo+id), headAxios)
        .then(res => montarTabelaEpisodio(res.data, id))
        .catch(err => console.warn(err))
}

function montarTabelaEpisodio(data, id) {
    epsLista.html("");
    mostraVideo(false)
    data.forEach(element => montaLink(element.Nome, "getlink", element.Id, epsLista, '', id))
    loading(false)
    lerProgresso(id)
    epsLista.append(disqus)
    disqusChat()
}

function montaLink(nome, funcao, parametro, agregar, status = false, id) {
    let html = `
    <a href="javascript: ${funcao}('${parametro}', '${nome}')" onclick="mostraVideo(${status})">
        <li class="listaEpisodios" onclick="marcarEp('${funcao}', this, '${id}')" clicado="">${nome}</li>
    </a>`
    agregar.append(html)
    loading(false);
}

function marcarEp(funcao, html, id) {
    if (funcao == "getlink") {
        html.classList.add("epVisto")
        html.attributes[2].nodeValue = true
    }
    salvaProgresso(id, html)
}

function salvaProgresso(id, html) {
    let array = []
    if (!!localStorage.getItem(`${id}`) ) array = JSON.parse(localStorage.getItem(`${id}`))
    let jaExiste = false
    for (let i=0;i<array.length;i++){
        if (html.innerHTML == array[i]) jaExiste = true
    }
    if (!jaExiste) array.push(html.innerHTML)
    
    localStorage.setItem(`${id}`, JSON.stringify(array))
}

function lerProgresso(id) {
    let array = JSON.parse(localStorage.getItem(`${id}`))
    const episodios = document.querySelectorAll(".listaEpisodios")
    for (let i = 0; i < episodios.length; i++) {
        if (array.includes(episodios[i].innerHTML)) {
            episodios[i].classList.add("epVisto")
            episodios[i].attributes[2].nodeValue = 'true'
        }
    }
}