import { getDefaultLaunch, loadSettings, getApiData } from './settings/settings.js'
import { getters, mutations } from './js/States.js'
import { loadTheme } from './themes/themes.js'
import { get, set } from './js/utils/CzarK.js'
import { hideLoading } from './js/loading.js'
import { load } from './js/pages.js'

import './themes/themes.js'
import './js/loading.js'

// carrega as configurações antes de qualquer código ser executado
loadSettings()

const HSC = 'home'
const RLS = 'releases'
const FAB = $('#fab')
const HOM_SCR_BTN = $('.load-all')
const SHOW_RELEAS = $('.load-rel')

// Receberá das configurações, qual tela deve ser carregada quando o app abrir
const defaultLaunch = get.Session('crntScrn') || getDefaultLaunch()

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


getLists()
  .then(load[defaultLaunch])
  .then(function loadSwapScreens() {
    HOM_SCR_BTN.click(load[HSC])
    SHOW_RELEAS.click(load[RLS])
  })
  .then(function loadNextPage() {
    window.onscroll = function loadNextPage() {
      const w = window
      const searchHeight = 910
      const scrollPos = w.innerHeight + w.scrollY
      const pageHeight = document.body.offsetHeight

      const pageBottom = (scrollPos >= (pageHeight - 5))

      const currenScr = get.Session('crntScrn')
      const ldngNxtPg = getters.getLoadingStatus()

      // carrega a pŕoxima página de animes ao fim da rolagem
      if (pageBottom && (currenScr == HSC) && !ldngNxtPg) load.home()
      
      // mostra e oculta o FAB de pesquisa
      if (scrollPos > searchHeight)
        FAB.removeClass('hide')

      else
        FAB.addClass('hide')
    }
  })
loadTheme()