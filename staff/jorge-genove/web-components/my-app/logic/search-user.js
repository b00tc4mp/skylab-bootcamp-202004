function searchUsers(query) {
  const user = users.filter(function (user) {
    return (
      user.name.includes(query) ||
      user.surname.includes(query) ||
      user.email.includes(query)
    );
  });

  return user;
}
