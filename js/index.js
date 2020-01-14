const Endp = new EndPoints();
(() => checkLocalAnimeList())()


async function checkLocalAnimeList() {
    // Recebe lista de animes da LocalStorage, caso existe
    const animeList = get.Local("animeList") || null

    // Série de checagens do estado da lista com base no retorno
    if (!animeList) {
        await createLocalAnimeList()
    }else if (get.Date() > animeList.expireDate) {
        remove.fromLocal("animeList")
        await createLocalAnimeList()
    }

    // Exibe a lista depois de conferir se a lista existe e ainda tem validade
    showAnimeList()
}

function showAnimeList (pos = 0) {
    loading(true)
    // Analiza se ja existem animes na tela e os remove se necessário
    if (!pos) get.Queries(".anime").forEach(elem => elem.remove())

    // Recebe da Local Storage os dados da página que será renderizada na tela
    const page = get.Local("animeList").data[pos]

    if (get.Id("ver-mais")) get.Id("ver-mais").remove()
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
        let verMais = d.createElement("a")
        verMais.setAttribute("id", "ver-mais")
        verMais.setAttribute("href", `javascript: showAnimeList('${page.Next/50}')`)
        verMais.innerHTML = "CARREGAR MAIS"
        get.Id("lista").appendChild(verMais)
    }
    loading(false)
}

async function createLocalAnimeList(pos = 0) {
    loadingAnimes(true)

    await axios
        .get(Endp.getApi(Endp.anime+pos))
        .then(res => {
            // Recebe da localStorage a lista mais recente, caso nao exista
            // Cria uma do zero
            let animeList = get.Local("animeList") ||
                            {"expireDate": get.Date() + (1000 * 3600 * 24 * 15), "data": []}

            let data = res.data

            // Corrige o problema da ultima página da Api retornar conteudo HTML
            if(typeof data == "string") data = fixApiBug(res.data)
            
            // Reduz o tamanho da lista de animes salva na Local Storage
            // Transformando-a em array
            let animes = []
            for (const item of data.anime) {
                animes.push(Object.values(item))
            }
            let page = {"animes": animes, "Next": data.Next}

            // Adiciona à lista de animes o retorno do axios "comprimido"
            animeList.data.push(page)

            // Salva na Local Storage a lista de Animes
            set.Local("animeList", animeList)

            // Aciona Recursividade caso exista mais itens para salvar
            if (!!res.data.Next) createLocalAnimeList(data.Next)
            else loadingAnimes(false)

            createSearchEngine()
        })
        .catch(err => console.warn(err))
        .finally(createSearchEngine())
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