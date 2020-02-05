function fixApiBug(data) {
    let resFixed = data
        .split('</b><br />')

    const arrLength = resFixed.length - 1

    resFixed = (
        JSON.parse(
            resFixed[arrLength]
        )
    )

    return resFixed
}

export default fixApiBug