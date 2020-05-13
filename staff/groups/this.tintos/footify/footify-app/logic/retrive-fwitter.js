function retriveFwitter(token, callback) {
    String.validate.notVoid(token);

    Function.validate(callback);


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
}

                  