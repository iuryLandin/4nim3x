import { Endp, getApiLink as api } from '../utils/endpoints.js'
import { get, set, del } from '../frameworks/czark.js'
import createAnimeCard from '../templates/animes.js'
import loading from '../utils/loading.js'

const releaseList = get.Local('releaseList')

async function principal() {
    if (!releaseList) 
        await createReleaseList()
    else if (checkListValidity() )
        await renewReleaseList()

    showReleaseList() 
    
    function checkListValidity() {
        return (get.Date() > releaseList.expireDate)
    }

    async function renewReleaseList() {
        del.fromLocal('releaseList')
        await createReleaseList()
    }

    function showReleaseList() {
        const releases = fixReleases()
        
        for (const anime of releases) {
            createAnimeCard(anime)
        }

        function fixReleases() {
            const animes = get.Local('releaseList').data

            for(let anime of animes) {
                anime = anime.splice(3, 1)
            }

            return animes
        }
    }
    
    async function createReleaseList() {
        loading(true)
    
        await axios
            .get(
                api(Endp.lanca)
            )
            .then(mountList)
            .catch(console.warn)
    
        loading(false)
    
        function mountList(animes) {
            // Cria a estrutura que será usada para salvar a lista de lançamentos
            // Prazo de validade da lista: 1 minuto (60k segundos)
            let releaseList = {
                expireDate: get.Date() + 60000,
                data: []
            }
    
            // Comprime a lista de Lançamentos para reduzir o espaço ocupado no telefone
            for (const anime of animes.data){
                releaseList.data.push(Object.values(anime))
            }
    
            //salva a lista de processada na LocalStorage
            set.Local("releaseList", releaseList)
        }
    }
}

;(principal)()