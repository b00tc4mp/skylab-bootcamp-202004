function addToFavs(token, spotSelected, callback) {

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
        {
            'Authorization': `Bearer ${token}`
        },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                const userLoged = JSON.parse(body)

                const { favSpots = [] } = userLoged

                const indexOfCord = favSpots.indexOf(spotSelected.coordinates) //i will control if it is alrady on favs outside the call sow we can change the color of the fav tag to make it more responsive
                const indexOfName = favSpots.indexOf(spotSelected.name)


                if (indexOfCord === -1 && indexOfName === -1) favSpots.push(spotSelected)
                


                call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify({ favSpots }),
                    {
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    },
                    (error, status, body) => {
                        if (error) return callback(error)

                        if (status === 204) {
                            callback()
                        } else {
                            const { error } = JSON.parse(body)

                            callback(new Error(error))
                        }
                    })
            } else {
                const { error } = JSON.parse(body)

                callback(new Error(error))
            }
        })



}