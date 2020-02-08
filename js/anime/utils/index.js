import { get, set } from '../../frameworks/czark.js'
import createPlaylist from '../../utils/playlist.js'
import loading from '../../utils/loading.js'
import anime from '../index.js'


function getStyle2Ep(episodeId) {
    const id = anime[0]
    const watchedList = get
        .Local('watchedList')

    if (!watchedList || !watchedList[id])
        return 'episodio'
    if (watchedList[id].includes(episodeId))
        return 'episodio-visto'

    return 'episodio'
}

function marcarEp(episodeId) {
    createPlaylist(episodeId)

    const id = anime[0]    
    loading(true)
    //Recebe da localStorage o array atual com os dados dos animes vistos
    let watchedList = get.Local('watchedList')

    // Caso seja o primeiro anime sendo salvo progresso, é criada uma estrutura
    // do zero, usando "object Literals"
    if (!watchedList) {
        watchedList = {}
        watchedList[id] = []
    }

    // Caso nao seja o primeiro anime sendo salvo progresso, mas o array ja exista
    // com outros animes, é adicionado apenas a nova entrada de valores
    if (!watchedList[id]) watchedList[id] = []

    // Antes de salvar o episodio dentro do array, é verificado se já não existe
    // para evitar episodios duplicados.
    if (!watchedList[id].includes(episodeId))
        watchedList[id].push(episodeId)

    // Finalmente é salvo na localStorage a nova lista com o episódio clicado salvo
    set.Local('watchedList', watchedList)
}

function getIdFromUrl() {
    return (
        parseInt(
            location.search
                .split('=')[1]
        )
    )
}

export {
    getStyle2Ep,
    marcarEp,
    getIdFromUrl,
}