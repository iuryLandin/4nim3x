const oldAnimeList      = get.Local("animes")
const oldReleaseList    = get.Local("animeLanc")
const oldSearchEngine   = get.Local("searchEngine")
const atualizado        = get.Local("updated");
let id = 0;

(()=> checkUpdate())()
function checkUpdate() {
    if (!atualizado) {
        console.log("limpando dados antigos...")
        updateOldData()
    }else console.log("O app ja estava atualizado! =D")
}

async function updateOldData(){
    for (const anime of oldSearchEngine) {
        if (!!get.Local(anime[0])) {
            id = anime[0]
            let oldStyle = get.Local(id)

            let animeEpisodes = await axios
                .get(Endp.getApi(Endp.episo+id))
            
            
            for(const data of animeEpisodes.data) {
                for(const epName of oldStyle) {
                    if (data.Nome == epName) marcarEp(`${data.Id}`)
                }
            }
            remove.fromLocal(id)
        }
    }
    remove.fromLocal("animes")
    remove.fromLocal("animeLanc")
    remove.fromLocal("motorDeBusca")
    set.Local("updated", "true")
    console.log("app atualizado com sucesso")
}

function marcarEp(episodeId) {
    //Recebe da localStorage o array atual com os dados dos animes vistos
    let watchedList = get.Local("watchedList")

    // Caso seja o primeiro anime sendo salvo progresso, é criada uma estrutura
    // do zero, usando "object Literals"
    if (!watchedList) {
        watchedList = {}
        watchedList[id] = []
    }

    // Caso nao seja o primeiro anime sendo salvo progresso, mas o array ja exista
    // com outros animes, é adicionado apenas a nova entrada de valores
    if (!watchedList[id]) watchedList[id] = []

    // Antes de salvar o episodio dentro do array, é verificado se já não existe
    // para evitar episodios duplicados.
    if (!watchedList[id].includes(episodeId))
        watchedList[id].push(episodeId)

    // Finalmente é salvo na localStorage a nova lista com o episódio clicado salvo
    set.Local("watchedList", watchedList)
}