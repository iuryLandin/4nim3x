import { getEpisodeList, getVideoQualities } from '../common/api.js'
import { saveEpisode } from './js/utils/saveProgress.js'
import getSettings from '../../settings/settings.js'
import { loadTheme } from '../../themes/themes.js'
import { hideLoading } from '../../js/loading.js'
import { getters } from '../common/States.js'
import { get } from '../../js/utils/CzarK.js'

import './js/player.js'

const settings = getSettings()
const { anime, ep } = get.UrlData()

const ASC = 'afterbegin'
const DES = 'beforeend'
const VIDEO_TITLE = $('#video-title')
const QLTS_LIST = get.Id('quality_list')
const EPSD_LIST = get.Id('episode-list')
const QUALIT_CTNR = $('.quality_modal_container')
const NO_NEXT = `<div class="episode" onclick="alert('você chegou ao fim da lista')">Não há próximo episódio</div>`

;(function openPage() {
  saveEpisode()
  loadTheme()

  getEpisodeList()
    .then(loadNextEpisodeList)
    .then(loadVideoData)

  getVideoQualities()
    .then(loadVideoQualities)
    .then(hideLoading)
})()


function loadNextEpisodeList() {
  const episodeList = getters.getEpisodeList()
  const nextToWatch = episodeList.filter(({ Id }) => Id > ep)

  if (!nextToWatch.length)
    EPSD_LIST.innerHTML = NO_NEXT

  else
    for (const episode of nextToWatch) {
      const episodeCard = getEpisodeCard(episode)
      EPSD_LIST.insertAdjacentHTML(ASC, episodeCard)
    }
}

function loadVideoQualities() {
  const videoQualities = getters.getEpsdQualits()

  for (const quality of videoQualities) {
    const qualityCard = getQualityCard(quality)
    QLTS_LIST.insertAdjacentHTML(DES, qualityCard)
  }

  QUALIT_CTNR.fadeIn()
}

function loadVideoData() {
  const episodeList = getters.getEpisodeList()
  const currentEpsd = episodeList.filter(eps => eps.Id == ep)
  const episodeName = currentEpsd[0].Nome

  VIDEO_TITLE.text(episodeName)
}

function getQualityCard({ Nome, Endereco }) {
  return `<div
    class='video_option'
    onclick="loadVideo('${ Endereco }')"
  > ${ Nome } </div>`
}

function getEpisodeCard({ Id, Nome }) {
  const watchedList = getters.getWatchedList()
  const watchedStts = watchedList.includes(Id)
  ? 'seen'
  : 'unseen'
  
  return `<a
    href="./index.html?anime=${ anime }&ep=${ Id }"
    class="episode ${watchedStts}"
  > ${ Nome } </a>`
}
