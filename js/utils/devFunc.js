import { getAppVersion } from '../States.js'
import { del } from './CzarK.js'

const PROGRESS_DELETE = 'Seu progresso salvo será completamente excluído.\n Deseja continuar?'
const SITE_2_OPEN_NXT = 'qual site você deseja abrir?'
const CONFIRM_ENT_URL = `confirma que deseja abrir o endereço?`
const APP_NOW_IS = 'a versão do app é'


export const devFunctions = {
  clearWatchedList() {
    const conf = confirm(PROGRESS_DELETE)
    if (conf) del.fromLocal('watchedList')
  },

  animexAppVersion() {
    const version = getAppVersion()
    alert(version)
    console.log(APP_NOW_IS, version)
  },

  openSite() {
    const site = prompt(SITE_2_OPEN_NXT)
    const conf = confirm(CONFIRM_ENT_URL)

    if (conf) location = site
  }
}
