import { get, set } from "../js/utils/CzarK.js"

const ASCD = 'afterbegin'
const DESC = 'beforeend'

export default function getSettings () {
  const state = {
    autoplay: false,
    defaultLaunch: 'home',
    episodeSortMode: 'afterbegin',
    theme: 'purple',
    costumTheme: {
      infos: '#ffffff',
      accent: '#800080',
      primary: '#610061',
      accent2: '#4d194d',
      fontColor: '#800080',
      background: '#ffffff',
      background2: '#ededed'
    }
  }

  const save = () => set.Local('settings', state)
  const getSettings = () => state

  const setTheme = theme => state.theme = theme
  const getTheme = () => state.theme

  const setAutoplay = status => state.autoplay = status
  const getAutoplay = () => state.autoplay

  const setDefaultLaunch = option => state.defaultLaunch = option
  const getDefaultLaunch = () => state.defaultLaunch

  const setSortMode = order => state.episodeSortMode = order
  const getSortMode = () => state.episodeSortMode
  const togleSortMode = () => {
    const { episodeSortMode } = state
    
    const newMode = (episodeSortMode == DESC)
    ? ASCD
    : DESC
    
    setSortMode(newMode)
    save()
  }

  const setCostumTheme = themeSchema => state.costumTheme = themeSchema
  const getCostumTheme = () => state.costumTheme

  const loadSettings = () => {
    const costumTheme = get.Local('costum-theme')
    const settings = get.Local('settings')

    const updateSettings = () => {
      const { theme, autoplay, defaultLaunch, episodeSortMode } = settings
  
      setTheme(theme)
      setAutoplay(autoplay)
      setSortMode(episodeSortMode)
      setDefaultLaunch(defaultLaunch)
    }
    const updateCostumTheme = () => {
      const { infos, accent, primary, accent2, fontColor, background, background2 } = costumTheme

      costumTheme.info = infos
      costumTheme.accent = accent
      costumTheme.primary = primary
      costumTheme.accent2 = accent2
      costumTheme.fontColor = fontColor
      costumTheme.background = background
      costumTheme.background2 = background2
    }
  
    if (settings) updateSettings()
    if (costumTheme) updateCostumTheme()
  }

  loadSettings()

  return {
    save,
    setTheme,
    getTheme,
    setAutoplay,
    getAutoplay,
    setDefaultLaunch,
    getDefaultLaunch,
    setSortMode,
    getSortMode,
    togleSortMode,
    setCostumTheme,
    getCostumTheme,
    getSettings
  }
}
