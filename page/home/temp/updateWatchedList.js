// atualiza a lista de animes assistidos substituindo os episodios salvos em forma de string por int
(function updateWatchedList() {
    const OldWatchedList = get.Local('watchedList')
    const watchedKeys = Object.keys(OldWatchedList)
    const NewWatchedList = new Object()
    for (const key of watchedKeys) {
        let watchedAnime = OldWatchedList[key]
        watchedAnime = watchedAnime.map(anime => parseInt(anime))
        NewWatchedList[key] = watchedAnime
    }
    set.Local('watchedList', NewWatchedList)
})()