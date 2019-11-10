(function() {
    animeList()
})()

function animeList() {
    axios
    .get(base_url)
    .then(response => montarTabela(response.data.anime))
}

function montarTabela(data) {
    data.forEach(element => {
        let html = `
        <div class="anime">
            <img onclick="abrirModal('${element.Nome}', '${encodeURIComponent(element.Desc)}')" src="${element.Imagem}"/>
            <legend>${element.Nome}</legend>
        </div>`
        $("#lista").append(html)
    })
}


function abrirModal(nome, desc) {
    $("#desc").html(`<h3>${nome}</h3>` + decodeURIComponent(desc));
    modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}