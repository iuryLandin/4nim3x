function loading(status) {
  const loading = $("#loading")
  return (status) ? loading.show() : loading.hide()
}

function loadingAnimes(status) {
  const loadingAnimes = $("#loading-animes")
  return (status) ? loadingAnimes.show() : loadingAnimes.hide()
}
function compartilhar() {
  $('.shareDiv').slideToggle();
}

function share(rede) {
  let animeId = location.search.split('id=')[1];
  if (rede == 'fb') url = 'https://www.facebook.com/sharer/sharer.php?u=https://animexonline.herokuapp.com/share.html?id=' + animeId;
  if (rede == 'wpp') url = 'https://api.whatsapp.com/send?text=Ei,%20assiste%20esse%20anime...%20%0A%20Clica%20no%20link%20%0A%20%0A%20https://animexonline.herokuapp.com/share.html?id=' + animeId

  $('.shareDiv').slideToggle();
  window.open(url);
}