const themeSelection = get.Id('theme')

listen('input', updateSettings)
listen('submit', resetConfigs)

// Carrega na página as configurações atualmente salvas na localStorage
;(function loadPage() {
    let { defaultLaunch, episodeOrder, theme, costumTheme } = settings
    let { primary, accent, accent2, background, background2, infos, fontColor } = costumTheme

    // Carrega as configurações de uso do app salvas
    get.Id('initial-screen').value  = defaultLaunch
    get.Id('order-type').value      = episodeOrder
    get.Id('app-theme').value       = theme

    // Carrega os valores do tema costumizado atualmente aplicado
    get.Id('primary').value     = primary
    get.Id('accent').value      = accent
    get.Id('accent2').value     = accent2
    get.Id('background').value  = background
    get.Id('background2').value = background2
    get.Id('infos').value       = infos
    get.Id('font-color').value  = fontColor
})()

// Atualiza as configurações toda vez que houver um input por parte do usuário
function updateSettings() {
    settings = {
        defaultLaunch:  get.Id('initial-screen').value,
        episodeOrder:   get.Id('order-type').value,
        theme:          get.Id('app-theme').value,
        costumTheme: {
            primary:        get.Id('primary').value,
            accent:         get.Id('accent').value,
            accent2:        get.Id('accent2').value,
            background:     get.Id('background').value,
            background2:    get.Id('background2').value,
            infos:          get.Id('infos').value,
            fontColor:      get.Id('font-color').value
        }
    }
    clearTimeout(timeoutId)
    saveSettings()
    changeTheme()
}

// restaura as configurações ao padrão
function resetConfigs(e) {
    e.preventDefault()
    del.fromLocal('settings')
    location.reload();
}