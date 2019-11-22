document.addEventListener('swiped-right', html => {
  if(html) openNav()
})

document.addEventListener('swiped-left', html => {
  if(html) closeNav()
})

function openNav() {
  document.getElementById("mySidebar").style.width = "250px"
  document.querySelector("main").style.marginLeft = "250px"
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.querySelector("main").style.marginLeft = "0";
}

function loading(status){
  if(status) $("#loading").show()
  else $("#loading").hide()
}

function player(vid){
  $("#videoPlayer").attr("src", vid);
  document.getElementById("videoPlayer").play();
}

function montarAnime(element){
  lista.append(`
  <div class='anime'>
    <a href="#"><img onclick="verAnime(${element.Id}, '${element.Nome}', '${encodeURIComponent(element.Desc)}', this.src)" src="${element.Imagem}"/></a>
    <legend>${element.Nome}</legend>
  </div>`)
  loading(false);
}

function getlink(id, nome) {
  $("#episodioAtual")[0].innerHTML = nome
  opcoes.html("");  
  loading(true);
  anime.hide();
  video.fadeIn();
  axios
    .get(baseUrl+endpVideo+id, headAxios)
    .then(res => res.data.forEach(element => montaLink(element.Nome, "player", element.Endereco, opcoes, true)))
    .catch(err => console.warn(err))
}

function voltar(de , para){
  $('#'+de).fadeOut();
  $("#"+para).show();
  document.getElementById("videoPlayer").pause()
}

function mostraVideo(condicao){
    d.getElementById("videoPlayer").style.display = (condicao)?"block":"none"
    if (d.getElementById("videoPlayer").style.display == "none") {
      document.getElementById("videoPlayer").pause()
    }
}