function searchUser(token, query, callback) {
  if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
  if (typeof query !== 'string') throw new TypeError(query + ' is not a string')
  if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)
  
  query = query.toLowerCase();

  const body = undefined;
  const url = "https://skylabcoders.herokuapp.com/api/v2/users/all";
  const headers = { Authorization: `Bearer ${token}` };

  call("GET", url, body, headers, (error, status, response) => {
    if (error) return callback(error);

    if (status === 200) {
      let users = JSON.parse(response);

      users = users.reduce((accumulator, user) =>{
        if((user.name && user.name.toLowerCase().includes(query)) ||
        (user.surname && user.surname.toLowerCase().includes(query)) ||
        user.username.toLowerCase().includes(query)){
          user.email = user.username
          accumulator.push(user)
        }
        return accumulator
      }, [])

      return callback(undefined, users);
    }
    const { _error } = JSON.parse(response);
    return callback(new Error(_error));
  });
}
  