function searchUsers(token, query, callback) {
    String.validate.notVoid(token)

    String.validate(query)

    Function.validate(callback)
    
    query = query.toLowerCase()

    //Llamamos a nuestro user y le sacamos el email: myemail

    //Llamamos a todos los usuarios y buscamos uno que tenga email === myemail

    //De ese usuario cogemos su id y su following myid=id

    //llamada all users.filter(con lo del includes) y a ese users le hacemos un map para añadir(following: following ? following.includes(id) y self:si id===myid)

    call("GET","https://skylabcoders.herokuapp.com/api/v2/users",
    undefined,{ Authorization: `Bearer ${token}` },
    (error,status,body) => {
        if(error) return callback(error);
        if(status===200){
            const {username, following} = JSON.parse(body);
            const myUsername = username;
            
            call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
            undefined,
            { Authorization: `Bearer ${token}` },
            (error, status, body) => {
                if (error) return callback(error);
                if (status === 200) {
                    let users=JSON.parse(body);

                    users = users.filter(function (user) {
                        const { name, surname, username } = user
    
                        return name && name.toLowerCase().includes(query) || surname && surname.toLowerCase().includes(query) || username.toLowerCase().includes(query)
                    })
                    
                    users = users.map(({ id, name, surname, username }) =>
                            ({ id, name, surname, email: username, following: following ? following.includes(id):false, self: username===myUsername })
                        )
                    callback(undefined,users);
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