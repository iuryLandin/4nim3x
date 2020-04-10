const controls = {
    Space() {
        togglePlay()
    },
    ArrowRight() {
        video.currentTime += parseFloat( 10.0 )
    },
    ArrowLeft() {
        video.currentTime -= parseFloat(  2.5 )
    },
    ArrowUp() {
        if ( video.volume < 0.94 ) video.volume += parseFloat( 0.05 )
        else video.volume = parseFloat( 1 )
    },
    ArrowDown() {
        if ( video.volume > 0.05 ) video.volume -= parseFloat( 0.05 )
        else video.volume = parseFloat( 0 )
    },
    KeyF() {    
        if (document.fullscreenElement) document.exitFullscreen()
        else video.requestFullscreen()
    },
    KeyM() {
        video.muted = !video.muted
    }
}