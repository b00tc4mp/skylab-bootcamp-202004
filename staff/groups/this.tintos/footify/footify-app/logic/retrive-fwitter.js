function retriveFwitter(token, callback) {

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined, { Authorization: `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {

                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
                    undefined, { Authorization: `Bearer ${token}` },
                    (error, status, body) => {
                        if (error) return callback(error)

                        if (status === 200) {
                            let users = JSON.parse(body)
  
                            const results =[]
                            users.forEach(({id:idUser,name: nameUser,surname: surnameUser,fwitter})=>{
                                
                                if(fwitter){
                                    results.push({ idUser,nameUser,surnameUser,fwitter})
                                } 
                            })
                            const arrfwitter = creatFwitterArray(results)
                            callback(undefined,arrfwitter)
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
