function Loading(status) {
    const loading = $("#loading")


    if (status)
        loading.show()
    else
        loading.hide()
}

export default Loading