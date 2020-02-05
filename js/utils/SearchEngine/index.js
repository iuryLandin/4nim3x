import devFunctions from './utils/devFunc.js'
import showAnimeList from '../../home/index.js'
import montAnimeCard from '../../templates/animes.js'
import { get, set, del } from '../../frameworks/czark.js'

const searchBar = get.Id('searchbar')
const searchEngine = get.Local('searchEngine')

function busca() {
    const audit = devFunctions[searchBar.value]

    if (audit) runAudit()
    else runSearch()
    
    function runAudit() {
        del.fromSession('lastSearch')
        audit()
    }

    function runSearch() {
        set.Session("lastSearch", searchBar.value)
        setTimeout(pesquisa, 1000)
    }
}

function pesquisa() {
    del.fromSession('nextPage')
    
    const results = findResults()

    if (results.length > 500) showAnimeList()
    else displayResults()

    function findResults() {
        const term = searchBar.value.toLowerCase()

        const matches = searchEngine
        .filter(anime => {
                return anime[1]
                    .toLowerCase()
                    .indexOf(term) !== -1
            })
        return matches
    }

    function displayResults() {
        get.Queries(".anime")
            .forEach(deleteAnime)

        for(const anime of results) {
            montAnimeCard(anime)
        }

        function deleteAnime(item) {
            item.remove()
        }
    }
}

function getAnimeById(animeId) {
    let animeData = findAnimeDataInLocalFiles()

    if (!animeData) animeData = findAnimeInReleases()

    if (!animeData) animeData = getSharedData()

    return animeData
    //End of getAnimeById(0)

    function findAnimeDataInLocalFiles() {
        const match = searchEngine
            .filter(anime => {
                return ( anime[0] == animeId )
            })
        
        return match
    }

    function findAnimeInReleases() {
        const releases = get.Local('releaselist').data

        const match = releases
            .filter(anime => {
                anime[0] == animeId
            })
        
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