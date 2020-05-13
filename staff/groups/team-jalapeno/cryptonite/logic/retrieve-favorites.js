function retrieveFavorites(callback, favoritesIds) {
    Function.validate(callback)
   // if (typeof favoritesIds !== 'array') throw new Error(favoritesIds + 'is not valid')

    const url = `https://api.coincap.io/v2/assets?&ids=${favoritesIds.join(',')}`
    const headers = { 'Content-type': 'application/json' }
    const body = undefined

    call('GET', url, body, headers, (error, status, response) => {

        if (error) return callback(error)

        if (status === 200) {
            const { data } = JSON.parse(response)
            return callback(undefined, data)
        }

        callback(new Error('server error'))
    })
} 