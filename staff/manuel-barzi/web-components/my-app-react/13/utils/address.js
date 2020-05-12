const address = (() => {
    function setHash(hash) {
        location.hash = hash
    }

    function getHash() {
        let hash = location.hash.substring(1)

        const index = hash.indexOf('?')

        if (index > -1) {
            hash = hash.substring(0, index)
        }

        return hash
    }

    function hash(hash) {
        if (hash) setHash(hash)
        else return getHash()
    }

    function setHashQuery(query) {
        let hash = location.hash.substring(1)

        const index = hash.indexOf('?')

        if (index > -1) {
            hash = hash.substring(0, index + 1)
        } else hash += '?'

        if (typeof query === 'string') {
            hash += query
        } else {
            const keys = Object.keys(query)
    
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i]
    
                hash += `${key}=${query[key]}`
    
                if (i < keys.length - 1) hash += '&'
            }
        }

        location.hash = hash
    }

    function getHashQuery() {
        let query

        const hash = location.hash.substring(1)

        const index = hash.indexOf('?')

        if (index > -1) {
            query = {}

            const keyValues = hash.substring(index + 1).split('&')

            keyValues.forEach(keyValue => {
                const [key, value] = keyValue.split('=')

                query[key] = decodeURI(value)
            })
        }

        return query
    }

    function hashQuery(query) {
        if (query) setHashQuery(query)
        else return getHashQuery()
    }

    hash.query = hashQuery

    return {
        hash
    }
})()