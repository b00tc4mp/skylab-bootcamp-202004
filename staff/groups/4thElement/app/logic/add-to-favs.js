function addToFavs(token, spotSelected, callback) {

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
        {
            Authorization: `Bearer ${token}`
        },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                const userLoged = JSON.parse(body)

                const { favSpots = [] } = userLoged

                const index = favSpots.indexOf(spotSelected)

                if (index === -1) favSpots.push(spotSelected)
                


                call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify({ favSpots }),
                    {
                        Authorization: `Bearer ${token}`,
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