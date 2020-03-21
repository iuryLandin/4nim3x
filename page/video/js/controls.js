const controls = {
    Space() {
        togglePlay()
    },
    ArrowRight() {
        video.currentTime += parseFloat( 10 )
    },
    ArrowLeft() {
        video.currentTime -= parseFloat( 10 )
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
        video.webkitRequestFullScreen();
    }
}
