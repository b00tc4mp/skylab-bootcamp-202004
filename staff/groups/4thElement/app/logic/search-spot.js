function searchSpot(query) {

    let coordinates;
    if(query === 'pipeline') {
        coordinates = '21.665000, -158.052489'
    }
    call('GET', `http://api.worldweatheronline.com/premium/v1/marine.ashx?key=e440183fb8e545b0838104901200705&format=json&q=${coordinates}`, undefined, undefined, (error, status, body) => {
        if (error) return callback(error)

        if (status === 200) {
            // const { name, surname, username } = JSON.parse(body)
            const info = JSON.parse(body)
            console.log(info.data.weather[0].hourly[0].swellHeight_m)


            callback(undefined, { name, surname, email: username })
        } else {
            const { error } = JSON.parse(body)

            callback(new Error(error))
        }
    })

    // Pipeline, Hawaii: 21.665000, -158.052489
    // Jeffreys Bay, South Africa: -34.033355, 24.932330
    // Teahupoo, French Polynesia: -17.849697, -149.267093
    // Uluwatu, Bali: -8.810389, 115.104919
    // P-Pass, Micronesia: 6.940795, 158.169042
    // Maverick's, California: 37.495501, -122.497037
    // Hossegor, France: 43.669945, -1.440790
    // Puerto Escondido, Mexico: 15.859872, -97.084793
    // Cloud Nine, Siargao Island, Philippines
    // Lance's Right, Sipora, Mentawais Islands, Sumatera Barat, Indonesia
    // Sultans, North Male, Maldives
    // Trestles, Orange County, California
    // Honolua Bay, Maui, Hawaii
    // Montanita Beach, Montanita, Ecuador
    // Rincon, Santa Barbara, California
    // Nihiwatu, Sumba, Indonesia
    // Manu Bay, Raglan, New Zealand
    // Riyuewan, Sanya, Hainan Island, China
    // Jaws, Maui, Hawaii
    // Mundaka, Spain
    //"swellHeight_m": "0.2",
    //info.data.weather[0].hourly[0].swellHeight_m
}