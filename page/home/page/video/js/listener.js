listen('keydown', detectFunction)

function detectFunction(evt) {
    control = controls[evt.code]

    if (control) control()
}