const modal = document.getElementById("modal")
const span = document.getElementsByClassName("close")[0]
const baseUrl = 'https://cors-anywhere.herokuapp.com/https://qgeletronicos.com/animeapi'
const headAxios = {headers: {'Access-Control-Allow-Origin': '*'}}
const endpAnime = "/anime"
const endpLanca = "/lancamento" 
const endpVideo = "/video?id="
const endpCateg = "/categoria"
const endpEpiso = "/episodio?id="