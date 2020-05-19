function searchUsers(query) {
    if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    if (!query.trim().length) throw Error('query is empty')
    
    const request = query.toLowerCase();

    const _users = users.filter(function (user) {

      return (
        user.email.toLowerCase().includes(request) ||
        user.name.toLowerCase().includes(request) ||
        user.surname.toLowerCase().includes(request)
      );
    });
    
    const usersFound = [];
    for (let i = 0; i < _users.length; i++) {
      usersFound.push({
        name: _users[i].name,
        surname: _users[i].surname,
        email: _users[i].email,
      });
    }
    
    return usersFound;
  }