function searchUsers(token, query, callback) {
  if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
  if (!token.trim().length) throw Error('token is empty')

  if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
  if (!query.trim().length) throw Error('query is empty')

  if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

  call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
    undefined,
    { 'Authorization': `Bearer: ${token}` }, (error, status, body) => {
      if (error) return callback(error)
      if (status === 200) {
        const users = JSON.parse(body)

        const _users = users.filter(function (user) {

          return (
            user.username.toLowerCase().includes(query) ||
            user.name && user.name.toLowerCase().includes(query) ||
            user.surname && user.surname.toLowerCase().includes(query)
          );
        })

        const __users = _users.map(({ username, name, surname, id }) => ({ email: username, name, surname, id }))

        callback(undefined, __users)
      } else {
        const { error } = JSON.parse(body)

        callback(new Error(error))
      }
    }
  )
}