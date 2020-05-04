function searchUsers(token, query, callback) {
  String.validate.notVoid(token)
  // String.validate.alphabetic(query)
  Function.validate(callback)

  query = query.toLowerCase()

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
      undefined,
      { "Authorization": `Bearer ${token}`}, (error, status, body) => {
        if (error) return callback(error)
                if (status === 200) {
          let users = JSON.parse(body);
          users = users.filter( (user) => {
            const {name, surname, username} = user
            return username && username.toLowerCase().includes(query) || name && name.toLowerCase().includes(query) || surname && surname.toLowerCase().includes(query)
          });
          users = users.map(({name, surname, username}) => ({name, surname, email: username}));
          // users = [name, surname, username].reduce((a,b) => {
          //   return a.concat(b);
          // })
          callback(undefined, users)
                } else {
          const { error } = JSON.parse(body);
  
          callback(new Error(error));
        }
      }
    )
  }

  
  
  
  