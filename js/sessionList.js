// Função assíncrona que cria na localStorage ambos, a lista de animes "animes"
// e uma lista de animes de forma mais compacta usada para buscas "motorDeBusca"
async function saveSession(next = 0) {
    $('#loading').show();
    $('#loading-msg').html("Estamos sincronizando os animes, aguarde um momento!<br>O tempo de espera pode variar de acordo com a velocidade da sua conexão<br>IMPORTANTE esse processo é essêncial para o funcionamento do app!<br>Não feche a página enquanto essa mensagem é exibida!")
    let res = await axios.get(Endp.getApi(Endp.anime + next), headAxios)
    criaLista(res)
    localStorage.setItem("motorDeBusca", JSON.stringify(criaMotor()))
    if (res.data.Next) saveSession(res.data.Next)
    else {
        $('#loading').hide();
        $('#loading-msg').html("Carregando");
    }
}

// cria um array com o conteudo da localStorage, caso não exista, cria um novo com a data de 15 dias no futuro
function criaLista(res) {
    let array = JSON.parse(localStorage.getItem("animes")) || [getDate() + (15 * 1000 * 3600 * 24)] 
    array.push(res.data)
    localStorage.setItem("animes", JSON.stringify(array))
}

// Cria uma lista mais compacta na LS, usada para pesquisas de anime
function criaMotor() {
    let temp = JSON.parse(localStorage.getItem("animes"))
    let temparray = []
    for (let i = 1; i < temp.length - 1; i++) {
        for (let j = 0; j < 50; j++) {
            temparray.push(Object.values(temp[i].anime[j]))
        }
    }
    return temparray
}

// Carrega a lista de animes a partir dos dados salvos na LS
function animeListFromSession(next = 1) {
    loading(true)
    if (next == 1) //Como essa função é chama novamente em varias funções que adicionam animes na tela, mais
        document   //a frente, essa condicional limpa todos os animes que estão na lista caso o valor do next
            .querySelectorAll(".anime") //seja igual a 1, que é o primeiro.
            .forEach(elem => elem.remove())
    //Verifica se o botão "verMais" Existe e o apaga para adição de novos animes à tela.
    if (d.getElementById("verMais"))
        d.getElementById("verMais").parentElement.remove()
    montTabAnimeFromSession(next)
}

// Gera a grade de animes na tela
function montTabAnimeFromSession(pos) {
    let animeList = JSON.parse(localStorage.getItem("animes"))
    animeList[pos].anime
        .forEach(element => montarAnime(Object.values(element)))
    if (!!animeList[pos].Next)
        lista.append(verMais((animeList[pos].Next/50)+1))
    loading(false)
}


$("#searchbtn").click(function () {
    $("#searchbar").val("");
});