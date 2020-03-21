const d = document

d.addEventListener('keydown', detectFunction)

function detectFunction(evt) {
    control = controls[evt.code]

    if (control) control()
}