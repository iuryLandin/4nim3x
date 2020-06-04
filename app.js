import { loadTheme, loadCostumTheme } from './themes/themes.js'
import { get, set, listen } from './js/utils/CzarK.js'
import { getters, mutations } from './js/States.js'
import getSettings from './settings/settings.js'
import getApiData from './js/HTML/getApiData.js'
import { hideLoading } from './js/loading.js'
import { load } from './js/pages.js'

import './themes/themes.js'

const HSC = 'home'
const RLS = 'releases'
const FAB = $('#fab')
const HOM_SCR_BTN = $('.load-all')
const SHOW_RELEAS = $('.load-rel')

const settings = getSettings()
loadTheme(settings.getTheme())
loadCostumTheme(settings.getCostumTheme())
// Receberá das configurações, qual tela deve ser carregada quando o app abrir
const defaultLaunch = get.Session('crntScrn') || settings.getDefaultLaunch()

export const getNextApiPage = async () => {
  mutations.toogleLoadingNextScrn()

  const nextPageIndex = getters.getNextPage()

  const page = get.Session(`p-${nextPageIndex}`) || await getApiData(`animes?next=${nextPageIndex}`)
  set.Session(`p-${nextPageIndex}`, page)

  mutations.setAnimeList(page)
  mutations.toogleLoadingNextScrn()

  return page
}

const getLists = async () => {
  // Obtêm a lista de lançamentos
  const releases = get.Session(RLS) || await getApiData(RLS)
  const homescrn = await getNextApiPage()

  mutations.setAnimeList(homescrn)
  mutations.setReleases(releases)

  set.Session(RLS, releases)

  hideLoading()
}

function loadSwapScreens() {
  HOM_SCR_BTN.click(load[HSC])
  SHOW_RELEAS.click(load[RLS])
}

function loadNextPage() {
  const ldngNxtPg = getters.getLoadingStatus()
  const currenScr = get.Session('crntScrn')

  const { scrollTop, clientHeight, scrollHeight } = document.documentElement

  const scrollPos = scrollTop + clientHeight
  const pageBottom = scrollPos >= (scrollHeight - 50)

  // carrega a pŕoxima página de animes ao fim da rolagem
  if (pageBottom && (currenScr == HSC) && !ldngNxtPg) load.home()
  
  // mostra e oculta o FAB de pesquisa
  if (scrollTop > 350)
    FAB.removeClass('hide')

  else
    FAB.addClass('hide')
}

getLists()
  .then(load[defaultLaunch])
  .then(loadSwapScreens)

loadTheme()

listen('scroll', loadNextPage)