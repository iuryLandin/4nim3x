const link = 'http://cinex.96.lt/animeapi/anime?format=json';

(function () {
    api()
})()

function api(){
    axios
        .get(link, {timeout: 5000})
        .then(res => console.log(res.anime[0]))
        .catch(err => console.log(err))
}