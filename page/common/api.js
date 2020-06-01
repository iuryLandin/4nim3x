import { mutations,loadWatchedList } from './States.js'
import getApiData from '../../js/HTML/getApiData.js'
import { get, set } from '../../js/utils/CzarK.js'

const { anime } = get.UrlData()

export const getAnimeDetail = async () => {
  const animeDetails = get.Session(`d-${anime}`) || await getApiData(`search/${anime}`)
  mutations.setAnimeDetail(animeDetails)
  set.Session(`d-${anime}`, animeDetails)
}

export const getEpisodeList = async () => {
  const episodes = get.Session(`a-${anime}`) || await getApiData(`anime?id=${anime}`)
  mutations.setEpisodeList(episodes)
  set.Session(`a-${anime}`, episodes)
  loadWatchedList(anime)
}

export const getVideoQualities = async () => {
  const { ep } = get.UrlData()
  const videoQualities = get.Session(`v-${ep}`) || await getApiData(`video?id=${ep}`)
  mutations.setEpsdQualits(videoQualities)
  set.Session(`v-${ep}`, videoQualities)
}