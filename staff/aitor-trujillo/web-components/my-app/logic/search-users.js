function searchUsers(query) {
  // query = pepito
  // TODO find users matching query in name, surname, email

  const request = query.toLowerCase();

  const _users = users.filter(function (user) {
    // TODO match user.name contains query || user.surname contains query || ...
    return (
      user.email.toLowerCase().includes(request) ||
      user.name.toLowerCase().includes(request) ||
      user.surname.toLowerCase().includes(request)
    );
  });

  if (_users.length < 1) throw new Error(query + " has 0 results.");

  // TODO sanitize: create new objects of users without password

  const usersFound = [];
  for (let i = 0; i < _users.length; i++) {
    usersFound.push({
      name: _users[i].name,
      surname: _users[i].surname,
      email: _users[i].email,
    });
  }

  // TODO return _users
  console.log(usersFound);
  return usersFound;
}
