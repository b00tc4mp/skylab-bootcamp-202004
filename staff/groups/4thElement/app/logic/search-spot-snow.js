function searchSpotListSnow(query, callback) {

    surfSpots = [{ name: 'Granvalir, Andorra', coordinates: 'Granvalir, Andorra' }, { name: 'Les 2 Alpes, France', coordinates: 'Les 2 Alpes' }, { name: 'Hakuba, Japon', coordinates: 'Hakuba, Japan' }, { name: 'Aspen, Colorado', coordinates: 'Aspen, Colorado' }, { name: 'Formigal-Panticosa, Spain', coordinates: 'Formigal-Panticosa, Spain' }, { name: "Baqueira beret, Spain", coordinates: "Baqueira beret, Spain" }, { name: "Ski Portillo, Chile", coordinates: "Ski Portillo, Chile" }, { name: "Courchevel, France", coordinates: "Courchevel, France" }]
    //add to data

    let spotsFound = surfSpots.filter(function (spot) {
        const { name } = spot

        return name && name.toLowerCase().includes(query)
    })

    callback(spotsFound)
}