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

                let indexOfName;
                let acc=0;
                favSpots.map((element) => {
                    halo = element.name.indexOf(spotSelected.name)
                    if(halo!==-1) indexOfName=acc;
                    acc++
                })

                if (indexOfName === undefined) {
                    spotSelected.following=true
                    favSpots.push(spotSelected)
                } else {
                    favSpots.splice(indexOfName, 1)
                    callback(undefined, favSpots)
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