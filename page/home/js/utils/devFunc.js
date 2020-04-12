import { loadSearchEngine, loadSearchResults,searchEngine } from "../search.js"

const searchbar = get.Id('searchbar')

const devFunctions = {
    clearWatchedList() {
      if (confirm('Seu progresso salvo será completamente excluído.\n Deseja continuar?')) {
        del.fromLocal('watchedList')
      }
    },
  
    animexAppVersion() {
      alert(
        get.Local('appVersion')
      )
    },
  
    listAllAnimes() {
      if(confirm("Você tem certeza?")) {
        // Analiza se ja existem animes na tela e os remove se necessário
        get
          .Queries(".anime")
          .forEach(del.element)

        loadSearchEngine()
  
        loadSearchResults(searchEngine)
      }
    },

    openSite() {
      let site = prompt("qual site você deseja abrir?")

      if(confirm(`confirma que deseja abrir o site: ${site}  ?`)) {
        location = site
      }
    }
}

export default devFunctions