import { busca, pesquisa, mudaPesq } from '../utils/SearchEngine/index.js'
import { Endp, getApiLink as api } from '../utils/endpoints.js'
import { get, set, del, listen } from '../frameworks/czark.js'
import { fixApiBug, nextPage } from './utils/index.js'
import createAnimeCard from '../templates/animes.js'

listen('keyup', busca)
if (
    get.Id('searchbtn')
) $('#searchbtn').click(mudaPesq)

async function principal() {
    // checa se a lista de animes existe e se ela está atualizada
    if (!current.animeList) {
        await getAnimeListFromApi()
    }
    else checkListStatus()

    montAnimeList()
    
    nextPage.activate()

    set.Local('appVersion', '1.2.8')
    //End of principal()

    function showLastSearch() {
        current.searchBar
           .value = get.Session('lastSearch')
        mudaPesq()
        pesquisa()
    }

    async function checkListStatus() {
        const animeList = current.animeList.data
        // Recebe o tamanho do array salvo na local Storage
        const i = animeList.length
    
        //Recebe a ultima pagina página salva na local Storage
        const LastPage = {
            data: animeList[i-1],
            Next: animeList[i-2].Next
        }
        // Recebe da session a página salva, caso exista
        let lastPageFromApi = get.Session(LastPage.Next)
        if (!lastPageFromApi) {
            // Recebe da api a última página salva na session, para comparação
            lastPageFromApi = await axios
                .get(
                    api(Endp.anime + LastPage.Next)
                )
                .then(res => res.data)
            
            if (typeof lastPageFromApi == 'string')
                lastPageFromApi = fixApiBug(lastPageFromApi)
    
            // Salva na sessão o resultado do axios para evitar sobrecarga na api
            set.Session(LastPage.Next, lastPageFromApi)
        }
    
        // Analiza se ainda existem itens a serem adicionados a lista de animes
        if ( existNextPage() || newAnimeAdd() ) 
            getAnimeListFromApi(LastPage.Next)

        function existNextPage() {
            return (!!lastPageFromApi.Next)
        }

        function newAnimeAdd() {
            return (!!lastPageFromApi.anime.length > LastPage.data.animes.length)
        }
    }

    function montAnimeList() {
        if (current.lastSearch)
            showLastSearch()
        else 
            showAnimeList()
    }
}

async function getAnimeListFromApi(page = 0){
    await callApi()
    
    createSearchEngine()
    //End of getAnimeListFromApi()
    
    async function callApi() {
        await axios
            .get(
                api(Endp.anime + page)
            )
            .then(res => createLocalAnimeList(res.data))
            .catch(console.warn)
    }

    function createLocalAnimeList(data) {
        // Recebe da localStorage a lista mais recente, caso nao exista
        // Cria uma do zero
        let animeList = get.Local('animeList') ||
            {created: get.Date(), data: []}

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

        // Adiciona à lista de animes o retorno do axios "comprimido"
        animeList.data[page/50] = {
            animes,
            'Next': data.Next
        }

        // Salva na Local Storage a lista de Animes
        set.Local('animeList', animeList)

        // Aciona Recursividade caso exista mais itens para salvar
        if (data.Next)
            getAnimeListFromApi(data.Next)

        createSearchEngine()
    }

    function createSearchEngine() {
        const animeList = get.Local('animeList')
        if (animeList) {
            // Array auxiliar usado para receber os valores
            let auxArray = []
    
            // Percorre todas as linhas de dados dentro do array salvo na localStorage
            for (const row of get.Local('animeList').data) {
    
                //percorre cada anime dentro da linha
                for (const item of row.animes) {
    
                    // Remove "keys" do objeto e adiciona o array que o método retorna isso
                    // Reduz o espaço usado  a lista e acelera a velocidade da pesquisa.
                    auxArray.push(item)
                }
            }
    
            // Organiza o array do motor de busca em ordem alfábetica
            auxArray
                .sort((a, b) => {
                    if ( a[1] > b[1] ) return 1
                    if ( b[1] > a[1] ) return -1
                    return 0
                })
            
            // Salva na localStorage o motor de buscas otimizado
            set.Local('searchEngine', auxArray)
        }
    }
}

function showAnimeList(page = 0) {
    deleteOldAnimeCards()
    
    const currentPage = (
        get.Local('animeList').data[page]
    )

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
                currentPage.Next/50
            )
        else 
            del.fromSession('nextPage')
    }
}

const current = {
    // Recebe lista de animes da LocalStorage, caso exista
    animeList: get.Local('animeList'),

    // Verifica se alguma busca foi feita pelo usuário anteriormente
    lastSearch: get.Session('lastSearch'),

    //Caminho direto para a searchBar na página
    searchBar: get.Id('searchbar')
}

;(principal)()

export default showAnimeList
