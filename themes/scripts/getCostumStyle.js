export const getCostumStyleTag = ({ primary, accent, accent2, background, background2, infos, fontColor }) => {
  const style = document.createElement('style')
  
  style.setAttribute('id', 'costum-theme')
  style.insertAdjacentHTML('beforeend', `
    .costum {
      --primary:      ${primary};
      --accent:       ${accent};
      --accent_2:     ${accent2};
      --background:   ${background};
      --background_2: ${background2};
      --infos:        ${infos};
      color:          ${fontColor};
    }
  `)

  return style
}

export const getNavThemeTag = themeName  => {
  const themeBar = {
    'dark': '#2b2b2b',
    'amoled': '#000000',
    'purple': '#800080',
    'purple-dark': '#610061',
    'midnight-violet': '#7500bf',
    'aquamarine': '#0255af',
    'night-ocean': '#009ac0',
    'costum': 'undefined'
  }

  const navColor = document.createElement('meta')
  navColor.setAttribute('name', 'theme-color')
  navColor.setAttribute('content', themeBar[themeName])
  navColor.setAttribute('id', 'costum-theme')
  return navColor
}