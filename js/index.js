const Endp = new EndPoints() //Instância do Objeto Endp, que contêm a função que devolve o link que é usado no axios.
d.addEventListener('swiped-right', () => openNav()) // escutador do evento de swipe para a direita,  abre  o menu
d.addEventListener('swiped-left', () => closeNav()) // escutador do evento de swipe para a esquerda, fecha o menu
searchBar.addEventListener("input", () => busca())  // escutador de entrada na caixa de pesquisa, executa a busca do anime digitado

/*************************************************************************************
/* Função que analisa como a página vai ser criada: openIndexPage()                  *
/*                                                                                   *
/*    - O primeiro "if" procura na localStorage a lista criada, caso nao exista,     *
/*      a página vai ser criada pegando as informações direto da api.                *
/*                                                                                   *
/*    - No "else if" é analisado se a lista na localStorage já expirou analisando    *
/*      a data atual com a data salva na localStorage, caso ja tenha expirado, a     *
/*      lista na local Storage é resetada.                                           *
/*                                                                                   *
/*    - E por fim entra no caso da lista ja estar na localStorage e nao ter vencido  *
/*      ainda.                                                                       *
/************************************************************************************/
function openIndexPage(){
    let listaDeAnimes = JSON.parse(localStorage.getItem("animes")) || null
    if (!listaDeAnimes) animeList()
    else if (getDate() >= listaDeAnimes[0]) {
        localStorage.removeItem("animes")
        animeList()
    }
    else animeListFromSession()
}

/**************************************************************************************
/* Função que busca dados para a criação da grade de animes na home: animeList()      *
/*                                                                                    *
/*    - Realizasse uma busca dos dados para a criação da grade de animes, processo é  *
/*      realizado uma unica vez a cada 15 dias.                                       *
/*                                                                                    *
/*    - Em seguida os dados são salvos na localStorage para que o carregamento seja   *
/*      mais rapido.                                                                  *
/*************************************************************************************/
function animeList() {
    axios
        .get(Endp.getApi(Endp.anime+0), headAxios)
        .then(res => montarTabelaAnime(res.data))
        .catch(err => console.warn(err))
    saveSession()
}

/***************************************************************************************
/* Recebe o resultado da busca por dados de animes e os repassa para a função que cria *
/* a grade de animes: montarTabelaAnime(data)                                          *
/*                                                                                     *
/*    - Recebe o parametro "data", que contem um array com os dados dos animes         *
/*                                                                                     *
/*    - Chama a função que cria cada o item de cada anime e, após terminar, um botão   *
/*      "ver Mais".                                                                    *
/**************************************************************************************/
function montarTabelaAnime(data) {
    data.anime.forEach(element => montarAnime(element))
    if (data.Next) lista.append(verMais((data.Next/50)+1))
    loading(false)
}

/***************************************************************************************
/* Cria o item do anime na tela inicial: montarAnime()                                 *
/*                                                                                     *
/*    - Recebe o parametro "element", que contém os dados específicos dos animes em    *
/*      forma de objeto.                                                               *
/*                                                                                     *
/*    - Aplica os dados num HTML pronto.                                               *
/**************************************************************************************/
function montarAnime(element, origem = "index.html") {
    lista.append(`
    <div class='anime'>
        <a href="anime.html">
            <img onclick="animeEscolhido(${element.Id}, '${element.Nome}', '${encodeURIComponent(element.Desc)}', '${origem}', ${element.Imagem})" src="${element.Imagem}"/>
        </a>
        <legend>${element.Nome}</legend>
    </div>`)
}

/****************************************************************************************
/* Carrega a lista de lancamentos: animeLanc()                                          *
/*                                                                                      *
/*    - Literalmente, carrega a lista de lançamentos                                    *
/***************************************************************************************/
async function animeLanc() {
    await axios
        .get(Endp.getApi(Endp.lanca), headAxios)
        .then(res => res.data
            .forEach(element => montarAnime(element, "lancamentos.html")))
        .catch(err => console.warn(err))
    loading(false)
}

/****************************************************************************************
/* Realiza a pesquisa após um tempo que o usuário digitar a primeira letra na           *
/* caixa de pesquisa: busca()                                                           *
/***************************************************************************************/
function busca() {
    clearTimeout()
    setTimeout(() => pesquisa(), 1000)
}

/****************************************************************************************
/* Realiza a leitura dos dados salvos no motor de busca da localStorage e os compara    *
/* com a entrada do usuário na caixa de pesquisa                                        *
****************************************************************************************/
function pesquisa() {
    let result = JSON.parse(localStorage.getItem("motorDeBusca")) //aqui é recebido da localStorage o Motor de busca salvo.
        .filter(row => row[1]           //filtra os elementos do array, se o teste der true, ele inclui o elemento, se false, exclui.
            .toLowerCase()              //converte todas as letras pra minúsculo, ampliando o acerto da busca pelos animes.
            .indexOf(searchBar.value    //analisa o String como se fosse um array de "char", ampliando mais ainda o acerto.
                .toLowerCase()) != -1)  //IndexOf compara devolve -1 caso não encontre nada no array de "char", por isso a comparação com ele.
    if (result.length > 500) animeListFromSession() // testa se a busca resultou em menos de 500 resultados antes de exibir na tela.
    else resultPesquisa(result) // exibe o resultado na tela caso o filtro retorne menos de 500 valores.
}

//Cria na Tela a grade de resultados da pesquisa
function resultPesquisa(elements) {
    d.querySelectorAll(".anime").forEach(elem => elem.remove())
    if (d.getElementById("verMais")) d.getElementById("verMais").parentElement.remove()
    elements.forEach(element => {
        lista.append(`
        <div class='anime'>
            <a href="anime.html">
                <img onclick="animeEscolhido(${element[0]}, '${element[1]}', '${encodeURIComponent(element[2])}', 'index.html', this.src)" src="${element[3]}"/></a>
            <legend>${element[1]}</legend>
        </div>`)
    })
}