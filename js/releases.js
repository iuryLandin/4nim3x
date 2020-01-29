(checkLocalReleaseList)()

async function checkLocalReleaseList() {
    // Recebe lista de animes da LocalStorage, caso existe
    const releaseList = get
        .Local("releaseList")

    // Série de checagens do estado da lista com base no retorno
    if (!releaseList) {
        await createLocalReleaseList()
    }else if (get.Date() > releaseList.expireDate) {
        remove.fromLocal("releaseList")
        await createLocalReleaseList()
    }

    // Exibe a lista depois de conferir se a lista existe e ainda tem validade
    showReleaseList() 
    
}

function showReleaseList() {
    // debugger
    loading(true)

    const releases = get.Local("releaseList").data

    for (const item of releases) {
        // Cria uma div com a classe "anime" na variável "anime"
        let anime = d.createElement("div")
        anime.classList.add("anime")

        // Insere os dados do anime na div recem criada
        anime.insertAdjacentHTML("beforeEnd", `
            <a href="anime.html?id=${item[0]}">
                <img src="${Endp.safeImg(item[4])}"/>
            </a>
            <legend>${truncate(item[1], 15)}</legend>`)
        
            // Adiciona a div na tela
        get.Id("lista").appendChild(anime)
    }
    
    loading(false)
}

async function createLocalReleaseList() {
    loading(true)

    await axios
        .get(Endp.getApi(Endp.lanca))
        .then(res => {
            // Cria a estrutura que será usada para salvar a lista de lançamentos
            // Prazo de validade da lista: 1 minuto (60k segundos)
            let releaseList = {"expireDate": get.Date() + 60000, "data": []}

            // Comprime a lista de Lançamentos para reduzir o espaço ocupado no telefone
            for (const row of res.data){
                releaseList.data.push(Object.values(row))
            }

            //salva a lista de processada na LocalStorage
            set.Local("releaseList", releaseList)
            loading(false)
        })
        .catch(console.warn)
}