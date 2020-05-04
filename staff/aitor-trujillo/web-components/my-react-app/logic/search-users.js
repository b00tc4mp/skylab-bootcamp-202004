// function searchUsers(query) {
//   const request = query.toLowerCase();

//   const _users = users.filter(function (user) {
//     return (
//       user.email.toLowerCase().includes(request) ||
//       user.name.toLowerCase().includes(request) ||
//       user.surname.toLowerCase().includes(request)
//     );
//   });

//   const usersFound = [];
//   for (let i = 0; i < _users.length; i++) {
//     usersFound.push({
//       name: _users[i].name,
//       surname: _users[i].surname,
//       email: _users[i].email,
//     });
//   }

//   return usersFound;
// }

function searchUsers(query, token, callback) {
  const request = query.toLowerCase();

  call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
    undefined,
    { Authorization: `Bearer ${token}` }, (error, status, response) => {
      if (error) callback(error)

      const apiUsers = JSON.parse(response)

      if (status === 200) {

        const users = apiUsers.filter(function (user) {
          return (
            user.username.toLowerCase().includes(query) ||
            user.name.toLowerCase().includes(query) ||
            user.surname.toLowerCase().includes(query)
          );
        });
        callback(undefined, users)
      } else {
        const error = JSON.parse(response)

        callback(new Error(error))

      }
    }
  )
}