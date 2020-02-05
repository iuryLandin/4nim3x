import { set } from '../frameworks/czark.js'
import getDataFromURL from './utils/getDataFromURL.js'

// recebe os dados do anime que vai ser carregado da URL

function principal() {
    const animeData = getDataFromURL()
    
    treatAnimeData()
    
    saveDataOnSession()

    loadPage()
    //End of principal()
    
    function treatAnimeData() {
        const fix = {
        Title() {
            animeData[1] = fixString(
                animeData[1]
            )
        },
        Desc() {
            animeData[2] = fixString(
                animeData[2]
            )
        },
        ImgUrl() {
            animeData[3] = (
                `http://png.techrevolution.com.br/${animeData[3]}`
            )
        }
        }

        fix.Title()
        fix.Desc()
        fix.ImgUrl()

        function fixString(str) {
            str = decodeURIComponent(str)
            str.replace(
                /£/g,
                String.fromCharCode(39)
            )
            str.replace(
                /§/g,
                ' '
            )
    
            return str
        }
    }

    function saveDataOnSession() {
        set.Session(
            'sharedAnime',
            [animeData]
        )
    }

    function loadPage() {
        location = `/anime.html?id=${animeData[0]}`
    }
}

;(principal)()