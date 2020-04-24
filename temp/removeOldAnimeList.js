// Esse arquivo é temporário, e será utilizado apenas para limpar a lista de animes antiga, que se torna inútil com essa atualização do app
function clearAnimeList(pos = 0) {
    del.fromLocal('releaseList')
    del.fromLocal('lastPageLocal')
    del.fromLocal('useNewLayout')
    
    const enginePage = get.Local(`animeList-${pos}`)
    if (!enginePage) return

    const { Next } = enginePage

    del.fromLocal(`searchEngine-${pos}`)
    del.fromLocal(`animeList-${pos}`)

    if (Next) clearAnimeList(Next)
}

clearAnimeList()