function capsule(token, callback) {debugger
    
    call('GET',"https://skylabcoders.herokuapp.com/api/v2/users",undefined,
    {Authorization: `Bearer ${token}`}, 
    (error,status,body)=> {
        if(error) console.error(error)
        if(status === 200) {
            const {favoriteTracks} = JSON.parse(body)
           
            var randomArr = []

            while(randomArr.length < 5) {
                const random = Math.floor((Math.random()*favoriteTracks.length))

                if((!randomArr.includes(favoriteTracks[random]) &&  favoriteTracks[random].preview_url !== null)) randomArr.push(favoriteTracks[random])

            }
            callback(undefined, randomArr)
        }else{
            const {error} = JSON.parse(body)
            callback(new Error(error))
        }
    })
}

