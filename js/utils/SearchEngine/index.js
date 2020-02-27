import { showAnimeList } from '../../home/utils/index.js'
import { get, set, del } from '../../frameworks/czark.js'
import getSearchEngine from './utils/getSearchEngine.js'
import createAnimeCard from '../../templates/animes.js'
import devFunctions from './utils/devFunc.js'

const searchBar = get.Id('searchbar')

function busca() {
    const audit = devFunctions[searchBar.value]

    if (audit) runAudit()
    else runSearch()
    //End of busca()
    
    function runAudit() {
        del.fromSession('lastSearch')
        audit()
    }

    function runSearch() {
        set.Session("lastSearch", searchBar.value)
        setTimeout(pesquisa, 500)
    }
}

function pesquisa() {
    del.fromSession('nextPage')

    const searchEngine = getSearchEngine()
    
    const results = findResults()

    if (results.length > 500) showAnimeList()
    else displayResults()
    //End of pesquisa()

    function findResults() {
        const term = searchBar.value.toLowerCase()

        const matches = searchEngine
            .filter( anime => anime[1].toLowerCase().includes(term) )

        return matches
    }

    function displayResults() {
        get.Queries(".anime")
            .forEach(deleteAnime)

        for(const anime of results) {
            createAnimeCard(anime)
        }

        function deleteAnime(item) {
            item.remove()
        }
    }
    
}

function getAnimeById(animeId) {
    const searchEngine = getSearchEngine()
    
    let animeData = findAnimeDataInLocalFiles()

    if (!animeData) animeData = findAnimeInReleases()

    if (!animeData) animeData = getSharedData()

    return animeData
    //End of getAnimeById()

    function findAnimeDataInLocalFiles() {
        let match = null
        
        if(searchEngine) {
            match = searchEngine
                .filter(
                    anime => ( anime[0] == animeId )
                )
        }
        return match
    }

    function findAnimeInReleases() {
        const releases = get.Local('releaselist')

        let match = null
        if (releases) {
            match = releases.data
                .filter(
                    anime => (anime[0] == animeId)
                )
        }
        return match
    }

    function getSharedData() {
        return get.Session('sharedAnime')
    }
}


function mudaPesq() {
    searchBar.value = ''
    let testLog = !searchBar.attributes[1].value;
    if (testLog) searchBar.focus();
    else {
      del.fromSession("lastSearch")
      showAnimeList();
    }
    get.Id('searchbtn')
      .innerHTML    = testLog?'close' :'search';
    searchBar
      .style
      .width        = testLog?'200px' :'0px'  ;
    searchBar
      .style
      .outline      = testLog?''      :'none'  ;
    searchBar
      .style
      .paddingLeft  = testLog?'7px'   :'0px'  ;
    searchBar
      .attributes[1]
      .value        = testLog?'true'  :''    ;
}

export {
    busca,
    pesquisa,
    getAnimeById,
    mudaPesq,
}