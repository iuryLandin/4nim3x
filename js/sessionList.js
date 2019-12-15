term.addEventListener("input", () => {
    clearTimeout()
    setTimeout(() => pesquisa(), 1000)
})

async function saveSession(next=0){
    let temp = await axios.get(Endp.getApi(Endp.anime+next), headAxios)
    criaLista(temp)
    if (temp.data.Next) saveSession(temp.data.Next)
    else localStorage.setItem("motorDeBusca", JSON.stringify(criaMotor()))
}

function criaLista(res) {
    let array = JSON.parse(localStorage.getItem("animes")) || [new Date().getTime() + (15*1000*3600*24) ]
    array.push(res.data)
    localStorage.setItem("animes", JSON.stringify(array))
}

function criaMotor() {
    let temp = JSON.parse(localStorage.getItem("animes"))
    let temparray = []
    for (let i=1;i<temp.length-1;i++){
        for (let j=0;j<50;j++){
            temparray.push(Object.values(temp[i].anime[j]))
        }
    }
    return temparray
}
function animeListFromSession(next = 1) {
    if (next == 1) d.querySelectorAll(".anime").forEach(elem => elem.remove())
    loading(true)
    if (d.getElementById("verMais")) d.getElementById("verMais").parentElement.remove()
    let animeList = JSON.parse(localStorage.getItem("animes"))
    montTabAnimeFromSession(animeList, next)
}

function montTabAnimeFromSession(data, pos) {
    data[pos].anime.forEach(element => montarAnimeFromSession(element, "index.html"))
    if (!!data[pos].Next) lista.append(`
    <p style="text-align: center">
    <a id="verMais" href="javascript:animeListFromSession('${(data[pos].Next/50)+1}')">CARREGAR MAIS</a>
    </p>`)
    loading(false)
}

function montarAnimeFromSession(element, origem) {
    lista.append(`
    <div class='anime'>
        <a href="anime.html">
            <img onclick="animeEscolhido(${element.Id}, '${element.Nome}', '${encodeURIComponent(element.Desc)}', '${origem}', this.src)" src="${element.Imagem}"/></a>
        <legend>${element.Nome}</legend>
    </div>`)
    loading(false)
}



function pesquisa() {
    let result = JSON.parse(localStorage.getItem("motorDeBusca"))
        .filter(row => row[1].toLocaleLowerCase().indexOf(term.value.toLowerCase()) !== -1)
    if (result.length > 500) animeListFromSession()
    else resultPesquisa(result)
}

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