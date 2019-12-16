const Endp = new EndPoints() //Instância do Objeto Endp, que contêm a função que devolve o link que é usado no axios.

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
