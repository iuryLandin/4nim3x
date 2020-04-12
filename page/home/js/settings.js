// armazena o id que a função setTimeout retorna para caso
// seja necessário parar de salvar as configurações.
var timeoutId = null

// configurações padrão que a página irá utilizar na primeira inicilização
// também é a variável global que o app acessa buscando as configs salvas.
var settings = {
    autoplay: null,
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
async function loadSettings () {
    let settingsSaved = get.Local('settings')
    if (settingsSaved) settings = settingsSaved
}

// Salva as configurações da do usuário
async function saveSettings () {
    // Camada de segurança que evita que configurações inválidas sejam salvas
    if (typeof settings == 'object')
        set.Local('settings', settings)
    else {
        console.log('houve um erro ao salvar as configurações, restaurando o ultimo estado válido')
        loadSettings()
    }
    // torna a função recursiva para que a página seja salva automaticamente enquanto estiver aberta
    this.timeoutId = setTimeout(saveSettings, 500)
}

loadSettings()
    .then(saveSettings)