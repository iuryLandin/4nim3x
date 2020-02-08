import { get, set } from '../frameworks/czark.js'

// Quando for implementar a playlist, lembra de colocar uma chamada pra esse função passando
// o id do episódio pra ela atualizar a playlist com os valores pro episódio atual.
function createPlaylist(episodeId) {
    const episodes = getEpisodesOnPage()
    
    savePlaylist()
    //End of createPlaylist()
    
    function getEpisodesOnPage() {
        const currentAnime = (
            get.Session('currentAnime')
        )

        return (
            get.Session(currentAnime)
        )
    }

    function savePlaylist() {
        for (let i=0; i < episodes.length; i++) {
            if (episodes[i].Id == episodeId) {
    
                const playlist = {
                    'previous': episodes[i+1] || null,
                    'next': episodes[i-1] || null
                }
    
                set.Session('playlist', playlist)
            }
        }
    }
}

export default createPlaylist