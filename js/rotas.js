const modal = $("#modal")[0]
const span = $(".close")[0]
const lista = $('#lista')
const baseUrl = 'https://cors-anywhere.herokuapp.com/http://cinex.96.lt/animeapi'
const headAxios = {headers: {'Access-Control-Allow-Origin': '*'}}
const endpAnime = "/anime"
const endpLanca = "/lancamento" 
const endpVideo = "/video?id="
const endpCateg = "/categoria"
const endpEpiso = "/episodio?id="