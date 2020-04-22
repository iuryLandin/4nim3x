const { id, episode } = get.UrlData()
const player = get.Id('player')

var videoQualities = new Array()

async function loadPage() {
    
    $('#video-title').text(episode)
    
    videoQualities = await getApiData(`video?id=${id}`)
    
    for(const { Nome, Endereco } of videoQualities) {
        get.Id('quality_list').insertAdjacentHTML('beforeend', `<div class="video_option" onclick="loadVideo('${Endereco}')">${Nome}</div>`)
    }
    changeVideoAutoplay()
    
    $('.quality_modal_container').fadeIn()
}

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

function loadVideo(url) {
    $('.quality_modal_container').fadeOut()

    player.src = url
    player.play()

}

(loadPage)()
    .then(hideLoading)