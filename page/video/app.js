// Recebe os dados do episodio da URL
const { anime, ep } = get.UrlData()

// constante de acesso ao player de vídeo
const player = get.Id('player')

// receberá a lista de episódios da api
var episodeList = new Array();

// Variável que irá receber a lista de qualidade do episódio
// seria interessante linkar o seletor do player a ela.
var videoQualities = new Array()


async function getEpisodeList() {
    // recebe da sessão a lista carregada, caso exista
    const episodeListOnSession = get.Session(anime)
    if ( episodeListOnSession )
        episodeList = episodeListOnSession
    
    // caso não exista, busca da api e salva na sessão
    else {
        episodeList = await getApiData(`episodio?id=${anime}`)
        set.Session(anime, episodeList)
    }

    console.log(episodeList)
}

async function getVideoQualities() {
    return await getApiData(`video?id=${ep}`)
}

getEpisodeList().then(getVideoQualities)


async function loadPage() {
    // Adiciona o titulo do episódio na página
    // $('#video-title').text(episode)
    
    // Carrega a lista de qualidades do video da api
    videoQualities = await getVideoQualities()
    
    // itera sobre a lista carregando apenas os dados do nome e da url do video
    for(const { Nome, Endereco } of videoQualities) {
        // adiciona no modal as qualidade que a api retornou
        get.Id('quality_list').insertAdjacentHTML('beforeend', `<div class="video_option" onclick="loadVideo('${Endereco}')">${Nome}</div>`)
    }
    // Exibe o modal de qualidades
    $('.quality_modal_container').fadeIn()
    
    // por enquanto estético, mas carrega a opção salva pelo usuário de autoplay
    // changeVideoAutoplay()
}

// Função que carrega o estado de autoPlay que o usuário selecionou nas configurações
// function changeVideoAutoplay() {
//     if(settings.autoplay == 'true'){
//         $('#autoplay').text('toggle_off')
//         get.Id('autoplay').classList.add('unchecked')
//         settings.autoplay = 'false'
//     }
//     else {
//         $('#autoplay').text('toggle_on')
//         get.Id('autoplay').classList.remove('unchecked')
//         settings.autoplay = 'true'
//     }
// }

// função que carrega a url no player e inicia o vídeo
function loadVideo(url) {
    $('.quality_modal_container').fadeOut()

    player.src = `../player/index.html?url=${url}`

}

// Função que é carregada quando a página está pronta para carrega as informações na tela e ocultar o loading
(loadPage)()
    .then(hideLoading)