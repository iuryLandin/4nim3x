function saveEpisode(Id) {
    // recebe o progresso do anime atual
    let watchedList = get.Local('watchedList') || new Object()
    let watchedEpsd = watchedList[id]          || new  Array()
    
    // verifica se o episódio já está salvo na lista para evitar duplicações
    if(!watchedEpsd.includes(Id)) watchedEpsd.push(Id)

    watchedList[id] = watchedEpsd.sort((a, b) => {
        if ( a > b ) return ( 1)
        if ( b > a ) return (-1)
        return ( 0)
    })

    set.Local('watchedList', watchedList)
}