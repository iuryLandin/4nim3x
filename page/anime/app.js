import { loadTheme, loadCostumTheme } from '../../themes/themes.js'
import { getAnimeDetail, getEpisodeList } from '../common/api.js'
import { get, truncate } from '../../js/utils/CzarK.js'
import getSettings from '../../settings/settings.js'
import { hideLoading } from '../../js/loading.js'
import { getters } from '../common/States.js'

import '../../themes/themes.js'
import '../../js/loading.js'

const settings = getSettings()
settings.sub2SortUpdate(loadEpisodeList)

loadTheme(settings.getTheme())
loadCostumTheme(settings.getCostumTheme())

const { anime } = get.UrlData()

const ASC = 'A - Z'
const DSC = 'Z - A'
const DESCRIPTIONS = $('.desc')
const IMGs_ON_PAGE = $('.img-place')
const SORT_ORD_BTN = $('.sort-mode')
const _ANIME_TITLE = $('.anime-title')
const MOBL_DESCRPT = $('.desc-mobile')
const DESK_DESCRPT = $('#desc-desktop')
const MOBL_ALL_BTN = $('#see-all-mobl')
const DESK_ALL_BTN = $('#see-all-desk')
const FULL_DSC_CTN = $('#full-desc')
const FULL_DESCRPT = $('.full-desc-modal')
const EPISOD_CNTNR = get.Queries('.episode-list')
const DESCRIPTION = $('.meta-description')


;(function loadPage() {
  // carrega os dados do anime na página
  getAnimeDetail()
    .then(loadAnimeDetails)
    .then(hideLoading)
  
  // obtém da api e carrega a lista de apisodios na página
  getEpisodeList()
    .then(loadEpisodeList)

  //carrega as ações clicáveis na página
  SORT_ORD_BTN.click(settings.togleSortMode)
  DESCRIPTIONS.click(showFullDescptn)
})()

function loadAnimeDetails() {
  const { Nome, Desc, Imagem } = getters.getAnimeDetail()
  
  document.title = Nome
  DESCRIPTION.text(Desc)
  _ANIME_TITLE.text(Nome)
  FULL_DESCRPT.text(Desc)
  IMGs_ON_PAGE.attr('src', Imagem)
  MOBL_DESCRPT.text( truncate(Desc, 220) )
  DESK_DESCRPT.text( truncate(Desc, 340) )
  
  if (Desc.length < 220) MOBL_ALL_BTN.hide()
  if (Desc.length < 340) DESK_ALL_BTN.hide()
}

function loadEpisodeList() {
  const episodeList = getters.getEpisodeList()
  const sortMode = settings.getSortMode()
  
  // recebe das configurações o modo de ordenar os episódios escolhido pelo usuário
  EPISOD_CNTNR.forEach(ctnr => ctnr.innerHTML = '')

  const SORT_MODE = (sortMode != 'beforeend')
  ? ASC
  : DSC

  SORT_ORD_BTN.text(SORT_MODE)

  for (const epsd of episodeList) {
    const episodeButtom = getEpisodeCard(epsd)
    for (const container of EPISOD_CNTNR) {
      container.insertAdjacentHTML(sortMode, episodeButtom)
    }
  }
}

function getEpisodeCard({ Id, Nome }) {
  const watchedList = getters.getWatchedList()
  const watchedStts = watchedList.includes(Id)
  ? 'seen'
  : 'unseen'

  return `<a
    href='../video/index.html?anime=${ anime }&ep=${ Id }'
    class='episode ${watchedStts}'> ${ Nome } </a>`
}

function showFullDescptn() {
  FULL_DSC_CTN.fadeIn()
}

const mobileShare = () => {
  const url = location.href
  const text = 'Ei! Acho que vai gostar anime! Se liga:'
  const { Nome: title } = getters.getAnimeDetail()

  // alert(text)

  navigator.share({ title, text, url })
    .then(() => alert('Obrigado por compartilhar o app! =)'))
    .catch(console.error);
}

;(function loadShare() {
  const FAB = $('.fab-share')
  // alert(JSON.stringify(navigator))
  FAB.click(mobileShare)

  if (!navigator.share) FAB.hide()
})()
