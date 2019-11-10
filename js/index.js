const link = 'http://cinex.96.lt/animeapi/anime';
const base_url = 'js/teste.json';


(function() {
    animeList()
})()

function animeList() {
    axios.get(base_url)
        .then(function(response) {
            montarTabelaAnime(response.data);
        });
}

function montarTabelaAnime(data) {
    const list = $('#lista');
    for(i=0; i< data.anime.length; i++){
        let html = `<div class='anime'> <img src='${data.anime[i].Imagem}' />
                    <legend>${data.anime[i].Nome}</legend> </div>
                    `;
        $("#lista").append( html )
    }


}