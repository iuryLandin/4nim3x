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
        if ( video.volume < 1 ) video.volume += parseFloat( 0.05 )
    },
    ArrowDown() {
        if ( video.volume ) video.volume -= parseFloat( 0.05 )
    }
}
