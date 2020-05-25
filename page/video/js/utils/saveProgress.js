import { set, get } from "../../../../js/utils/CzarK.js"

const { anime, ep } = get.UrlData()

export const saveEpisode = () => {
    // recebe o progresso do anime atual
    let watchedList = get.Local('watchedList') || {}
    let watchedEpsd = watchedList[anime]       || []
    
    // verifica se o episódio já está salvo na lista para evitar duplicações
    const episodeExist = watchedEpsd.includes(parseInt(ep))
    if (!episodeExist) watchedEpsd.push(parseInt(ep))

    watchedList[anime] = watchedEpsd.sort()

    set.Local('watchedList', watchedList)
}