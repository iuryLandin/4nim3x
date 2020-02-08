import { Endp, getApiLink as api } from '../utils/endpoints.js'
import { get } from '../frameworks/czark.js'
import loading from '../utils/loading.js'
import loadVid from './utils/loadVid.js'

const urlData = location.search.split("=")
const video = {
    // Recebe o id do video que será carregado
    id: urlData[1],
    // Recebe o nome do episodio que será reproduzido
    nome: urlData[2],
}


async function principal() {
    loading(true)

    applyEpDataOnPage()

    await mountOptionsList()

    loading(false)

    function applyEpDataOnPage() {
        $("#episodioAtual").html(decodeURIComponent(video.nome))
    }

    async function getVideOptions() {
        return await axios
            .get(
                api(Endp.video + video.id)
            )
            .then(res => res.data)
            .catch(console.warn)
    }

    async function mountOptionsList() {
        const options = await getVideOptions()

        for(const item of options) {
            // Cria o HTML de cada opção de qualidade de vídeo
            const elem = (
               `<div id='${item.Id}'>
                    <li class="opcoes">${item.Nome}</li>
                </div>`
            )
            
            insertElemOnPage()
            
            playVid()

            function insertElemOnPage() {
                get.Id("lista-de-opcoes")
                    .insertAdjacentHTML("beforeEnd", elem)
            }

            function playVid() {
                $(`#${item.Id}`).click(() => loadVid(item.Endereco))
            }
        }
    }
}

;(principal)()