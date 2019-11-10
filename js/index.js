const base_url = 'https://cors-anywhere.herokuapp.com/https://qgeletronicos.com/animeapi';


(function() {
    animeList()
})()

function animeList(next) {
    if(next != "" || next != null || next != NaN || next != undefined)
        endpoint = '/anime';
    else
        endpoint = '/anime?next=' + next;

     axios.get(base_url + endpoint, { headers: {'Access-Control-Allow-Origin': '*'} } ).then(function(response) {
            montarTabelaAnime(response.data);
        });
}

function getEpisodio(id) {
    axios.get(base_url + '/episodio?id='+id, { headers: {'Access-Control-Allow-Origin': '*'} } ).then(function(response) {
            console.log(response.data);
            montarTabelaEpisodio(response.data);
        });
}

function montarTabelaAnime(data) {
    const list = $('#lista');
    for(i=0; i< data.anime.length; i++){
        let html = `<div class='anime'> <img onclick="abrirModal(${data.anime[i].Id}, '${data.anime[i].Nome}', '${encodeURIComponent(data.anime[i].Desc)}' )" src="${data.anime[i].Imagem}" />
                    <legend>${data.anime[i].Nome}</legend> </div>
                    `;
        $("#lista").append( html )


    }
     if(data.anime.Next != null || data.anime.Next != ""){
            $("#lista").append( "<p align='center'> <a href='#' onclick='verMais("+ data.anime.Next +")'>VER MAIS</a> </p>" )
        }
}

function montarTabelaEpisodio(data) {
    //LIMPAR UL
    $("#epsLista").html("");


     for(i=0; i< data.length; i++){
        let html = `<li>${data[i].Nome}</li>
                    `;
        $("#epsLista").append( html )
    }
}



var modal = document.getElementById("modal");
var span = document.getElementsByClassName("close")[0];

function abrirModal(id, nome, desc) {
    let HTMLdesc = "<h3> "+ nome +" </h3>" + decodeURIComponent(desc);
    $("#desc").html( HTMLdesc );
    getEpisodio(id);
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
