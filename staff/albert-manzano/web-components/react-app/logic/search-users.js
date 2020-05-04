function searchUsers(token,query, callback) {
  query = query.toLowerCase()

  call(
    "GET",
    "https://skylabcoders.herokuapp.com/api/v2/users/all",
    undefined,
    { "Content-type": "application/json", "Authorization": `Bearer: ${token}` },
    (error, status, body) => {
      if (error) return callback(error);

      if (status === 200) {
        let users = JSON.parse(body);

        users = users.filter(function (user) {
          const { name, surname, email,id } = user

          return name && name.toLowerCase().includes(query) || surname && surname.toLowerCase().includes(query) || email && email.toLowerCase().includes(query)
        });

        users = users.map(({ name, surname, username,id }) => ({ name, surname, email: username,id }))
        callback(undefined,users);
      } else {
        const { error } = JSON.parse(body);

        callback(new Error(error));
      }
    }
  );
}

