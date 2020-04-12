import devFunc from './utils/devFunc.js'

var searchEngine = new Array()
// Caminho para a barra de pesquisa
const searchbar = get.Id('searchbar')
// Escutador de eventos de input na barra de pesquisa
listen('input', search, searchbar)

// função que executa a busca ou a 
function search() {
    loadSearchEngine()
    // pega o valor digitado pelo usuário na barra de pesquisa
    let query = searchbar.value

    // caso a barra de pesquisa fique vazia, é carregada a tela padrão
    if (!query.length) {
        load[defaultLaunch]()
    }
    // senão, é feita a pesquisa normalmente 
    else {
        // busca uma função de auditória com o nome da pesquisa, e executa caso encontre
        // ignora a pesquisa caso execute alguma função de auditória
        const dev = devFunc[query]
        if (dev) dev()
        if (dev) return
        
        // localiza todos os animes que correspondem a pesquisa
        let result = findAnimes(query.toLowerCase())
        if(result.length < 300)
            loadSearchResults(result)
        $('#loading-list').hide()
    }
}

function findAnimes(query) {
    // realiza uma filtragem de todos os animes que possuem o termo digitado 
    return searchEngine.filter(anime => anime.Nome.toLowerCase().includes(query))
}

function loadSearchResults(animes) {
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

    // atualiza o contexto da variável para a realidade atual
    currentScreen = 'search'
}

function loadSearchEngine(pos = 0) {
    // reseta o mecanismo de busca para evitar animes duplicados
    if (!pos) searchEngine = new Array()
    // soicita a localStorage a primeira pagina do mecanismo de busca
    let localSearchEngine = get.Local(`searchengine-${pos}`)

    // verifica se essa página existe
    if (localSearchEngine) {
        // adiciona os animes da página ao mecanismo de busca
        searchEngine = [...searchEngine,...localSearchEngine]

        // recursividade para solicitar a pŕoxima página na localStorage
        loadSearchEngine(++pos)
    }
}