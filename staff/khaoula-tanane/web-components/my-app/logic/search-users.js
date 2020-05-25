function searchUsers(query) {
  if (!query) return [];

  let _users = users.filter(function (user) {
    return (
      user.name.includes(query) ||
      user.email.includes(query) ||
      user.surname.includes(query)
    );
  });

  _users = _users.map(({ name, surname, email }) => {
    return { name, surname, email };
  });

  return _users;
}
