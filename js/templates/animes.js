import { safeImg } from '../utils/endpoints.js'
import { get, truncate } from '../frameworks/czark.js'

function createAnimeCard(animeData) {
    const anime = (
       `<div class='anime'>
            <a href="anime.html?id=${animeData[0]}">
                <img
                    src="${safeImg(animeData[3])}"
                    onclick="loading(true)"
                />
            </a>
            <legend>${truncate(animeData[1], 15)}</legend>
        </div>`
    )


    // Não me pergunta, não tenho ideia de pra que isso aqui serve, mas tinha um erro que colocando isso resolveu, então deixa assim pff ;-;
    try {
        get.Id('lista')
            .insertAdjacentHTML('beforeEnd', anime);
    }catch {
        err => console.log(err)
    }
}

export default createAnimeCard