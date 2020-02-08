import { Endp, getApiLink as api, safeImg } from '../utils/endpoints.js'
import { getStyle2Ep, marcarEp, getIdFromUrl } from './utils/index.js'
import { disqusChat as loadDisqus } from '../frameworks/disqus.js'
import { getAnimeById } from '../utils/SearchEngine/index.js'
import { toogleShareBar, shareBy } from '../utils/share.js'
import { get, set } from '../frameworks/czark.js'
import loading from '../utils/loading.js'

const id = getIdFromUrl()
const anime = getAnimeById(id)[0]

async function principal() {
    loading(true)

    applyAnimeDataOnPage()
    
    await mountEpisodesList()

    loading(false)

    loadShareFunc()

    loadDisqus()
    //End of principal()

    function applyAnimeDataOnPage() {
        $("#titulo").html(anime[1]);
        $("#desc")  .html(`<div class="descricao">${anime[2]}</div>`);
        $(".back")  .css('background-image', `url(${safeImg(anime[3])})`);
        $("#poster").attr('src', safeImg(anime[3]));
    }
    
    async function mountEpisodesList() {
        const episodes = await getEpisodes()

        for (const ep of episodes) {
            const epStyle = getStyle2Ep(`${ep.Id}`)
            
            const epElem = (
               `<div id="${ep.Id}">
                    <a href="../video/?id=${ep.Id}=${ep.Nome}">
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
            set.Session('currentAnime', id)
        }
        
        return epData
    }

    function loadShareFunc() {
        $('#aside').click(toogleShareBar)

        $('#facebook').click(
            () => shareBy('fb')
        )
        $('#whatsapp').click(
            () => shareBy('wpp')
        )
        $('#copy-btn').click(
            () => shareBy('copy')
        )
        $('#url-2-copy').click(
            () => shareBy('copy')
        )
    }
}

export default anime

;(principal)()