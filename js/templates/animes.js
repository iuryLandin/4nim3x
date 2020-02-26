import { get, truncate } from '../frameworks/czark.js'

function createAnimeCard(animeData) {
    const baseAnimeUrl = !location
        .pathname
        .includes('releases')
            ? './'
            : '../../' 

    const anime = (
       `<div class='anime'>
            <a href="${baseAnimeUrl}page/anime/?id=${animeData[0]}">
                <img src="${animeData[3]}"/>
            </a>
            <legend>${truncate(animeData[1], 15)}</legend>
        </div>`
    )

    // Não me pergunta, não tenho ideia de pra que isso aqui serve, mas tinha um erro que colocando isso resolveu, então deixa assim pff ;-;
    try {
        get.Id('lista')
            .insertAdjacentHTML('beforeEnd', anime);
    }catch {
        err => console.warn(err)
    }
}

export default createAnimeCard