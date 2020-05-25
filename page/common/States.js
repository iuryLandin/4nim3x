import { get } from '../../js/utils/CzarK.js'

const WatchdList = 'watchedList'

const state = {
  episodeList: [],
  animeDetail: {},
  watchedList: [],
  videoQualit: []
}

const getAnimeDetail = () => {
  return state.animeDetail
}

const getEpisodeList = () => {
  return state.episodeList
}

const getEpsdQualits = () => {
  return state.videoQualit
}

const getWatchedList = () => {
  return state.watchedList
}

const setAnimeDetail = details => {
  state.animeDetail = details
}

const setEpisodeList = epsdList => {
  state.episodeList = epsdList
}

const setEpsdQualits = qualities => {
  state.videoQualit = qualities
}

const loadWatchedList = id => {
  const FULL_WATCHED_LIST = get.Local(WatchdList) || {}
  const ANIM_WATCHED_LIST = FULL_WATCHED_LIST[id] || []
  
  state.watchedList = ANIM_WATCHED_LIST
}

export const getters = {
  getEpisodeList,
  getWatchedList,
  getAnimeDetail,
  getEpsdQualits
}

export const mutations = {
  setEpisodeList,
  setAnimeDetail,
  setEpsdQualits
}

export {
  loadWatchedList
}