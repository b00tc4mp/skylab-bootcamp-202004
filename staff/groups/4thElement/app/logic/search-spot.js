function searchSpotList(query, sportState, callback) {
    if (sportState === 'surf') {
        spotsFound = surfSpots.filter(function (spot) {
            const { name } = spot
            return name && name.toLowerCase().includes(query) || name===query
        })
    } else{
        spotsFound = snowSpots.filter(function (spot) {
            const { name } = spot
            return name && name.toLowerCase().includes(query) || name===query
        })
    }

    callback(spotsFound)

}