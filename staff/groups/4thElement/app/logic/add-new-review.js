function addToFavs(token, body, callback) {

    

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
        {
            'Authorization': `Bearer ${token}`
        },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                const userLoged = JSON.parse(body)

                const { favSpots = [] } = userLoged

                let indexOfName;
                favSpots.map((element) => {
                    indexOfName = element.name.indexOf(spotSelected.name)
                    if(indexOfName!==-1) return indexOfName;
                })

                if (indexOfName === -1) {
                    spotSelected.following=true
                    favSpots.push(spotSelected)
                }

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