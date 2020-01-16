const searchBar = get.Id('searchbar')
// Dispara o evento de busca toda vez que é digitado algo na barra de pesquisa
if (!!searchBar) searchBar.addEventListener('keyup', () => busca());

// Limpa a caixa de busca toda vez que o botão é clicado para abrir ou fechar a barra de pesquisa
$('#searchbtn').click(() => $('#searchbar').val(''))

// Realiza a pesquisa após um tempo que o usuário digitar a primeira letra na caixa de pesquisa:
async function busca() {
  clearTimeout()

  // Recebe a função de dev dentro da classe no final do arquivo
  const audit = devFunctions[searchBar.value]

  // Checa se a função existe e executa caso exista
  if (audit) audit()

  // Pesquisa propriamente dita
  else setTimeout(() => pesquisa(), 1000);
}

/*****************************************************************************************
/* Realiza a leitura dos dados salvos no motor de busca da localStorage e os compara   *
/* com a entrada do usuário na caixa de pesquisa                     *
/*                                            *
/* 1 - Aqui é recebido da localStorage o Motor de busca salvo.              *
/* 2 - Filtra os elementos do array, se "true", inclui o elemento, se "false", exclui.  *
/* 3 - Converte todas as letras pra minúsculo, ampliando o acerto da busca pelos animes. *
/* 4 - Analisa o String como se fosse um array de "char", ampliando mais ainda o acerto. *
/* 5 - IndexOf devolve -1 caso não encontre o item dentro da String            *
/****************************************************************************************/
function pesquisa() {
  // Recebe o motor de buscas da Local Storage
  const searchEngine = get.Local('searchEngine')  // 1

  let result = searchEngine            
    .filter(row => row[1]            // 2
      .toLowerCase()              // 3
      .indexOf(searchBar.value        // 4
        .toLowerCase()) != -1)        // 5
  
  // Analiza se o filtro foi útil com base no tamanho do array que é devolvido
  // Se houverem mais de 500 itens, a tela não muda
  if (result.length > 500) showAnimeList()
  
  // Exibe o resultado caso houverem 500 itens ou menos
  else resultPesquisa(result)
}

//Cria na Tela a grade de resultados da pesquisa
function resultPesquisa(elements) {
  let animes = get.Queries('.anime')  // Recebe da tela todos os animes listados
  let verMais = get.Id('ver-mais')  // Recebe da tela o status do botão 'ver mais'

  //remove o botão "verMais", se existir
  if (verMais) verMais.remove();
  
  // Remove todos os animes em tela para listar novos
  for (const anime of animes) {
    anime.remove()
  }

  // Itera sobre os resultados e os monta em tela
  for(const result of elements) {
    mountResult(result)
  }
}

//Muda o estado da barra de pesquisa com base em um teste lógico que verifíca se ela tem conteudo
//para ser pesquisado.
function mudaPesq() {
  let testLog = !searchBar.attributes[1].value;
  if (testLog) searchBar.focus();
  else showAnimeList();
  get.Id('searchbtn')
    .innerHTML        = testLog?'close' :'search';
  searchBar.style.width     = testLog?'200px' :'0px'  ;
  searchBar.style.outline    = testLog?''    :'none'  ;
  searchBar.style.paddingLeft  = testLog?'7px'  :'0px'  ;
  searchBar.attributes[1].value = testLog?'true'  :''    ;
}
/***************************************************************************************
/* Cria o item do anime na tela inicial: mountResult()                 *
/*                                           *
/*  - Recebe o parametro "element", que contém os dados dos animes em forma de array.*                                *
/*    recebe também o parametro "origem", que é usado para aplicar no botão "voltar" *
/*                                           *
/*  - Aplica os dados num HTML pronto.                        *
/**************************************************************************************/
function mountResult(data) {
  const anime = `
  <div class='anime'>
    <a href="anime.html?id=${data[0]}">
      <img src="${Endp.safeImg(data[3])}"/></a>
    <legend>${truncate(data[1], 15)}</legend>
  </div>`

  get.Id('lista')
    .insertAdjacentHTML('beforeEnd', anime);
}



function getAnimeById(idAnime) {
  // Recebe da localStorage o motor de busca que será usado para buscar o anime
  let searchEngine = get.Local('searchEngine')

  let result = []
  // Procura o anime com o id solicitado
  if (searchEngine) {
    result = searchEngine
      .filter(row => row[0] == idAnime)
  }

  // Animes recentes as vezes não são adicionados a lista, então caso o resultado
  // anterior esteja vazio, é realizada uma busca na lista de lançamentos
  if (!result.length) {
    // Recebe a lista de Lançamentos da localStorage
    searchEngine = get.Local('releaseList')

    // Procura o anime com o id solicitado
    if (searchEngine) {
      result = searchEngine
        .data
        .filter(row => row[0] == idAnime)

      //remove o "status" do resultado, que indica se o anime está saindo ou não
      result[0].splice(3, 1)
    }
  }

  // Ultima esperança, usada para animes que estão sendo compartilhados pra alguém que nunca abriu o app
  if (!result.length) result = get.Session('sharedAnime')
  
  return result
}

let devFunctions = {
  clearAnimeList() {
    let escolha = confirm('Está ação irá apagar a lista de animes e irá criar uma nova, não feche o site durante o processo.');
    if (escolha) {
      searchBar.value = ''
      remove.fromLocal('animeList');
      checkLocalAnimeList();
    }
    searchBar.value = ''
    busca()
  },
  clearWatchedList() {
    if (confirm('Seu progresso salvo será completamente excluído.\n Deseja continuar?')) {
      searchBar.value = ''
      remove.fromLocal('watchedList')
    }
    searchBar.value = ''
    busca()
  },
  animexAppVersion() {
    searchBar.value = ''
    alert(get.Local('appVersion'))
  },
  listAllAnimes() {
    if(confirm("Você tem certeza?")) {
        for (const item of get.Local('searchEngine')) {
          setTimeout(() => {
            // Cria uma div com a classe "anime" na variável "anime"
            let anime = d.createElement("div")
            anime.classList.add("anime")
        
            // Insere os dados do anime na div recem criada
            anime.insertAdjacentHTML("beforeEnd", `
              <a href="anime.html?id=${item[0]}">
                <img src="${Endp.safeImg(item[3])}"/>
              </a>
              <legend>${truncate(item[1], 15)}</legend>`)
            
              // Adiciona a div na tela
            get.Id("lista").appendChild(anime)
          }, 500)
        }
    }else {
      searchBar.value = ''
      busca()
    }
  }
}