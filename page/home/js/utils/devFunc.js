const searchbar = get.Id('searchbar')

const devFunctions = {
    clearWatchedList() {
      searchbar.value = ''
      load[currentScreen]()
      if (confirm('Seu progresso salvo será completamente excluído.\n Deseja continuar?')) {
        del.fromLocal('watchedList')
      }
    },
  
    animexAppVersion() {
      searchbar.value = ''
      load[currentScreen]()
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
  
        const allAnimes = getSearchEngine()
  
        for (const anime of allAnimes) {
          setTimeout(() => montAnimeCard(anime), 500)
        }

        del.fromSession('nextPage')
      }else {
        searchbar.value = ''
        load[currentScreen]()
      }
    },

    openSite() {
      let site = prompt("qual site você deseja abrir?")

      if(confirm(`confirma que deseja abrir o site: ${site}  ?`)) {
        location = site
      }else searchbar.value = ''
    }
}

export default devFunctions