/**
 * Arquivo que armazena e inicializa as configurações do app
 * Neste arquivo é salvo globalmente uma variável 'settings'
 * que será acessível em todas as páginas do site para modi-
 * ficação de recursos na página.
 * 
 * Criado por JulCzar
 * Ultima modificação - JulCzar - 25/05/2020
 */

import { get, set } from "../js/utils/CzarK.js"

const BASE_URL = 'http://127.0.0.1:4000/'
const COSTUM_THEME = 'costum-theme'
const ASCD = 'afterbegin'
const STNGS = 'settings'
const DESC = 'beforeend'


// configurações padrão que a página irá utilizar na primeira inicilização
// também é a variável global que o app acessa buscando as configs salvas.
const settings = {
  autoplay: false,
  defaultLaunch: 'home',
  episodeSortMode: 'afterbegin',
  theme: 'purple',
}

const costumTheme = {
  infos: '#ffffff',
  accent: '#800080',
  primary: '#610061',
  accent2: '#4d194d',
  fontColor: '#800080',
  background: '#ffffff',
  background2: '#ededed'
}

const setTheme = theme => { settings.theme = theme }
const setEpisodeOrder = order => { settings.episodeSortMode = order }

export const getSettings = () => settings
export const getCostumTheme = () => costumTheme

export const getTheme = () => settings.theme
export const getAutoplay = () => settings.autoplay
export const getDefaultLaunch = () => settings.defaultLaunch
export const getEpisodeSortMode = () => settings.episodeSortMode
export const getApiData = async endpoint => await $.get(BASE_URL + endpoint).fail(console.warn)

export const saveSettings = () => { set.Local(STNGS, settings) }
export const setAutoPlay = status => { settings.autoplay = status }
export const setDefaultLaunch = option => { settings.defaultLaunch = option }

const setCostumAdjusts = ({ infos, accent, primary, accent2, fontColor, background, background2 }) => {
  costumTheme.info = infos
  costumTheme.accent = accent
  costumTheme.primary = primary
  costumTheme.accent2 = accent2
  costumTheme.fontColor = fontColor
  costumTheme.background = background
  costumTheme.background2 = background2

  set.Local(COSTUM_THEME, costumTheme)
}

export const toogleEpisodeOrder = () => {
  const { episodeSortMode } = settings
  
  const newOrderMode = episodeSortMode == DESC
  ? ASCD
  : DESC

  setEpisodeOrder(newOrderMode)
  saveSettings()
}

// Carrega as configurações do usuário da localStorage
export const loadSettings = () => {
  const costumTheme = get.Local(COSTUM_THEME)
  const settings = get.Local(STNGS)

  if (settings) {
    const { theme, autoplay, defaultLaunch, episodeSortMode } = settings

    setTheme(theme)
    setAutoPlay(autoplay)
    setDefaultLaunch(defaultLaunch)
    setEpisodeOrder(episodeSortMode)
  }
  if(costumTheme)
    setCostumAdjusts(costumTheme)
}

export const setters = {
  setTheme,
  setAutoPlay,
  setEpisodeOrder,
  setDefaultLaunch,
  setCostumAdjusts
}

export const getters = {
  getTheme,
  getAutoplay,
  getCostumTheme,
  getDefaultLaunch
}
