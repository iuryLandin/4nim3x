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