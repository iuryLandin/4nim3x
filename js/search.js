import devFunc from './utils/devFunc.js'

var searchEngine = new Array()
// Caminho para a barra de pesquisa
const searchbar = get.Id('searchbar')
// Escutador de eventos de input na barra de pesquisa
if (searchbar) listen('input', search, searchbar)

// função que executa a busca ou a 
function search() {
    loadSearchEngine()

    // organiza em ordem alfabética a lista de pesquisa
    sortSearchEngine()

    // pega o valor digitado pelo usuário na barra de pesquisa
    const query = searchbar.value

    // caso a barra de pesquisa fique vazia, é carregada a tela padrão
    if (!query.length)
        load[defaultLaunch]()

    // senão, é feita a pesquisa normalmente 
    else {
        // busca uma função de auditória com o nome da pesquisa, e executa caso encontre
        // ignora a pesquisa caso execute alguma função de auditória
        const dev = devFunc[query]
        if (dev) dev()
        if (dev) return
        
        // localiza todos os animes que correspondem a pesquisa
        const result = findAnimes( query.toLowerCase() )
        if (result.length < 300)
            loadSearchResults(result)
    }
}

function findAnimes(query) {
    // realiza uma filtragem de todos os animes que possuem o termo digitado 
    return searchEngine.filter( ( { Nome } ) => Nome.toLowerCase().includes(query) )
}

function loadSearchResults(animes) {
    // atualiza o contexto da variável para a realidade atual
    currentScreen = 'search'

    // apaga todos os animes que estão na tela, caso exista algum, para carregar a lista
    get.Queries('.anime').forEach(anime => anime.remove())

    // reseta o valor da proxima página a ser carregada na função home()
    nextPage = 0

    // itera sobre a lista de lancamentos para carregar os cards
    for (const anime of animes) {
        let animeCard = getAnimeCard(anime)
        get.Id('anime-list').insertAdjacentHTML('beforeend', animeCard)
    }

    // adicionam um "charme as opções na tela pra demonstrar em qual tela o app está atualmente aberto"
    get.Queries('.load-all').forEach(item => item.classList.remove('selected'))
    get.Queries('.load-rel').forEach(item => item.classList.remove('selected'))
}

function loadSearchEngine(pos = 0) {
    // reseta o mecanismo de busca para evitar animes duplicados
    if (!pos) searchEngine = new Array()
    // soicita a localStorage a primeira pagina do mecanismo de busca
    let localSearchEngine = get.Local(`searchengine-${pos}`)

    // verifica se a página `searchengine-${pos}` existe na localStorage
    if (localSearchEngine) {
        // adiciona os animes da página ao mecanismo de busca
        searchEngine = [...searchEngine,...localSearchEngine]

        // recursividade para solicitar a pŕoxima página na localStorage
        loadSearchEngine(++pos)
    }
    
}

function sortSearchEngine() {
    searchEngine = searchEngine.sort((a, b) => {
        a = a.Nome.toLowerCase()
        b = b.Nome.toLowerCase()
        if ( a > b ) return ( 1)
        if ( b > a ) return (-1)
        return ( 0)
    })
}

function getAnimeById(animeId) {
    loadSearchEngine()

    return searchEngine.filter(({ Id }) => Id == animeId)
}

export {
    loadSearchEngine,
    loadSearchResults,
    sortSearchEngine,
    getAnimeById,
    searchEngine
}