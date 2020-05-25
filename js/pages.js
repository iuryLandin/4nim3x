
import { getAnimeCard } from "./models/animeCard.js"
import { mutations, getters } from "./States.js"
import { getNextApiPage } from "../app.js"
import { get, set } from "./utils/CzarK.js"

const EMPTY = ''
const HOMESC = 'home'
const SEARCH = 'search'
const RELEAS = 'releases'
const BOTTOM = 'beforeend'
const LOADERS = $('.loader')
const CURR_SCREEN = 'crntScrn'
const BTN_SELECTED = 'selected'
const HOM_SCR_BTN = $('.load-all')
const SHOW_RELEAS = $('.load-rel')
const ANIME_CNTNR = get.Id('anime-list')

const home = () => {
  const animes = getters.getAnimeList()
  const nextPg = getters.getNextPage()

  mutations.updateNextPage()
  set.Session(CURR_SCREEN, HOMESC)
  mutations.setCurrentScreen(HOMESC)

  getNextApiPage()

  if(!nextPg) ANIME_CNTNR.innerHTML = EMPTY

  for (const anime of animes) {
    const animeCard = getAnimeCard(anime)
    ANIME_CNTNR.insertAdjacentHTML(BOTTOM, animeCard)
  }

  LOADERS.removeClass(BTN_SELECTED)
  HOM_SCR_BTN.addClass(BTN_SELECTED)
}

const releases = () => {
  const releases = getters.getReleases()

  mutations.resetNextPage()
  set.Session(CURR_SCREEN, RELEAS)
  mutations.setCurrentScreen(RELEAS)

  ANIME_CNTNR.innerHTML = EMPTY

  for (const anime of releases) {
    const animeCard = getAnimeCard(anime)
    ANIME_CNTNR.insertAdjacentHTML(BOTTOM, animeCard)
  }

  LOADERS.removeClass(BTN_SELECTED)
  SHOW_RELEAS.addClass(BTN_SELECTED)
}

const search = () => {
  const results = getters.getSearchResults()

  mutations.resetNextPage()
  set.Session(CURR_SCREEN, SEARCH)
  
  ANIME_CNTNR.innerHTML = EMPTY
  
  for (const anime of results) {
    const animeCard = getAnimeCard(anime)
    ANIME_CNTNR.insertAdjacentHTML(BOTTOM, animeCard)
  }

  LOADERS.removeClass(BTN_SELECTED)
}

export const load = {
  releases,
  search,
  home
}