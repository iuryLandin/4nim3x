let share = {
    animeName: delQuotesAndSpaces(title),
    animeDesc: delQuotesAndSpaces(desc),
    imgUrl: img.split('http://png.techrevolution.com.br/')[1],
    link(a, b, c) {
        return`${location.origin}/share.html?id=${id}=${a}=${b}=${c}`
    },

    openBar() {
        get.Id("url-2-copy").value = this.link(this.animeName, this.animeDesc, this.imgUrl)
        $('.shareDiv')
            .slideToggle();
    },

    selected(rede) {
        // detecta a rede social escolhida para compartilhar o anime
        let func = this.redes[rede]
        func(this.link(this.animeName, this.animeDesc, this.imgUrl))
        setTimeout(
            function openDiv() {
                $('.shareDiv')
                    .slideToggle()
            },
            250
        )
    },

    redes: {
        fb(link) {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${link}`)
        },
        wpp(link) {
            window.open(`https://api.whatsapp.com/send?text=Ei%2C%20assiste%20esse%20anime...%20Clica%20no%20link%3A%20${link}`)
        },
        copy() {
            get.Id("url-2-copy").select()
            d.execCommand('copy')
            setTimeout(() => alert('Texto copiado para a area de transferência'), 100)
        }
    }
}

function delQuotesAndSpaces(elem) {
    elem = elem.replace(/ /g, '§')
    elem = elem.replace(/“/g, '£')
    elem = elem.replace(/'/g, '£')
    return elem.replace(/"/g, '£')
}