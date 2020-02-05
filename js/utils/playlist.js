import { get, set } from '../frameworks/czark.js'

// Quando for implementar a playlist, lembra de colocar uma chamada pra esse função passando
// o id do episódio pra ela atualizar a playlist com os valores pro episódio atual.
async function createPlaylist(episodeId) {
    // Pega o id do anime atualmente aberto
    const currentAnime = (
        get.Session("currentAnime")
    )

    //pega da session a lista de episodios salva em "setEpsLista()"
    const videos = (
        get.Session(currentAnime)
    )
    
    //procura a posição do episódio atual pra salvar o proximo e o anterior na sessionStorage
    for (let i in videos) {
        if (videos[i].Id == episodeId) {
            set.Session(
                "playlist", {
                    previous: videos[i+1],
                    next: videos[i-1]
                }
            )
        }
    }
}

export default createPlaylist