const Endp = new EndPoints();
const id = location.search.split("=")[1];
set.Session("currentAnime", id);
var title, desc, img;
(openAnimeDetails)()

async function openAnimeDetails() {
    // Recebe os dados dos animes da localStorage, animes recentes as vezes nao estão salvos
    // então criei uma função que procura o anime na lista de releases, evitando problemas
    const anime = getAnimeById(id)[0]

    // Carrega os dados dos animes na tela
    setAnimeDetails(anime)

    // Procura e exibe os episodios do anime escolhido
    await getEpisodes()
    loading(false)
}

function setAnimeDetails(data) {
    // Salva os dados dos anime para a função de compartilhar
    [title, desc, img] = [data[1], data[2], data[3]]

    // Carrega os dados na página
    let safeImg = Endp.safeImg(img)
    $("#titulo").html(title);
    $("#desc")  .html(`<div class="descricao">${desc}</div>`);
    $(".back")  .css('background-image', `url(${safeImg})`);
    $("#poster").attr('src', safeImg);
}

async function getEpisodes() {
    loading(true)

    // Testa se o anime ja foi aberto na sessão antes de carregar da API
    if (get.Session(id)) {
        // Exibe na tela os episódios salvos na sessionStorage
        showAnimeEpisodes(get.Session(id))
    }else {
        await axios
            .get(Endp.getApi(Endp.episo + id), headAxios)
            .then(res => {
                // Recebe os dados da api e repassa pra função que os exibe em tela
                showAnimeEpisodes(res.data)

                // Salva a lista recebida na sessionStorage para reduzir carga na API
                set.Session(id, res.data)
            })
            .catch(err => console.warn(err))
    }
}

// !!!!!!!
function showAnimeEpisodes(episodes) {
    get.Id("lista-de-episodios").innerHTML = ""
    // Itera sobre a lista de episódios para exibí-los em tela
    for (const episode of episodes) {
        let style = getStyle2Ep(episode.Id)
        // Gera o elemento HTML que será inserido na página
        const epItem = `
            <a href="video.html?id=${episode.Id}=${episode.Nome}">
                <li onclick="marcarEp('${episode.Id}')"
                    class="${style}">${episode.Nome}</li>
            </a>`
        
        // Insere na página o elemento HTML com os dados do episodio
        get.Id("lista-de-episodios")
            .insertAdjacentHTML("beforeEnd", epItem)
    }
}

async function marcarEp(episodeId) {
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

    // Chama a função que cria a playlist com base no episódio clicado
    setPlaylist(episodeId)

    // Finalmente é salvo na localStorage a nova lista com o episódio clicado salvo
    set.Local("watchedList", watchedList)
}

function getStyle2Ep(episodeId) {
    // Recebe a lista de animes vistos da localStorage
    let watchedList = get.Local("watchedList")

    // Confere se existe alguma
    if (!watchedList) return "episodio"

    // Confere se o anime ja foi salvo alguma vez
    if (!watchedList[id]) return "episodio"

    // Confere se o episodio está na lista de episodios já vistos
    if (watchedList[id].includes(`${episodeId}`)) return "episodio-visto"

    // retorno padrão caso tudo falhe
    // nunca vai entrar, mas tá ai se precisar....
    return "episodio"
}