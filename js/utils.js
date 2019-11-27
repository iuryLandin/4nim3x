document.addEventListener('swiped-right', () => openNav())
document.addEventListener('swiped-left', () => closeNav())


function openNav() {
  document.getElementById("mySidebar").style.width = "250px"
  document.querySelector("main").style.marginLeft = "250px"
}
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.querySelector("main").style.marginLeft = "0";
}

function player(src){
  $("#videoPlayer").attr("src", src);
  document.getElementById("videoPlayer").play();
  document.getElementById("videoPlayer").style.display = "block"
}

function voltar(de , para){
  $('#'+de).fadeOut();
  $("#"+para).show();
  document.getElementById("videoPlayer").pause()
}

function mostraVideo(condicao){
  d.getElementById("videoPlayer").style.display = (condicao)?"block":"none"
  if (!d.getElementById("videoPlayer").style.display) {
    document.getElementById("videoPlayer").pause()
  }
}

function loading(status){
  if(status) $("#loading").show()
  else $("#loading").hide()
}

function marcarEp(funcao, html, id) {
  if (funcao == "videoEscolhido") {
    html.classList.add("epVisto")
    html.attributes[2].nodeValue = true
}
salvaProgresso(id, html)
}

function salvaProgresso(id, html) {
let array = []
if (!!localStorage.getItem(`${id}`) ) array = JSON.parse(localStorage.getItem(`${id}`))
let jaExiste = false
for (let i=0;i<array.length;i++){
    if (html.innerHTML == array[i]) jaExiste = true
}
if (!jaExiste) array.push(html.innerHTML)

localStorage.setItem(`${id}`, JSON.stringify(array))
}

function lerProgresso(id) {
let array = JSON.parse(localStorage.getItem(`${id}`))
const episodios = document.querySelectorAll(".listaEpisodios")
for (let i = 0; i < episodios.length; i++) {
    if (array.includes(episodios[i].innerHTML)) {
        episodios[i].classList.add("epVisto")
        episodios[i].attributes[2].nodeValue = 'true'
    }
}
}