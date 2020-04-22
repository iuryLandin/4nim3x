import { get } from "../frameworks/czark.js";

(function () {
    if(get.Local('useNewLayout'))
    location = `${location.href}page/home`
})()
