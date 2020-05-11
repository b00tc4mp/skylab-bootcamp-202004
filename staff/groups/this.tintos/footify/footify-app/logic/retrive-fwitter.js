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
                            callback(undefined,results)
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
// retriveFwitter('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWI5Mzc3ZDZlMjVmYzAwMTU4MDEyMzMiLCJpYXQiOjE1ODkyMDUxNTcsImV4cCI6MTU4OTIwODc1N30.Qc1v3s3PGUflLJ6W0yIkr5M9TyM9fPu3lsRicmys1pE',(error,results)=>{
// console.log(results)
// })