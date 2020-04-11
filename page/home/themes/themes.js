function changeTheme() {
    let currentTheme = d.body.classList.value
    let { theme: newTheme } = settings
    d.body.classList.replace(currentTheme, newTheme)
    loadTheme()
}

function loadTheme() {
    // pega das configurações o tema selecionado atualmente e o carrega na página
    let { theme, costumTheme } = settings
    d.body.classList.add(theme)
    
    // Cria uma tag style contendo todas as configurações do tema costumizado
    let { primary, accent, accent2, background, background2, infos, fontColor} = costumTheme
    let style = document.createElement('style')
    style.setAttribute('id', 'costum-theme')
    style.insertAdjacentHTML('beforeend', `
        .costum {
            --primary:      ${primary};
            --accent:       ${accent};
            --accent_2:     ${accent2};
            --background:   ${background};
            --background_2: ${background2};
            --infos:        ${infos};
            color:          ${fontColor}
        }
    `)
    // verifica se já existe uma configuração anterior salva e a apaga
    if (get.Id('costum-theme')) get.Id('costum-theme').remove()

    // Adiciona a tag na pagina para que o tema seja carregado
    d.head.append(style)
}

(loadTheme)()