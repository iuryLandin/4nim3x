function getDate() {
  return (new Date().getTime())
}

function verMais(next){
  return `<p style="text-align: center"><a id="verMais" href="javascript:animeListFromSession('${next}')">CARREGAR MAIS</a></p>`
}

function openNav() {
  document.getElementById("mySidebar").style.width = "250px"
  document.querySelector("main").style.marginLeft = "250px"
}
function closeNav() {
  document.getElementById("mySidebar").style.width = "0"
  document.querySelector("main").style.marginLeft = "0"
}
function loading(status) {
  return (status)?$("#loading").show():$("#loading").hide()
}

function playVid(src) {
  src = JSON.parse(src)
  $("#videoPlayer").attr("poster", sessionStorage.getItem("capa") )
  $("#videoPlayer").attr("src", src[2])
  vidPlayer.play()
  vidPlayer.style.display = "block"
}

function voltar(html) {
  html.href = sessionStorage.getItem("origem")
}

function mostraVideo(condicao) {
  vidPlayer.style.display = (condicao) ? "block" : "none"
  if (!vidPlayer.style.display) vidPlayer.pause()
}

function animeEscolhido(id, origem) {
  sessionStorage.setItem("idAnime", id)
  sessionStorage.setItem("origem", origem)
  location = `anime.html?id=${id}`
}

function salvarProgresso(id, nomeEp) {
  let array = JSON.parse(localStorage.getItem(`${id}`)) || []
  if (!array.includes(nomeEp)) array.push(nomeEp)
  localStorage.setItem(`${id}`, JSON.stringify(array))
}

function lerProgresso(id) {
  let array = JSON.parse(localStorage.getItem(`${id}`)) || []
  const episodios = document.querySelectorAll(".listaEpisodios")
  for (let i = 0; i < episodios.length; i++) {
    if (array.includes(episodios[i].innerHTML)) {
      episodios[i].classList.add("epVisto")
    }
  }
}
function compartilhar(){
     $('.shareDiv').slideToggle();
}

function share(rede){
    let animeId = location.search.split('id=')[1];
    if(rede == 'fb') url = 'https://www.facebook.com/sharer/sharer.php?u=https://animexonline.herokuapp.com/share.html?id=' + animeId;
    if(rede == 'wpp') url = 'https://api.whatsapp.com/send?text=Ei,%20assiste%20esse%20anime...%20%0A%20Clica%20no%20link%20%0A%20%0A%20https://animexonline.herokuapp.com/share.html?id=' + animeId

    $('.shareDiv').slideToggle();
    window.open(url);
}

function getAnimeById(idAnime) {
    let result = JSON.parse(localStorage.getItem("motorDeBusca"))
        .filter(row => row[0] == idAnime);
    return result;
}