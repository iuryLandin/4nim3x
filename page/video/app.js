// Recebe os dados do episodio da URL
const { anime, ep } = get.UrlData()
const epsdList = get.Id('episode-list')

// receberá a lista de episódios da api
const episodeList = {}
const videoQualities = {}

async function getEpisodeList() {
    // recebe da sessão a lista carregada, caso exista
    const episodeListOnSession = get.Session(anime)
    if ( episodeListOnSession )
        episodeList.data = episodeListOnSession
    
    // caso não exista, busca da api e salva na sessão
    else {
        episodeList.data = await getApiData(`episodio?id=${anime}`)
        set.Session(anime, episodeList)
    }
}

async function getVideoQualities() {
    return await getApiData(`video?id=${ep}`)
}


function loadPlayer() {
    saveEpisode(parseInt(ep))

    $('#player-container').load('components/player.html')
}

async function loadPage() {
    // Adiciona o titulo do episódio na página
    const epName = episodeList.data.filter(eps => eps.Id == ep)
    $('#video-title').text(epName[0].Nome)
    
    // Carrega a lista de qualidades do video da api
    videoQualities.data = await getVideoQualities()

    get.Queries('.video_option').forEach(del.element)
    
    // itera sobre a lista carregando apenas os dados do nome e da url do video
    for (const { Nome, Endereco } of videoQualities.data) {
        // adiciona no modal as qualidade que a api retornou
        get.Id('quality_list').insertAdjacentHTML('beforeend', `<div class="video_option" onclick="loadVideo('${Endereco}')">${Nome}</div>`)
    }
    // Exibe o modal de qualidades
    $('.quality_modal_container').fadeIn()
}

function loadEpisodeList() {
    const watchedList = get.Local('watchedList') || new Object()
    const watchedEpsd = watchedList[anime]       || new  Array()
    const nextToWatch = episodeList.data.filter(({ Id }) => Id > ep)
    
    if (nextToWatch.length)
        for (const { Id, Nome } of nextToWatch) {
            epsdList.insertAdjacentHTML('afterbegin', `<div class="episode ${(watchedEpsd.includes(Id))?'seen':'unseen'}" onclick="jumpToVideo(${Id})">${Nome}</div>`)
        }
    else epsdList.innerHTML = `<div class="episode" onclick="alert('você chegou ao fim da lista')">Não há próximo episódio</div>`
}

function jumpToVideo(epId) {
    location.search = `?anime=${anime}&ep=${epId}`
}

// função que carrega a url no player e inicia o vídeo
async function loadVideo(url) {
    $('.quality_modal_container').fadeOut()

    get.Id('player').src = url
}

// Função que é carregada quando a página está pronta para carrega as informações na tela e ocultar o loading
getEpisodeList()
    .then(loadPlayer)
    .then(loadEpisodeList)
    .then(loadPage)
    .then(getVideoQualities)
    .then(hideLoading)