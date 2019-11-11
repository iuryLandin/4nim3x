function verAnime(id, nome, desc, img) {

    $("#poster").attr('src', img);
    $("#titulo").html(nome);

    let HTMLdesc = `<div class="descricao">${decodeURIComponent(desc)}</div>`
    $("#desc").html(HTMLdesc);
    $("#home").hide();
    $("#anime").fadeIn();

    getEpisodio(id);
}

function montarTabelaEpisodio(data) {
    loading(false);
    //LIMPAR UL
    $("#epsLista").html("");
    console.log(data)
    data.forEach(element => {
        let html = `<li><a href="#" onclick="getlink(${element.Id})">${element.Nome}</a></li>`;
        $("#epsLista").append(html);
    });
}

function getEpisodio(id) {
    loading(true);
    axios
        .get(baseUrl + endpEpiso + id, headAxios)
        .then(res => montarTabelaEpisodio(res.data)) //Arrow function que chama a função de exibir a lista de episódios
}

function getlink(id) {
    loading(true);
    $("#anime").hide();
    $("#video").fadeIn();

    axios
        .get(baseUrl + endpVideo + id, headAxios)
        .then(res => {
            $("#opcoes").html("");
            console.log(res.data)
            res.data.forEach(element => {
                let html = `<li><a href="javascript: player('${element.Endereco}')">${element.Nome}</a></li>`
                $("#opcoes").append(html)
                loading(false);
            });
        })
}


function voltar(de , para){
    $('#' + de).fadeOut();
    $("#" + para).show();

}