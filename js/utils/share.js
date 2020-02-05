import { get } from '../frameworks/czark.js'
import anime from '../anime/index.js'

const d = document

function shareBy(social) {
    const rede = {
        fb() {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${getShareLink()}`)
        },
        wpp() {
            window.open(`https://api.whatsapp.com/send?text=Ei%2C%20assiste%20esse%20anime...%20Clica%20no%20link%3A%20${getShareLink()}`)
        },
        copy() {
            get.Id('url-2-copy').select()
            d.execCommand('copy')
            setTimeout(notify, 100)
            
            function notify() {
                alert('Texto copiado para a area de transferência')
            }
        }
    }
    
    const openShareLink = rede[social]

    openShareLink()

    closeSharebar()
    //End of shareBy()

    function closeSharebar() {
        setTimeout(
            toogleShareBar,
            250
        )
    }

    
}

function toogleShareBar() {
    get.Id("url-2-copy")
    .value = getShareLink()
    $('.shareDiv').slideToggle()
}

function getShareLink() {
    const data2Share = [
        anime[0],
        replaceQuotesAndSpaces(anime[1]),
        replaceQuotesAndSpaces(anime[2]),
        anime[3].split('.br/')[1]
    ]

    return ( `${location.origin}/share.html?id=${data2Share.join('=')}` )
    //End of getShareLink()

    function replaceQuotesAndSpaces(elem) {
        elem = elem.replace(/ /g, '§')
        elem = elem.replace(/“/g, '£')
        elem = elem.replace(/'/g, '£')
        return elem.replace(/"/g, '£')
    }
}

export {
    shareBy,
    toogleShareBar,
}