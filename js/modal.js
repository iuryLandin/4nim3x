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

function montarTabelaEpisodio(data) {
    //LIMPAR UL
    $("#epsLista").html("");
    console.log(data)
    data.forEach(element => {
        let html =`<li><a href="#" onclick="getlink(${element.Id})">${element.Nome}</a></li>`;
        $("#epsLista").append(html);
    });
}

function getEpisodio(id) {
    axios
        .get(baseUrl + endpEpiso + id, headAxios)
        .then(res => montarTabelaEpisodio(res.data)) //Arrow function que chama a função de exibir a lista de episódios
}

function getlink(id) {
    axios
        .get(baseUrl + endpVideo + id, headAxios)
        .then(res => {
            $("#epsLista").html("");
            console.log(res.data)
            res.data.forEach(element => {
                let html = `<li><a href="${element.Endereco}">${element.Nome}</a></li>`
                $("#epsLista").append(html)
            });
        })
}


span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
}
