import showAnimeList from '../index.js'
import { get } from '../../frameworks/czark.js'

const d = document

const nextPage = {
    load() {
        const scrollPos = window.innerHeight + window.scrollY
        const pageHeight = d.body.offsetHeight
        const nextPage = get.Session('nextPage')
        
        if (endOfPage()) {
            showAnimeList(nextPage)
        }

        function endOfPage() {
            return scrollPos >= pageHeight && nextPage
        }
    },
    activate() {
        setTimeout(
            () => {
                window.onscroll = this.load
            },
            500
        )
    }
}

function fixApiBug(data) {
    let resFixed = data
        .split('</b><br />')

    const arrLength = resFixed.length - 1

    resFixed = (
        JSON.parse(
            resFixed[arrLength]
        )
    )

    return resFixed
}

export {
    nextPage,
    fixApiBug,
}