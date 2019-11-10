const base_url = 'https://cors-anywhere.herokuapp.com/https://qgeletronicos.com/animeapi';


(function() {
    animeList()
})()

function animeList() {
    axios.get(base_url + '/anime', { headers: {'Access-Control-Allow-Origin': '*'} } ).then(function(response) {
            montarTabelaAnime(response.data);
        });
}

function montarTabelaAnime(data) {
    const list = $('#lista');
    for(i=0; i< data.anime.length; i++){
        let html = `<div class='anime'> <img onclick="abrirModal('${data.anime[i].Nome}', '${encodeURIComponent(data.anime[i].Desc)}' )" src="${data.anime[i].Imagem}" />
                    <legend>${data.anime[i].Nome}</legend> </div>
                    `;
        $("#lista").append( html )
    }
}



var modal = document.getElementById("modal");
var span = document.getElementsByClassName("close")[0];

function abrirModal(nome, desc) {
    $("#desc").html("<h3> "+ nome +" </h3>" + decodeURIComponent(desc) );
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
