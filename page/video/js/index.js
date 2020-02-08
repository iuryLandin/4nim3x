const player = document.querySelector('.player');
const video = player.querySelector('.player-video');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.filled-progress');
const toggle = player.querySelector('.toggle-play');
const skippers = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player-slider');
const expand = document.querySelector('.expand');


$('.player-video').on('loadstart', function (event) {
  $('.playlist').fadeOut();
  $('.player-loader').fadeIn();
});
$('.player-video').on('canplay', function (event) {
  $('.player-loader').fadeOut('fast');
});


$('.playlistBtn').click(function (event) {
  $('.playlist').toggle();
});

$('.a-seguir').click(function (event) {
    iniciarProximo();
});

// Logic
function togglePlay() {
  const playState = video.paused ? 'play' : 'pause';
  video[playState](); // Call play or paused method 
}

function updateButton() {
  const togglePlayBtn = document.querySelector('.toggle-play');

  if (this.paused) {
    togglePlayBtn.innerHTML = `<svg class="" width="16" height="16" viewBox="0 0 16 16"><title>play</title><path d="M3 2l10 6-10 6z"></path></svg>`;
  } else {
    togglePlayBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16"><title>pause</title><path d="M2 2h5v12H2zm7 0h5v12H9z"></path></svg>`;
  }
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate() {
  video[this.name] = this.value;
}

function progressUpdate() {
  const percent = video.currentTime / video.duration * 100;
  progressFilled.style.flexBasis = `${percent}%`;

  if(percent >= 95)
    exibirIniciarProximo();
}

function scrub(e) {
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullScreen() {
  video.webkitRequestFullScreen();
}

function getNextCover(){
    let obj = JSON.parse(sessionStorage.getItem('playlist'));

    if(!obj.next){
        html = `<p style='color: white;'> Você chegou ao fim da lista :) </p>`;
        $(".pl-item").html(html);
        return 0;
    }

    let newUrl = `https://qgeletronicos.com/animeapi/thumb?anim=${obj.next.Nome}`;
    let videoId = obj.next.Id;
    let titulo = obj.next.Nome;
    $(".a-seguir").attr('src', newUrl);
    $(".a-seguir").attr('video', videoId);
    $(".a-seguir").attr('titulo', titulo);
    $("a-seguir-titulo").attr('titulo', titulo);

}
 getNextCover();

 function exibirIniciarProximo(){
     $('.playlist').show();

     let obj =  JSON.parse(sessionStorage.getItem('playlist'));

    if(!obj.next){
        html = `
            <p style='color: white;'> Você chegou ao fim da lista :) </p>
        `;
        $(".pl-item").html(html);
        return 0;
    }

     html = `<p style='color: white;' class="a-seguir" onclick='iniciarProximo();'> Próximo episódio <i class='fa fa-forward'></i> </p>`;
        $(".pl-item").html(html);

    let newUrl = `https://qgeletronicos.com/animeapi/thumb?anim=${obj.next.Nome}`  ;
    let videoId = obj.next.Id;
    let titulo = obj.next.Nome;
    $(".a-seguir").attr('src', newUrl);
    $(".a-seguir").attr('video', videoId);
    $(".a-seguir").attr('titulo', titulo);
    $("a-seguir-titulo").attr('titulo', titulo);
 }


 function iniciarProximo(){
    let videoId =  $('.a-seguir').attr('video');
    let titulo  =  $('.a-seguir').attr('titulo');
    
    saveNextAnime2Watchedlist()

    updatePlaylist()

    location = `/page/video/?id=${videoId}=${titulo}`;

    function saveNextAnime2Watchedlist() {
      const curAnime = sessionStorage.getItem('currentAnime')
      let watchedList = JSON.parse(localStorage.getItem('watchedList'))

      if(!watchedList[curAnime].includes(videoId)) {
        watchedList[curAnime].push(videoId)
        localStorage.setItem('watchedList', JSON.stringify(watchedList))
      }


    }

    function updatePlaylist(episodeId) {
      const episodes = getEpisodesOnPage()
      
      savePlaylist()
      //End of createPlaylist()
      
      function getEpisodesOnPage() {
          const currentAnime = (
              JSON.parse(sessionStorage.getItem('currentAnime'))
          )
  
          return (
            JSON.parse(sessionStorage.getItem(currentAnime))
          )
      }
  
      function savePlaylist() {
          for (let i=0; i < episodes.length; i++) {
              if (episodes[i].Id == videoId) {
      
                  const playlist = {
                      'previous': episodes[i+1] || null,
                      'next': episodes[i-1] || null
                  }
      
                  sessionStorage.setItem('playlist', JSON.stringify(playlist))
              }
          }
      }
  }
 }

// Event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', progressUpdate);

expand.addEventListener('click', toggleFullScreen);

toggle.addEventListener('click', togglePlay);
skippers.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', rangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', rangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);