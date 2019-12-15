document.addEventListener('swiped-right', () => openNav())
document.addEventListener('swiped-left', () => closeNav())


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
  $("#videoPlayer").attr("src", src)
  vidPlayer.play()
  vidPlayer.style.display = "block"
}

function voltar(html) {
  html.href = sessionStorage.getItem("origem")
  console.log(html)
}

function mostraVideo(condicao) {
  vidPlayer.style.display = (condicao) ? "block" : "none"
  if (!vidPlayer.style.display) vidPlayer.pause()
}

function marcarEp(funcao, html, id) {
  if (funcao == "videoEscolhido") {
    html.classList.add("epVisto")
    html.attributes[2].nodeValue = true
  }
  salvaProgresso(id, html)
}

function salvaProgresso(id, html) {
  let array = JSON.parse(localStorage.getItem(`${id}`)) || []
  let jaExiste = false
  for (let i = 0; i < array.length; i++) {
    if (html.innerHTML == array[i]) jaExiste = true
  }
  if (!jaExiste) array.push(html.innerHTML)

  localStorage.setItem(`${id}`, JSON.stringify(array))
}

function lerProgresso(id) {
  let array = JSON.parse(localStorage.getItem(`${id}`)) || []
  const episodios = document.querySelectorAll(".listaEpisodios")
  for (let i = 0; i < episodios.length; i++) {
    if (array.includes(episodios[i].innerHTML)) {
      episodios[i].classList.add("epVisto")
      episodios[i].attributes[2].nodeValue = 'true'
    }
  }
}

function mudaPesq(html) {
  let test = !term.attributes[1].value
  if (test) term.focus()
  html.innerHTML = test?"close":"search"
  term.attributes[1].value = test?"true":""
  term.style.width = test?"200px":"0px"
  term.style.outline = test?"":"none"
  term.style.paddingLeft = test?"7px":"0px"
}