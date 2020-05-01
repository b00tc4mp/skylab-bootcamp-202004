function searchUsers(query, token, callback) {
    debugger;
    call(
      "GET",
      "https://skylabcoders.herokuapp.com/api/v2/users/all",
      undefined,
      { "Content-type": "application/json", "Authorization": `Bearer ${token}`},
      (error, status, body) => {
        if (error) return callback(error);
        if (status === 200) {
          debugger;
          const users = JSON.parse(body);
          const user = users.filter( (query) => {
            return user.username.includes(query)
          });
          callback(undefined, user);
        } else {
          const { error } = JSON.parse(body);
  
          callback(new Error(error));
        }
      }
    );
    return user
  }