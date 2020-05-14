function addNewReview(token, newReview, callback) {



    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
        {
            'Authorization': `Bearer ${token}`
        },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                const userLoged = JSON.parse(body)

                const { spotReview = [] } = userLoged
                newReview.name = userLoged.name
                newReview.surname = userLoged.surname
                newReview.username = userLoged.username
                spotReview.push(newReview)

                call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify({ spotReview }),
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