// atualiza a lista de animes assistidos substituindo os episodios salvos em forma de string por int
(function updateWatchedList() {
    const OldWatchedList = get.Local('watchedList')
    const watchedKeys = Object.keys(OldWatchedList)
    const NewWatchedList = new Object()
    for (const key of watchedKeys) {
        const watchedAnime = OldWatchedList[key]
        NewWatchedList[key] = watchedAnime.map(anime => parseInt(anime))
    }
    set.Local('watchedList', NewWatchedList)
})()