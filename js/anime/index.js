import { Endp, getApiLink as api, safeImg } from '../utils/endpoints.js'
import { getAnimeById } from '../utils/SearchEngine/index.js'
import getStyle2Ep from './utils/getStyleToEpisode.js'
import createPlaylist from '../utils/playlist.js'
import { get, set } from '../frameworks/czark.js'
import loading from '../utils/loading.js'
import disqusChat from '../frameworks/disqus.js'

const id = parseInt(location.search.split('=')[1])
const anime = getAnimeById(id)[0]

async function principal() {
    loading(true)

    applyAnimeDataOnPage()
    
    const episodes = await getEpisodes()
    mountEpisodesList()

    loading(false)

    loadDisqus()

    function applyAnimeDataOnPage() {
        $("#titulo").html(anime[1]);
        $("#desc")  .html(`<div class="descricao">${anime[2]}</div>`);
        $(".back")  .css('background-image', `url(${safeImg(anime[3])})`);
        $("#poster").attr('src', safeImg(anime[3]));
    }

    async function getEpisodes() {
        let epData = get.Session(id)

        if (epData) return epData
        else {
            epData = await axios
                .get(
                    api(Endp.episo + id)
                )
                .then(res => res.data)
                .catch(console.warn)
            
            set.Session(id, epData)
        }
        
        return epData
    }
    
    function mountEpisodesList() {
        for (const ep of episodes) {
            const epStyle = getStyle2Ep(`${ep.Id}`)
            
            const epElem = (
               `<div id="${ep.Id}">
                    <a href="video.html?id=${ep.Id}=${ep.Nome}">
                        <li class="${epStyle}">${ep.Nome}</li>
                    </a>
                </div>`
            )

            insertHtmlOnPage()

            saveProgress()
            
            function insertHtmlOnPage() {
                get.Id("episode-list")
                    .insertAdjacentHTML("beforeEnd", epElem)
            }

            function saveProgress() {
                $(`#${ep.Id}`).click(() => marcarEp(`${ep.Id}`))
            }
        }
    }

    function loadDisqus() {
        disqusChat()
    }
}

function marcarEp(episodeId) {
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

    // Chama a função que cria a playlist com base no episódio clicado
    createPlaylist(episodeId)

    // Finalmente é salvo na localStorage a nova lista com o episódio clicado salvo
    set.Local('watchedList', watchedList)

    // lista é recarregada em tempo real para melhorar a continuidade do site
    getEpisodes()
}

export default anime



;(principal)()