import { getTheme, getCostumTheme } from "../settings/settings.js"
import { getCostumStyleTag } from "./scripts/getCostumStyle.js"
import { get } from "../js/utils/CzarK.js"

const BODY = document.body
const HEAD = document.head

export const changeTheme = () => {
  const currentTheme = BODY.classList.value
  const newTheme = getTheme()

  $(BODY)
    .addClass(newTheme)
    .removeClass(currentTheme)

  loadTheme()
}

export const loadTheme = () => {
  const theme = getTheme()
  const costumTheme = getCostumTheme()
  const COSTUM_STYLE = get.Id('costum-theme')
  const style = getCostumStyleTag(costumTheme)
  
  if (COSTUM_STYLE) COSTUM_STYLE.remove()
  
  BODY.classList.add(theme)
  HEAD.append(style)
}