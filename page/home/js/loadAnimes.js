// As seguintes variáveis vão receber a lista de animes que serão exibidos
var animeList = new Object()
var releaseList = new Object()

async function loadAnimes(next = 0) {
    releaseList = await $.get(`https://qgeletronicos.com/animeapi/lancamento`).fail(console.warn)

    releaseList
        .forEach(({ Id, Nome, Imagem }) => {
            console.log(Id)
            elem = `<a href="/page/anime/?id=${Id}" class="anime">
                        <img src="${Imagem}" draggable="false" class="img">
                        <div class="anime-title">
                            <h3>${truncate(Nome, 16)}</h3>
                        </div>
                    </a>`
            get.Id('anime-list').insertAdjacentHTML('beforeend', elem)
        });
    hideLoading()
}

loadAnimes()