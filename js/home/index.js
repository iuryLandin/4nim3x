import { busca, pesquisa, mudaPesq } from '../utils/SearchEngine/index.js'
import { Endp, getApiLink as api } from '../utils/endpoints.js'
import { get, set, listen } from '../frameworks/czark.js'
import { fixApiBug, nextPage, showAnimeList } from './utils/index.js'

listen('keyup', busca)
if (
    get.Id('searchbtn')
) $('#searchbtn').click(mudaPesq)

async function principal() {
    const lastSearch = get.Session('lastSearch')
    
    if ( !get.Local('animeList-0') ) {
        await getAnimeListFromApi()
    }
    else checkListStatus()

    mountAnimeList()
    
    nextPage.activate()

    set.Local('appVersion', '1.2.8')
    //End of principal()

    async function checkListStatus() {
        const lastPage = get.Local('lastPageLocal')

        const animeList = get.Local(`animeList-${lastPage}`)

        // Recebe da session a página salva, caso exista
        let lastPageFromApi = get.Session(lastPage)

        if (!lastPageFromApi) {
            // Recebe da api a última página salva na session, para comparação
            lastPageFromApi = await $
                .ajax({
                    url: api(Endp.anime + lastPage),
                    type: 'GET'
                })
                .fail(console.warn)
            
            if (typeof lastPageFromApi == 'string')
                lastPageFromApi = fixApiBug(lastPageFromApi)
    
            // Salva na sessão o resultado do ajax para evitar sobrecarga na api
            set.Session(lastPage, lastPageFromApi)
        }
    
        // Analiza se ainda existem itens a serem adicionados a lista de animes
        if ( existNextPage() || newAnimeAdd() ) 
            getAnimeListFromApi(lastPage)

        function existNextPage() {
            return (!!lastPageFromApi.Next)
        }

        function newAnimeAdd() {
            return (!!lastPageFromApi.anime.length > animeList.animes.length)
        }
    }


    function mountAnimeList() {
        if (lastSearch)
            showLastSearch()
        else 
            showAnimeList()
    }

    function showLastSearch() {
        mudaPesq()

        searchBar.value = lastSearch

        pesquisa()
    }
}

async function getAnimeListFromApi(page = 0){
    let data = await callApi()
    
    createLocalAnimeList()

    createSearchEngine()
    //End of getAnimeListFromApi()
    
    async function callApi() {
        return await $
            .ajax({
                url: api(Endp.anime + page),
                type: 'GET'
            })
            .fail(console.warn)
    }

    function createLocalAnimeList() {
        // Corrige o problema da ultima página da Api retornar conteudo HTML
        if(typeof data == 'string')
            data = fixApiBug(data)
        
        // Reduz o tamanho da lista de animes salva na Local Storage
        // Transformando-a em array
        let animes = []
        
        for (const item of data.anime) {
            animes.push(
                Object.values(item)
                )
            }
            
            // Adiciona à lista de animes o retorno do ajax "comprimido"
        const animeList = { 'created': get.Date(), animes, 'Next': data.Next }

        // Salva na Local Storage a lista de Animes
        set.Local(`animeList-${page}`, animeList)

        // Aciona Recursividade caso exista mais itens para salvar
        if (data.Next)
            getAnimeListFromApi(data.Next)

        set.Local('lastPageLocal', page)

        createSearchEngine()
    }

    function createSearchEngine() {
        const animeList = get.Local(`animeList-${page}`)

        if (animeList) {
            // Array auxiliar usado para receber os valores
            let auxArray = [animeList.Next]

            //percorre cada anime dentro da linha
            for (const anime of animeList.animes) {
                auxArray.push(anime)
            }
            
            // Salva na localStorage o motor de buscas otimizado
            set.Local(`searchEngine-${page}`, auxArray)
        }
    }
}

const searchBar = get.Id('searchbar')

;(principal)()