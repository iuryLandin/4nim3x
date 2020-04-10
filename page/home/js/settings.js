var settings = {
    autoplay: false,
    defaultLaunch: 'home',
    episodeOrder: 'AZ',
    theme: 'light',
    costumTheme: {
        primary: '#610061',
        accent: '#800080',
        accent2: '#4d194d',
        background: '#baabba',
        icons: '#fff',
        fontColor: '#800080'
    }
}

// Carrega as configurações do usuário
function loadSettings () {
    const loaded = get.Local('settings')
    if (loaded && (typeof loaded == 'object')) settings = loaded
}

// Salva as configurações da do usuário
async function saveSettings () {
    if (typeof settings == 'object') {
        set.Local('settings', settings)
        console.log('configurações salvas!')
    }

    // torna a função recursiva
    setTimeout(saveSettings, 5000)
}

loadSettings();
saveSettings();
listen('beforeunload', saveSettings);