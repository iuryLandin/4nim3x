import { getCostumStyleTag, getNavThemeTag } from "./scripts/getCostumStyle.js"
import { get, del } from "../js/utils/CzarK.js"

const BODY = document.body
const HEAD = document.head

export const loadTheme = theme => {
  get.Queries('#costum-theme').forEach(del.element)
  HEAD.append(getNavThemeTag(theme))
  BODY.classList.add(theme)
}
export const loadCostumTheme = costumTheme => {
  const style = getCostumStyleTag(costumTheme)

  HEAD.append(style)
}

export const changeTheme = newTheme => {
  const currentTheme = BODY.classList.value

  $(BODY)
    .addClass(newTheme)
    .removeClass(currentTheme)
}

export const changeCostumTheme = (theme, costumTheme) => {
  const COSTUM_STYLE = get.Id('costum-theme')
  const style = getCostumStyleTag(costumTheme)
  
  if (COSTUM_STYLE)
    COSTUM_STYLE.remove()

  loadTheme(theme)
  HEAD.append(style)
}