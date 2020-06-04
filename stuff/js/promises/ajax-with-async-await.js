(async () => {

    try {
        const res = await fetch('https://skylabcoders.herokuapp.com/api/hotwheels/vehicles?q=black')
        const vehicles = await res.json()

        const first10 = vehicles.slice(0, 10)

        const details = first10.map(async vehicle => {
            const res = await fetch(`https://skylabcoders.herokuapp.com/api/hotwheels/vehicles/${vehicle.id}`)

            return await res.json()
        })

        const _vehicles = await Promise.all(details)

        _vehicles.forEach(console.log)

        console.log('finito')
    } catch (error) {
        console.error(error)
    }

})()
    //.then(() => console.log('finito'))