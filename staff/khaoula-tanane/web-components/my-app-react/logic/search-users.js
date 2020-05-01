function searchUsers(token, query, callback) {
  query = query.toLowerCase();

  const body = undefined;
  const url = "https://skylabcoders.herokuapp.com/api/v2/users/all";
  const headers = { Authorization: `Bearer ${token}` };

  call("GET", url, body, headers, (error, status, response) => {
    if (error) return callback(error);

    if (status === 200) {
      let users = JSON.parse(response);
      users = users.filter(function (user) {
        const { name, surname, username } = user;
        return (
          (name && name.toLowerCase().includes(query)) ||
          (surname && surname.toLowerCase().includes(query)) ||
          username.toLowerCase().includes(query)
        );
      });

      users = users.map(({ name, surname, username }) => ({
        name,
        surname,
        email: username,
      }));
      return callback(undefined, users);
    }
    const { _error } = JSON.parse(response);
    return callback(new Error(_error));
  });
}
