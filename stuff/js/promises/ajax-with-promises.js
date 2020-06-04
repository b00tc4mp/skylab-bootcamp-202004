fetch('https://skylabcoders.herokuapp.com/api/hotwheels/vehicles?q=black')
    .then(res => res.json())
    .then(vehicles => {
        const first10 = vehicles.slice(0, 10)

        const details = first10.map(vehicle =>
            fetch(`https://skylabcoders.herokuapp.com/api/hotwheels/vehicles/${vehicle.id}`)
                .then(res => res.json())
        )

        return Promise.all(details)
    })
    .then(vehicles => vehicles.forEach(console.log))