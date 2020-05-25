import { getApiData } from '../settings/settings.js'
import { get, listen, set } from './utils/CzarK.js'
import { devFunctions } from './utils/devFunc.js'
import { getters, mutations } from './States.js'
import { load } from './pages.js'

const searchbar = get.Id('searchbar')
listen('input', search, searchbar)

const getSearchResults = async query => await getApiData(`search?q=${query}`)

async function search() {
  const crntScrn = getters.getCurrentScreen()
  const inputTimer = getters.getInputTimer()
  clearTimeout(inputTimer)

  const { value } = searchbar
  const dev = devFunctions[value]

  if (!value.length)
    load[crntScrn]()

  else {
    if (dev) return dev()
    const id = setTimeout(findResults, 250)
    mutations.setInputTimer(id)
  }
}

async function findResults() {
  const { value } = searchbar
  const results = await getSearchResults(value)
  mutations.setSearchResult(results)
  set.Session('last-search', results)
  load.search()
}