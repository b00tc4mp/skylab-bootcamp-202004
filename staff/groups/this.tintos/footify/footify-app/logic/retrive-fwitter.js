/**
 * Checks user credentials.
 * 
 * @param {string} token The expression to be called after checking credentials, receiving an Error or an authentication token.
 * @param {callback} callback The expression to be called after checking credentials, receiving an Error or a body.
 * @returns Array with objects with the fwitt of all users
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 */


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
                      users.forEach(({id:idUser,name: nameUser,surname: surnameUser,fwitter, username: email})=>{
                                
                                if(fwitter){
                                    results.push({ idUser,nameUser,surnameUser,fwitter, email})
                                } 
                            })

                            callback(undefined,results)
                        } else {
                            const { error } = JSON.parse(body)

                            callback(new Error(error))
                        }

                    })
}


/**
 * Invoked after remote authentication.
 * 
 * @callback callback
 * @param {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * @return {object} results is an Array of objects 
 * 
 */                  