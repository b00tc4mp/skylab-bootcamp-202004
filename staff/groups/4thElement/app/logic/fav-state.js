function favState(token, forecastSelected, callback){
    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
        {
            'Authorization': `Bearer ${token}`
        },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                const userLoged = JSON.parse(body)
                const { favSpots = [] } = userLoged

                let following;
                favSpots.map((element) => {
                    shit = element.name.indexOf(forecastSelected.name)
                    if(shit!==-1) following=true;
                })
                callback(undefined, following)
            }
        })
}

