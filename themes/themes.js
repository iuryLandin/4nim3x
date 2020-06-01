import { getCostumStyleTag } from "./scripts/getCostumStyle.js"
import getSettings from "../settings/settings.js"
import { get } from "../js/utils/CzarK.js"

const BODY = document.body
const HEAD = document.head

const settings = getSettings()

export const changeTheme = () => {
  const currentTheme = BODY.classList.value
  const newTheme = settings.getTheme()

  $(BODY)
    .addClass(newTheme)
    .removeClass(currentTheme)

  loadTheme()
}

export const loadTheme = () => {
  const theme = settings.getTheme()
  const costumTheme = settings.getCostumTheme()
  const COSTUM_STYLE = get.Id('costum-theme')
  const style = getCostumStyleTag(costumTheme)
  
  if (COSTUM_STYLE) COSTUM_STYLE.remove()
  
  BODY.classList.add(theme)
  HEAD.append(style)
}