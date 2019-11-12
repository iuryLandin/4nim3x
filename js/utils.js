 function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.querySelector("main").style.marginLeft = "250px";
}

 function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.querySelector("main").style.marginLeft = "0";
}

function loading(status){
    if(status)
        $("#loading").show();
    else
        $("#loading").hide();
}