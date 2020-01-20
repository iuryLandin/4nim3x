const Endp = new EndPoints();
(checkLocalAnimeList)();
set.Local('appVersion', '1.0.1')


async function checkLocalAnimeList() {
    // Recebe lista de animes da LocalStorage, caso existe
    const animeList = get.Local("animeList")

    // Série de checagens do estado da lista com base no retorno
    if (!animeList) await getAnimeListFromApi()
    else chechListStatus()

    // Verifica se alguma busca foi feita pelo usuário anteriormente
    let lastSearch = get
        .Session("lastSearch")
    if(lastSearch) {
        // Refaz a busca para o usuário ter a sensação de continuidade
        mudaPesq()
        searchBar.value = lastSearch
        pesquisa()
    }else showAnimeList()
}

function showAnimeList (pos = 0) {
    loading(true)
    // Analiza se ja existem animes na tela e os remove se necessário
    if (!pos) get
        .Queries(".anime")
        .forEach(elem => elem.remove())

    // Recebe da Local Storage os dados da página que será renderizada na tela
    const page = get.Local("animeList").data[pos]



    // if (get.Id("ver-mais")) get.Id("ver-mais").remove()



    // Percorre todos os itens que serão renderizados
    for (const item of page.animes) {
        // Cria uma div com a classe "anime" na variável "anime"
        let anime = d.createElement("div")
        anime.classList.add("anime")

        // Insere os dados do anime na div recem criada
        anime.insertAdjacentHTML("beforeEnd", `
            <a href="anime.html?id=${item[0]}">
                <img src="${Endp.safeImg(item[3])}"/>
            </a>
            <legend>${truncate(item[1], 15)}</legend>`)
        
            // Adiciona a div na tela
        get.Id("lista").appendChild(anime)
    }
    loading(false)

    // Cria um botão ver mais caso tenha mais animes para exibir na tela
    if (!!page.Next) {
        // let verMais = d.createElement("a")
        // verMais.setAttribute("id", "ver-mais")
        // verMais.setAttribute("href", `javascript: showAnimeList('${page.Next/50}')`)
        // verMais.innerHTML = "CARREGAR MAIS"
        // get.Id("lista").appendChild(verMais)
        set.Session("nextPage", page.Next/50)
    }
    loading(false)
}

async function chechListStatus() {
    const animeList = get.Local("animeList").data
    // Recebe o tamanho do array salvo na local Storage
    const i = animeList.length

    //Recebe a ultima pagina página salva na local Storage
    const localLastPage = animeList[i-1]

    // Recebe o "next" necessário para obter a ultima lista salva na local Storage da API
    const nextOfLP = animeList[i-2].Next

    // Recebe da session a página salva, caso exista
    let lastPageFromApi = get.Session(nextOfLP)
    if (!lastPageFromApi) {
        // Recebe da api a última página salva na session, para comparação
        lastPageFromApi = await axios.get(Endp.getApi(Endp.anime+nextOfLP))
        lastPageFromApi = lastPageFromApi.data
        if (typeof lastPageFromApi == "string") lastPageFromApi = fixApiBug(lastPageFromApi)

        // Salva na sessão o resultado do axios para evitar sobrecarga na api
        set.Session(nextOfLP, lastPageFromApi)
    }

    // Analiza se ainda existem itens a serem adicionados a lista de animes
    if (lastPageFromApi.Next || lastPageFromApi.anime.length > localLastPage.animes.length) {
        createLocalAnimeList(lastPageFromApi, nextOfLP)
    }
    
    createSearchEngine()
}

async function getAnimeListFromApi(pos = 0) {
    await axios
        .get(Endp.getApi(Endp.anime + pos))
        .then(res => createLocalAnimeList(res.data, pos))
        .catch(console.warn)
        .finally(createSearchEngine)
}

function createLocalAnimeList(data, pos) {
    // Recebe da localStorage a lista mais recente, caso nao exista
    // Cria uma do zero
    let animeList = get.Local("animeList") ||
                    {createdDate: get.Date(), data: []}

    // Corrige o problema da ultima página da Api retornar conteudo HTML
    if(typeof data == "string") data = fixApiBug(data)
    
    // Reduz o tamanho da lista de animes salva na Local Storage
    // Transformando-a em array
    let animes = []
    for (const item of data.anime) {
        animes.push(Object.values(item))
    }
    let page = {"animes": animes, "Next": data.Next}

    // Adiciona à lista de animes o retorno do axios "comprimido"
    animeList.data[pos/50] = page

    // Salva na Local Storage a lista de Animes
    set.Local("animeList", animeList)

    // Aciona Recursividade caso exista mais itens para salvar
    if (!!data.Next) getAnimeListFromApi(data.Next)

    createSearchEngine()
}

function createSearchEngine() {
    // Recebe da Local Storage a lista de animes salva para criar o motor de busca
    const animeList = get.Local("animeList") || null

    // Adicionei essa condicional por estarmos lidando com um ambiente assíncrono
    // Houveram casos em que essa função spamava erros então blindei contra isso
    if (animeList) {
        // Array auxiliar usado para receber os valores
        let auxArray = []

        // Percorre todas as linhas de dados dentro do array salvo na localStorage
        for (const row of animeList.data) {

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
        set.Local("searchEngine", auxArray)
    }
}

function fixApiBug(data) {
    let resFixed = data
        .split("</b><br />")

    let arrLength = resFixed.length - 1
    resFixed = JSON.parse(resFixed[arrLength])

    return resFixed
}



let nextPage = {
    load() {
        const scrollPos = window.innerHeight + window.scrollY
        const pageHeight = d.body.offsetHeight
        const nextPage = get.Session('nextPage')
        
        if (scrollPos>=pageHeight && nextPage) {
            showAnimeList(nextPage)
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
};

(nextPage.activate)();