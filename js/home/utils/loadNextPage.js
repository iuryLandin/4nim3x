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

export default nextPage