import { get } from '../../frameworks/czark.js'
import anime from '../index.js'


function getStyle2Ep(episodeId) {
    const id = anime[0]
    const watchedList = get.Local("watchedList")

    if (!watchedList || !watchedList[id])
        return "episodio"
    if (watchedList[id].includes(episodeId))
        return "episodio-visto"

    return "episodio"
}

export default getStyle2Ep