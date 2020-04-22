function searchUsers(query) {
    const request = query.toLowerCase();

    const _users = users.filter(function (user) {

      return (
        user.email.toLowerCase().includes(request) ||
        user.name.toLowerCase().includes(request) ||
        user.surname.toLowerCase().includes(request)
      );
    });
  
    if (_users.length < 1) throw new Error("You has 0 results.");
  
    const usersFound = [];
    for (let i = 0; i < _users.length; i++) {
      usersFound.push({
        name: _users[i].name,
        surname: _users[i].surname,
        email: _users[i].email,
      });
    }
  
    console.log(usersFound);
    return usersFound;
  }