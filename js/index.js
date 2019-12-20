const Endp = new EndPoints() //Instância do Objeto Endp, que contêm a função que devolve o link que é usado no axios.
d.addEventListener('swiped-right', () => openNav()); // escutador do evento de swipe para a direita,  abre  o menu
d.addEventListener('swiped-left', () => closeNav()); // escutador do evento de swipe para a esquerda, fecha o menu
if (!!searchBar)searchBar.addEventListener("keydown", () => busca());  // escutador de entrada na caixa de pesquisa, executa a busca do anime digitado

/*************************************************************************************
/* Função que analisa como a página vai ser criada: openIndexPage()                  *
/*                                                                                   *
/*    - O primeiro "if" procura na localStorage a lista criada, caso nao exista,     *
/*      a página vai ser criada pegando as informações direto da api.                *
/*                                                                                   *
/*    - No "else if" é analisado se a lista na localStorage já expirou analisando    *
/*      a data atual com a data de expiração salva, caso tenha expirado, a           *
/*      lista na local Storage é resetada.                                           *
/*                                                                                   *
/*    - E por fim entra no caso da lista ja estar na localStorage e nao ter vencido  *
/*      ainda.                                                                       *
/************************************************************************************/
function openIndexPage(){
    let dataExp = JSON.parse(localStorage.getItem("animes")) || null;
    if (!dataExp) animeList();
    else if (getDate() >= dataExp[0]) {
        localStorage.removeItem("animes");
        animeList();
    }
    else animeListFromSession();
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
        .catch(err => console.warn(err));
    saveSession();
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
    data.anime
        .forEach(element => montarAnime(Object.values(element)));
    if (data.Next) lista.append(verMais((data.Next/50)+1));
    loading(false);
}

/***************************************************************************************
/* Cria o item do anime na tela inicial: montarAnime()                                 *
/*                                                                                     *
/*    - Recebe o parametro "element", que contém os dados dos animes em forma de array.*                                                               *
/*      recebe também o parametro "origem", que é usado para aplicar no botão "voltar" *
/*                                                                                     *
/*    - Aplica os dados num HTML pronto.                                               *
/**************************************************************************************/
function montarAnime(element, origem = "index.html") {
    lista.append(`
    <div class='anime'>
        <a href="javascript: animeEscolhido('${element[0]}', '${origem}')">
            <img src="${(origem=="lancamentos.html")?element[4]:element[3]}"/></a>
        <legend>${element[1]}</legend>
    </div>`);
}

// Carrega a lista de lancamentos
async function animeLanc() {
    await axios
        .get(Endp.getApi(Endp.lanca), headAxios)
        .then(res => res.data
            .forEach(element => montarAnime(Object.values(element), "lancamentos.html")))
        .catch(err => console.warn(err));
    loading(false);
}


// Realiza a pesquisa após um tempo que o usuário digitar a primeira letra na caixa de pesquisa:
function busca() {
    clearTimeout();
    setTimeout(() => pesquisa(), 1000);
}

/*****************************************************************************************
/* Realiza a leitura dos dados salvos no motor de busca da localStorage e os compara     *
/* com a entrada do usuário na caixa de pesquisa                                         *
/*                                                                                       *
/* 1 - Aqui é recebido da localStorage o Motor de busca salvo.                           *
/* 2 - Filtra os elementos do array, se "true", inclui o elemento, se "false", exclui.   *
/* 3 - Converte todas as letras pra minúsculo, ampliando o acerto da busca pelos animes. *
/* 4 - Analisa o String como se fosse um array de "char", ampliando mais ainda o acerto. *
/* 5 - IndexOf devolve -1 caso não encontre o item dentro da String                      *                                                               *
/* 6 - Testa se a busca resultou em menos de 500 resultados antes de exibir na tela.     *
/* 7 - Exibe o resultado na tela caso o filtro retorne menos de 500 valores.             *
/****************************************************************************************/
function pesquisa() {
    let result = JSON.parse(localStorage.getItem("motorDeBusca"))   // 1
    .filter(row => row[1]                                           // 2
        .toLowerCase()                                              // 3
        .indexOf(searchBar.value
            .toLowerCase()) != -1);                                 // 5
        if (result.length > 500) animeListFromSession();            // 6
        else resultPesquisa(result);                                // 7
}

//Cria na Tela a grade de resultados da pesquisa
function resultPesquisa(elements) {
    d.querySelectorAll(".anime")  //remove da tela todos os animes que estão sendo exibidos
        .forEach(elem => elem.remove());
    if (d.getElementById("verMais")) //remove o botão "verMais", se existir
        d.getElementById("verMais").parentElement.remove();
    elements.forEach(element => montarAnime(element)); //cria de fato os animes que serão exibidos
}

//Muda o estado da barra de pesquisa com base em um teste lógico que verifíca se a barra de
//pesquisa tem conteudo para ser pesquisado
function mudaPesq(html) {
    let testLog = !searchBar.attributes[1].value;
    if (testLog) searchBar.focus();
    else animeListFromSession();
    html.innerHTML                = testLog?"close" :"search";
    searchBar.style.width         = testLog?"200px" :"0px"   ;
    searchBar.style.outline       = testLog?""      :"none"  ;
    searchBar.style.paddingLeft   = testLog?"7px"   :"0px"   ;
    searchBar.attributes[1].value = testLog?"true"  :""      ;
}
