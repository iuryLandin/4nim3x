/**
 * Arquivo que armazena e inicializa as configurações do app
 * Neste arquivo é salvo globalmente uma variável 'settings'
 * que será acessível em todas as páginas do site para modi-
 * ficação de recursos na página.
 * 
 * Criado por JulCzar
 * Ultima modificação - JulCzar - 22/04/2020
 */

// armazena o id que a função setTimeout retorna para caso
// seja necessário parar de salvar as configurações.
var timeoutId = null

// configurações padrão que a página irá utilizar na primeira inicilização
// também é a variável global que o app acessa buscando as configs salvas.
var settings = {
    autoplay: false,
    defaultLaunch:  'home',
    episodeSortMode:'afterbegin',
    theme:          'purple',
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
    // carrega as configurações do usuario salva na localStorage
    const settingsSaved = get.Local('settings')
    // verifica se as configurações existem na local Storage antes
    // de substituir na variável global settings.
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
    timeoutId = setTimeout(saveSettings, 500)
}

// encapsulamento usado para acesso à api em todos os ambientes que for necessário.
async function getApiData(endpoint) {
    return await $.get(`https://animexapi.herokuapp.com/${endpoint}`).fail(console.warn)
}

loadSettings()
    .then(saveSettings)