import { truncate } from '../utils/CzarK.js'

/**
 * Função que cria um card de anime
 * @param {{Id: String, Nome: String, Imagem: String}} param0 
 */
export const getAnimeCard = ({ Id, Nome, Imagem }) => {
  return `<a href="page/anime/index.html?anime=${Id}" class="anime">
    <img src="${Imagem}" draggable="false" class="img">
    <div class="anime-title">${truncate(Nome, 15)}</div>
  </a>`
}
