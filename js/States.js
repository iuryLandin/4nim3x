const state = {
  animList: [],
  releases: [],
  searchRes: [],
  nextPage: 0,
  currScrn: null,
  inputTmr: null,
  ldngNxSc: false,
  version: '2.0.0'
}

const getReleases = () => state.releases
const getNextPage = () => state.nextPage
const getInputTimer = () => state.inputTmr
const updateNextPage = () => ++state.nextPage
const getCurrentScreen = () => state.currScrn
const getSearchResults = () => state.searchRes
const getLoadingStatus = () => state.ldngNxSc
export const getAppVersion = () => state.version

const getAnimeList = () => {
  const page = getNextPage()
  return state.animList[page]
}

const setInputTimer = id => { state.inputTmr = id }
const resetNextPage = () => { state.nextPage = 0 }
const setSearchResult = results => { state.searchRes = results }
const toogleLoadingNextScrn = () => { state.ldngNxSc = !state.ldngNxSc }

/**
 * Add the releases from API to the page
 * @param {[]} rlsList save release list from api to local state
 */
const setReleases = rlsList => { state.releases = rlsList }

const setAnimeList = (anime) => {
  const page = getNextPage()
  state.animList[page] = anime
}

/**
 * Update the current Screen loaded at the page
 * @param {String} newScreen 
 */
const setCurrentScreen = newScreen => { state.currScrn = newScreen }


export const getters = {
  getNextPage,
  getAnimeList,
  getReleases,
  getCurrentScreen,
  getLoadingStatus,
  getSearchResults,
  getInputTimer
}

export const mutations = {
  setAnimeList,
  setReleases,
  resetNextPage,
  updateNextPage,
  setCurrentScreen,
  toogleLoadingNextScrn,
  setSearchResult,
  setInputTimer
}
