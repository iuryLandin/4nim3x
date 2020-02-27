import { get } from '../../../frameworks/czark.js'

function getSearchEngine() {
    let result = []

    result = [...result, ...getData()]

    return result

    function getData(pos = 0) {
        let enginePage = get.Local(`searchEngine-${pos}`)

        if(!enginePage) return []

        const next = enginePage[0]

        enginePage.shift()

        if (next) enginePage = [...enginePage, ...getData(next)]
        
        return enginePage.sort((a, b) => {
            if ( a[1] > b[1] ) return ( 1)
            if ( b[1] > a[1] ) return (-1)
            return ( 0)
        })
    }
}

export default getSearchEngine