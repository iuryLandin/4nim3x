function getDataFromURL() {
    let urlData = location.search.split("=")

    urlData.splice(0, 1)

    return urlData
}

export default getDataFromURL