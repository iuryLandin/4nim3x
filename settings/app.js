import { setters, getSettings, getCostumTheme, saveSettings, loadSettings } from '../settings/settings.js'
import { loadTheme, changeTheme } from '../themes/themes.js'
import { get, del, listen } from "../js/utils/CzarK.js"

import '../themes/themes.js'

const autoPlay = get.Id('autoplay')
const initScrn = get.Id('initial-screen')
const order_md = get.Id('order-type')
const appTheme = get.Id('app-theme')
const pmry = get.Id('primary')
const act1 = get.Id('accent')
const act2 = get.Id('accent2')
const wpp1 = get.Id('background')
const wpp2 = get.Id('background2')
const info = get.Id('infos')
const font = get.Id('font-color')

// Escutadores de eventos da página de configurações, buscam atualizar as configurações da página
// e o tema atualmente aplicado na mesma
listen('input', updateSettings)
listen('submit', resetConfigs)

// Atualiza as configurações toda vez que houver um input por parte do usuário
function updateSettings() {
  const costumTheme = {
    infos: info.value,
    accent: act1.value,
    primary: pmry.value,
    accent2: act2.value,
    fontColor: font.value,
    background: wpp1.value,
    background2: wpp2.value
  }

  setters.setTheme(appTheme.value)
  setters.setAutoPlay(autoPlay.value)
  setters.setCostumAdjusts(costumTheme)
  setters.setEpisodeOrder(order_md.value)
  setters.setDefaultLaunch(initScrn.value)

  saveSettings()
  changeTheme()
}

// restaura as configurações ao padrão
function resetConfigs(e) {
  e.preventDefault()

  // Deleta da localStorage as configurações salvas
  del.fromLocal('settings')
  del.fromLocal('costum-theme')

  // Recarrega a página.
  location.reload();
}

// Carrega na página as configurações atualmente salvas na localStorage
;(function loadPage() {
  loadSettings()
  loadTheme()

  const {
    theme,
    autoplay,
    defaultLaunch,
    episodeSortMode
  } = getSettings()

  const {
    infos,
    accent,
    accent2,
    primary,
    fontColor,
    background,
    background2
  } = getCostumTheme()

  // Carrega as configurações de uso do app salvas
  autoPlay.value = autoplay
  initScrn.value = defaultLaunch
  order_md.value = episodeSortMode
  appTheme.value = theme

  // Carrega os valores do tema costumizado atualmente salvo
  pmry.value = primary
  act1.value = accent
  act2.value = accent2
  wpp1.value = background
  wpp2.value = background2
  info.value = infos
  font.value = fontColor
})()