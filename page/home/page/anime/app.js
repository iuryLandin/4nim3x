// Recolhe os dados do anime pelos parâmetros passados na URL
var { id, name, desc, img, origin } = get.UrlData()

// receberá a lista de episódios da api
var episodeList = new Array();

// Verifica se a lista de animes ja foi carregada por completo alguma vez
const completedOnce = get.Local('completed-once')


async function loadPage() {
    // Oculta a o modal que apresenta a descrição completa do anime.
    $('.full-desc-container').hide()
    
    // O endpoint de lancamentos disponibiliza nome e descrição "errados", então caso o
    // usuário esteja vindo da tela de lançamentos e já tenha carregado a search engine,
    // esses dados serão substituídos pelos contídos nela.

    if ( origin == 'releases' && completedOnce) {
        // Recebe o modulo que encontra os dados de um anime pelo seu id na lista de animes
        const { getAnimeById } = await import('../../js/search.js')

        // procura o anime que possui o id passado na URL
        const animeData = getAnimeById(id)

        // caso ele encontre na lista salva o anime com o id passado, os dados
        // de nome e descrição serão sobrescritos pelos que foram encontrados.
        if ( animeData[0] ) {
            const { Nome, Desc } = animeData[0]
            name = Nome
            desc = Desc
        }
    }
    
    // adiciona as imagens do anime escolhido na tela
    get.Queries('.img-place').forEach(place => place.src = img)
    
    // Posiciona as descrições nos seus devidos locais na página
    $('.full-desc-modal').text(desc)
    $('#desc-mobile' ).text( truncate(desc, 220) )
    $('#desc-desktop').text( truncate(desc, 340) )
    
    // posiciona o título do anime na pagina
    $('.anime-title').text(name)
    
    // oculta ambos os botões "ver mais" da descrição caso a descrição possua menos letras do que o limite
    if (desc.length < 220) $('#see-all-mobl').hide()
    // oculta apenas o botão "ver mais" da descrição na view de desktop
    if (desc.length < 340) $('#see-all-desk').hide()
}

// 
async function getEpisodeList() {
    // recebe da sessão a lista carregada, caso exista
    const episodeListOnSession = get.Session(id)
    if ( episodeListOnSession )
        episodeList = episodeListOnSession
    
    // caso não exista, busca da api e salva na sessão
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
    // recebe o progresso do anime atual 
    const watchedList = get.Local('watchedList') || new Object()
    const watchedEpsd = watchedList[id]          || new  Array()

    // recebe das configurações o modo de ordenar os episódios escolhido pelo usuário
    const { episodeSortMode: sortMode } = settings

    for (const { Id, Nome } of episodeList) {
        const episodeButtom = `<a href="/page/video/index.html?id=${Id}&episode=${Nome}" class="episode ${(watchedEpsd.includes(Id))?'seen':'unseen'}" onclick="saveEpisode(${Id})">${Nome}</a>`
        get.Queries('.episode-list').forEach(tag => tag.insertAdjacentHTML(sortMode, episodeButtom))
        
        $('.sort-mode').text( (sortMode == 'beforeend') ? 'Z - A' : 'A - Z' )
    }
}

// carrega os dados do anime na página
loadPage()

// obtém da api e carrega a lista de apisodios na página
getEpisodeList()
    .then(loadEpisodeList)
    .then(hideLoading)
    .then(function loadClickActions() {
        $('.sort-mode').click(() => {
            const { episodeSortMode: sortMode } = settings

            settings.episodeSortMode = (sortMode == 'beforeend') ? 'afterbegin' : 'beforeend'

            saveSettings()
            get.Queries('.episode').forEach(del.element)

            loadEpisodeList()
        })
        $('.desc').click( () => $('#full-desc').fadeIn() )
        $('#full-desc').click( () => $('#full-desc').fadeOut() )
    })
    .catch(console.warn)
