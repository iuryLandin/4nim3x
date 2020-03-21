const d = document

d.addEventListener('keydown', detectFunction)

function detectFunction(evt) {
    control = controls[evt.code]
    console.log(evt.code)

    if (control) control()
}