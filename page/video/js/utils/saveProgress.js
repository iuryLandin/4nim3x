function saveEpisode(epId) {
    // recebe o progresso do anime atual
    let watchedList = get.Local('watchedList') || {}
    let watchedEpsd = watchedList[anime]       || []
    
    // verifica se o episódio já está salvo na lista para evitar duplicações
    if (!watchedEpsd.includes(epId))
        watchedEpsd.push(epId)

    watchedList[anime] = watchedEpsd.sort()

    set.Local('watchedList', watchedList)
}