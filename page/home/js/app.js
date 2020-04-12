// As seguintes variáveis vão receber a lista de animes que serão exibidos
var animeList = new Array()
var releaseList = new Array()
// Recebe o mecanismo de busca
var searchEngine = new Array()
// Recebe das configurações, qual tela deve ser carregada quando o app abrir
const { defaultLaunch } = settings
// salva qual a tela está sendo exibida para prevenir o carregamento de animes ao fim do scroll da página fora da lista de animes
var currentScreen = defaultLaunch
// variável que armazena qual a próxima tela sera carregada (só é usada quando se está exibindo a lista completa)
var nextPage = 0

async function getLists(pos = 0) {
    // carrega a lista de lançamentos
    releaseList = await getApiData('https://qgeletronicos.com/animeapi/lancamento')
    
    // carrega a lista de animes na posição que a função foi chamada
    let { anime, Next: next } = await getApiData(`https://qgeletronicos.com/animeapi/anime?next=${pos}`)
    animeList[pos/50] = anime
    
    // dispara recursividade para carregar a lista completa de animes
    if (next) getLists(next)

    // Esconde a mensagem de carregamento da busca de animes
    else $('#loading-list').hide()

    // inicia o processo de atualização do mecanismo de busca para mantê-lo atualizado
    // essa condicional é proposital, desse modo a lista antiga só é atualizada quando a atual está completa.
    if (next) createSearchEngine()
    // Salva a lista na localStorage para ser possível acessar após o app abrir a primeira vez
    // e nao precisar carregar toda vez que o app abrir.
    else set.Local('searchEngine', searchEngine)

    // Esconde o modal de carregamento, liberando o acesso do usuário à pagina 
    hideLoading()
}

// Objeto que contêm o método de carregamento da tela de lançamentos e da tela em ordem de 
const load = {
    home() {
        // apaga todos os animes que estão na tela, caso exista algum, para carregar a lista
        if(!nextPage) get.Queries('.anime').forEach(anime => anime.remove())

        // itera sobre a lista de animes para carregar os cards
        for (const anime of animeList[nextPage]) {
            let animeCard = getAnimeCard(anime)
            get.Id('anime-list')
                .insertAdjacentHTML('beforeend', animeCard)
        }
        // adicionam um "charme as opções na tela pra demonstrar em qual tela o app está atualmente aberto"
        get.Queries('.load-all').forEach(item => item.classList.add('selected'))
        get.Queries('.load-rel').forEach(item => item.classList.remove('selected'))

        // atualiza o contexto da variável para a realidade atual
        currentScreen = 'home'

        // atualiza o contador de próxima página
        nextPage++
    },
    releases() {
        // apaga todos os animes que estão na tela, caso exista algum, para carregar a lista
        get.Queries('.anime').forEach(anime => anime.remove())

        // reseta o valor da proxima página a ser carregada na função home()
        nextPage = 0

        // itera sobre a lista de lancamentos para carregar os cards
        for (const anime of releaseList) {
            let animeCard = getAnimeCard(anime)
            get.Id('anime-list').insertAdjacentHTML('beforeend', animeCard)
        }
        // adicionam um "charme as opções na tela pra demonstrar em qual tela o app está atualmente aberto"
        get.Queries('.load-all').forEach(item => item.classList.remove('selected'))
        get.Queries('.load-rel').forEach(item => item.classList.add('selected'))

        // atualiza o contexto da variável para a realidade atual
        currentScreen = 'releases'
    }
}

function createSearchEngine() {
    // itera sobre todas as páginas que estão contidas dentro da lista de animes
    for (const page of animeList) {
        // itera sobre todos os animes contidos em cada página da lista de animes
        for (const anime of page) {
            // Filtra as informações mais importantes da lista de animes para reduzir seu tamanho e acelerar a pesquisa
            let { Id, Nome, Desc, Imagem } = anime
            // Adiciona ao mecanismo de buscas o anime que está atualmente no ciclo de iteração.
            searchEngine.push({ Id, Nome, Desc, Imagem })
        }
    }

    // organiza a engine em ordem alfabética
    searchEngine.sort((a, b) => {
        if ( a[1] > b[1] ) return ( 1)
        if ( b[1] > a[1] ) return (-1)
        return ( 0)
    })
}

// função que devolve o card de cada anime, minimifiquei pra melhorar a identação
function getAnimeCard({ Id, Nome, Desc, Imagem }) {
    return `<a href="/page/anime/?id=${Id}&name=${Nome}&desc=${Desc}&img=${Imagem}" class="anime"><img src="${Imagem}" draggable="false" class="img"><div class="anime-title"><h3>${truncate(Nome, 15)}</h3></div></a>`
}

// encapsulamento usado para acesso à api
async function getApiData(url) {
    return await $.get(url).fail(console.warn)
}

// Executa a função assíncrona getList, e, ao final, é executa também a função que irá
// carregar os lancamentos ou a lista alfabética na tela com base nas configurações.
getLists()
    .then(load[defaultLaunch])
    .then(function loadNextPage() {
        // Adiciona uma função que é executada toda vez que ocorre uma rolagem na página
        // serve para carregar a lista automaticamente enquanto a página vai sendo rolada
        window.onscroll = function loadNextPage() {
            // Eu explicaria o que acontece aqui se mas peguei do google, só sei que basicamente,
            // recebe true se a rolagem ta no fim da página e se tem próxima página pra carregar.
            let endOfPage = ( (window.innerHeight + window.scrollY) >= d.body.offsetHeight )
                && (animeList.length > nextPage)
                && (currentScreen == 'home')
            
            // verifica se a variável anterior é true pra carregar a próxima página da lista de animes
            if (endOfPage) load.home(nextPage)
        }
    })
    .then(function loadSwapScreens() {
        // essa função ativa a mudança de telas via clique nos botões da tela inicial
        $('.load-all').click(load.home)
        $('.load-rel').click(load.releases)
    })
    .catch(console.warn)