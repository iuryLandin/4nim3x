 function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.querySelector("main").style.marginLeft = "250px";
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
  let html = `
  <div class='anime'>
    <img onclick="verAnime(${element.Id}, '${element.Nome}', '${encodeURIComponent(element.Desc)}', this.src)" src="${element.Imagem}" />
    <legend>${element.Nome}</legend>
  </div>`
  lista.append(html)
}