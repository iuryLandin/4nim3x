// Recebe os dados do episodio da URL
const { id, episode } = get.UrlData()

// constante de acesso ao player de vídeo
const player = get.Id('player')

// Variável que irá receber a lista de qualidade do episódio
// seria interessante linkar o seletor do player a ela.
var videoQualities = new Array()

async function loadPage() {
    // Adiciona o titulo do episódio na página
    $('#video-title').text(episode)
    
    // Carrega a lista de qualidades do video da api
    videoQualities = await getApiData(`video?id=${id}`)
    
    // itera sobre a lista carregando apenas os dados do nome e da url do video
    for(const { Nome, Endereco } of videoQualities) {
        // adiciona no modal as qualidade que a api retornou
        get.Id('quality_list').insertAdjacentHTML('beforeend', `<div class="video_option" onclick="loadVideo('${Endereco}')">${Nome}</div>`)
    }
    // Exibe o modal de qualidades
    $('.quality_modal_container').fadeIn()
    
    // por enquanto estético, mas carrega a opção salva pelo usuário de autoplay
    changeVideoAutoplay()
}

// Função que carrega o estado de autoPlay que o usuário selecionou nas configurações
function changeVideoAutoplay() {
    if(settings.autoplay == 'true'){
        $('#autoplay').text('toggle_off')
        get.Id('autoplay').classList.add('unchecked')
        settings.autoplay = 'false'
    }
    else {
        $('#autoplay').text('toggle_on')
        get.Id('autoplay').classList.remove('unchecked')
        settings.autoplay = 'true'
    }
}

// função que carrega a url no player e inicia o vídeo
function loadVideo(url) {
    $('.quality_modal_container').fadeOut()

    player.src = url
    player.play()

}

// Função que é carregada quando a página está pronta para carrega as informações na tela e ocultar o loading
(loadPage)()
    .then(hideLoading)