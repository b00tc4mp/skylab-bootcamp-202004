function searchSpotList(query, callback) {

    surfSpots = [{ name: 'Pipeline, Hawaii', coordinates: '21.665000, -158.052489' }, { name: 'Jeffreys Bay, South Africa', coordinates: '-34.033355, 24.932330' }, { name: 'Teahupoo, French Polynesia', coordinates: '-17.849697, -149.267093' }, { name: 'Uluwatu, Bali', coordinates: '-8.810389, 115.104919' }, { name: ' P-Pass, Micronesia', coordinates: '6.940795, 158.169042' }, { name: "Maverick's, California", coordinates: "37.495501, -122.497037" }, { name: "Hossegor, France", coordinates: "43.669945, -1.440790" }, { name: "Puerto Escondido, Mexico", coordinates: "15.859872, -97.084793" }]

    //hacer los errores y cambier el array de valores a un archivo aparte

    let spotsFound = surfSpots.filter(function (spot) {
        const { name } = spot

        return name && name.toLowerCase().includes(query)
    })

    callback(spotsFound)

}