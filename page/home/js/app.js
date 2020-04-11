// As seguintes variáveis vão receber a lista de animes que serão exibidos
var animeList = new Object()
var releaseList = new Object()
const { defaultLaunch } = settings 


function loadPage(){
    // busca das configurações a página definida como padrão
    // e a carrega.
    let page = load[settings.defaultLaunch]
    page()
}





































async function loadAnimes(next = 0) {
    releaseList = await getDataFromApi()

    releaseList
        .forEach(({ Id, Nome, Imagem }) => {
            let elem = `<a href="/page/anime/?id=${Id}" class="anime">
                        <img src="${Imagem}" draggable="false" class="img">
                        <div class="anime-title">
                            <h3>${truncate(Nome, 16)}</h3>
                        </div>
                    </a>`
            get.Id('anime-list').insertAdjacentHTML('beforeend', elem)
        });
    hideLoading()

    async function getDataFromApi() {
        return await $.get(`https://qgeletronicos.com/animeapi/lancamento`).fail(console.warn)
    }
}

loadAnimes()