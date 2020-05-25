import { get } from './utils/CzarK.js'

const HIDE = 'hide'
const SHOW = 'show'
const LOADING = get.Id('loading')

export const showLoading = () => { LOADING.classList.replace(HIDE, SHOW) }
export const hideLoading = () => { LOADING.classList.replace(SHOW, HIDE) }