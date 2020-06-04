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

  const observers ={
    themeChange: [],
    sortChange: []
  }

  const sub2ThemeUpdate = func => observers.themeChange.push(func)
  const sub2SortUpdate = func => observers.sortChange.push(func)

  const notifyThemeChange = () => {
    const { theme, costumTheme } = state
    for (const func of observers.themeChange) func(theme, costumTheme)
  }
  const notifySortChange = () => {
    for (const func of observers.sortChange) func()
  }

  const getSettings = () => state
  const save = () => set.Local('settings', state)

  const getTheme = () => state.theme
  const setTheme = theme => {
    state.theme = theme
    notifyThemeChange()
  }

  const getAutoplay = () => state.autoplay
  const setAutoplay = status => state.autoplay = status

  const getDefaultLaunch = () => state.defaultLaunch
  const setDefaultLaunch = option => state.defaultLaunch = option

  const getSortMode = () => state.episodeSortMode
  const setSortMode = order => {
    state.episodeSortMode = order
    notifySortChange()
  }
  const togleSortMode = () => {
    const { episodeSortMode } = state
    
    const newMode = (episodeSortMode == DESC)
    ? ASCD
    : DESC
    
    setSortMode(newMode)
    notifySortChange()

    save()
  }

  const getCostumTheme = () => state.costumTheme
  const setCostumTheme = themeSchema => state.costumTheme = themeSchema

  const loadSettings = () => {
    const settings = get.Local('settings')

    const updateSettings = () => {
      const { theme, autoplay, defaultLaunch, episodeSortMode, costumTheme } = settings
  
      setTheme(theme)
      setAutoplay(autoplay)
      setCostumTheme(costumTheme)
      setSortMode(episodeSortMode)
      setDefaultLaunch(defaultLaunch)
    }
  
    if (settings) updateSettings()
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
    getSettings,
    sub2SortUpdate,
    sub2ThemeUpdate
  }
}
