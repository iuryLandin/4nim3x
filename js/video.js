const Endp = new EndPoints();

// Recebe o id do video que será carregado
const id   = location.search.split("=")[1];
// Recebe o nome do episodio que será reproduzido
const nome = location.search.split("=")[2];
(() => loadVideoOptions())()

function loadVideoOptions() {
    // adiciona o nome do episódio atual na tela
    get.Id("episodioAtual").innerHTML = decodeURIComponent(nome)

    loading(true)
    axios
        .get(Endp.getApi(Endp.video + id))
        .then(res => {
            // Itera sobre os resultados para exibí-los na tela
            for(const row of res.data) {
                // Cria o HTML de cada opção de qualidade de vídeo
                const option = `
                <a href="javascript: playVid('${row.Endereco}')">
                    <li class="opcoes">${row.Nome}</li>
                </a>`
                
                // Adiciona à página esse HTML 
                get.Id("lista-de-opcoes")
                    .insertAdjacentHTML("beforeEnd", option)
            }
        })
        .catch(err => console.warn(err))
        .finally(loading(false))
}

function playVid(url) {
    let videoPlayer = get.Id("videoPlayer")
    // Adiciona a URL do video ao player
    videoPlayer.src = url

    // Inicia o carregamento do video
    videoPlayer.play()

    //Exibe o vídeo para o usuario
    videoPlayer
        .style
        .display = "block"
}