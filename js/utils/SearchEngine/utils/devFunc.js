import { get, del } from '../../../frameworks/czark.js'
import montAnimeCard from '../../../templates/animes.js'
import { pesquisa } from '../index.js'

const searchBar = get.Id('searchbar')

const devFunctions = {
    clearAnimeList() {
      searchBar.value = ''
      pesquisa()
      let escolha = confirm('Está ação irá apagar a lista de animes e irá criar uma nova, não feche o site durante o processo.');
      if (escolha) {
        del.fromLocal('animeList');
        checkLocalAnimeList();
      }
    },
    
    clearWatchedList() {
      searchBar.value = ''
      pesquisa()
      if (confirm('Seu progresso salvo será completamente excluído.\n Deseja continuar?')) {
        del.fromLocal('watchedList')
      }
    },
  
    animexAppVersion() {
      searchBar.value = ''
      pesquisa()
      alert(get.Local('appVersion'))
    },
  
    listAllAnimes() {
      if(confirm("Você tem certeza?")) {
        // Analiza se ja existem animes na tela e os remove se necessário
        get
          .Queries(".anime")
          .forEach(del.element)
  
        const allAnimes = get.Local('searchEngine')
  
        for (const anime of allAnimes) {
          setTimeout(() => montAnimeCard(anime), 500)
        }

        del.fromSession('nextPage')
      }else {
        searchBar.value = ''
        pesquisa()
      }
    }
}

export default devFunctions