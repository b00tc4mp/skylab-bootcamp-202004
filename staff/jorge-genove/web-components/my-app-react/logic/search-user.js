function searchUsers(query, token, callback) {
  query = query.toLowerCase();
  
  call(
    "GET",
    "https://skylabcoders.herokuapp.com/api/v2/users/all",
    undefined,
    { Authorization: `Bearer ${token}` },
    (error, status, body) => {
      if (error) return callback(error);
      if (status === 200) {
        

        let users = JSON.parse(body);
        users = users.filter(function (user) {
          const { name, surname, username: email } = user;

          return (
            email.toLowerCase().includes(query) ||
            name && name.toLowerCase().includes(query) ||
            surname && surname.toLowerCase().includes(query)
          );
        });

        
       callback(undefined, users);
      } else {
        const { error } = JSON.parse(body);

        callback(new Error(error));
      }
    }
  );
}
