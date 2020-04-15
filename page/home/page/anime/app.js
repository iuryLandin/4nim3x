// Recolhe os dados do anime pelos parâmetros passados na URL
var { id, name, desc, img, origin } = get.UrlData()

// recebe o progresso do anime atual 
const watchedList = get.Local('watchedList') || new Object()
const watchedEpsd = watchedList[id]          || new  Array()

// receberá a lista de episódios da api
var episodeList = new Array();

// Verifica se a lista de animes ja foi carregada por completo alguma vez
const completedOnce = get.Local('completed-once')


async function loadPage() {
    // O endpoint de lancamentos disponibiliza nome e descrição "errados", então caso o
    // usuário esteja vindo da tela de lançamentos e já tenha carregado a search engine,
    // esses dados serão substituídos pelos contídos nela.

    if ( origin == 'releases' &&  completedOnce) {
        // Recebe o modulo que encontra os dados de um anime pelo seu id na lista de animes
        const { getAnimeById } = await import('../../js/search.js')

        // procura o anime que possui o id passado na URL
        const animeData = getAnimeById(id)

        // caso ele encontre na lista salva o anime com o id passado, os dados
        // de nome e descrição serão sobrescritos pelos que foram encontrados.
        if ( animeData[0] ) {
            const { Nome, Desc } = animeData [0]
            name = Nome
            desc = Desc
        }
    }

    // adiciona as informações do anime escolhido na tela
    get.Query('.img-blur').style = `background: url('${img}')`
    get.Id( 'desc-mobile').innerText = truncate(desc, 220)
    get.Id('desc-desktop').innerText = truncate(desc, 340)
    $('.full-desc-modal').text(desc)
    $('.full-desc-container').hide()
    get.Query('.anime-title').innerText = name
    get.Query('.anime-img').src = img
    // oculta ambas o botão "ver mais da descrição na view de desktop caso a descrição possua menos"
    console.log(desc.length < 340)
    if (desc.length < 220) $('#see-all-mobl').hide()
    if (desc.length < 340) $('#see-all-desk').hide()
}

// 
async function getEpisodeList() {
    const episodeListOnSession = get.Session(id)
    if ( episodeListOnSession )
        episodeList = episodeListOnSession
    else {
        episodeList = await axios.get(`https://cors-anywhere.herokuapp.com/http://cinex.96.lt/animeapi/episodio?id=${id}`, {
            'Access-Control-Allow-Origin': '*'
        })
        .then(res => res.data)
        .catch(console.warn)

        set.Session(id, episodeList)
    }
}

function loadEpisodeList() {
    // recebe das configurações o modo de ordenar os episódios escolhido pelo usuário
    const { episodeSortMode: sortMode } = settings

    for (const { Id, Nome } of episodeList) {
        const episodeButtom = `<a href="/page/video/index.html?id=${Id}&episode=${Nome}" class="episode ${(watchedEpsd.includes(Id))?'seen':'unseen'}" onclick="">${Nome}</a>`
        get.Queries('.episode-list').forEach(tag => tag.insertAdjacentHTML(sortMode, episodeButtom))
        // get.Id('episode-list-desktop').insertAdjacentHTML(sortMode, episodeButtom)
        
        $('.sort-mode').text( (sortMode == 'beforeend') ? 'Z - A' : 'A - Z' )
    }
}

// carrega os dados do anime na página
loadPage()

// obtém da api e carrega a lista de apisodios na página
getEpisodeList()
    .then(loadEpisodeList)
    .then(hideLoading)
    .then(function loadSwapListOrder() {
        $('.sortby').click(function () {
            const { episodeSortMode: sortMode } = settings

            settings.episodeSortMode = (sortMode == 'beforeend') ? 'afterbegin' : 'beforeend'

            saveSettings()
            get.Queries('.episode').forEach(del.element)

            loadEpisodeList()
        })
    })
    .catch(console.warn)
