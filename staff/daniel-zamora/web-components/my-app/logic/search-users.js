function searchUsers(query) {
  query = query.toLowerCase();
  
    const _users = users.filter(user => {
        return user.name.toLowerCase().includes(query) || user.surname.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
    });
  
    return _users;
}

