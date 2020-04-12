// armazena o id que a função setTimeout retorna para caso
// seja necessário parar de salvar as configurações.
var timeoutId = null

// configurações padrão que a página irá utilizar na primeira inicilização
// também é a variável global que o app acessa buscando as configs salvas.
var settings = {
    autoplay: false,
    defaultLaunch:  'home',
    episodeOrder:   'AZ',
    theme:          'dark',
    costumTheme: {
        primary:    '#610061',
        accent:     '#800080',
        accent2:    '#4d194d',
        background: '#ffffff',
        background2:'#ededed',
        infos:      '#ffffff',
        fontColor:  '#800080'
    }
}

// Carrega as configurações do usuário
function loadSettings () {
    const loaded = get.Local('settings')
    if (loaded) settings = loaded
}

// Salva as configurações da do usuário
async function saveSettings () {
    if (typeof settings == 'object') {
        set.Local('settings', settings)
        console.log('configurações salvas!')
    }

    // torna a função recursiva
    this.timeoutId = setTimeout(saveSettings, 5000)
}

loadSettings()
saveSettings()