import createAnimeCard from '../../templates/animes.js'
import { get, set, del } from '../../frameworks/czark.js'

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

function showAnimeList(page = 0) {
    deleteOldAnimeCards()
    
    const currentPage = get.Local(`animeList-${page}`)

    mountCurrentPage()

    setNextPage()
    //End of showAnimeList()

    function deleteOldAnimeCards() {
        if (!page) get.Queries('.anime')
            .forEach(del.element)
    }

    function mountCurrentPage() {
        for (const anime of currentPage.animes) {
            createAnimeCard(anime)
        }
    }

    function setNextPage() {
        if (currentPage.Next) 
            set.Session(
                'nextPage',
                currentPage.Next
            )
        else 
            del.fromSession('nextPage')
    }
}

export {
    nextPage,
    fixApiBug,
    showAnimeList,
}