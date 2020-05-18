const { useState, Component } = React

function User({ token }) {
  const [users, setUsers] = useState(undefined)
  const [query, setQuery] = useState(undefined)

  const handleSearch = query =>
    searchUsers(query, token, (error, users) => {
      debugger
      if (error) console.log(error)
      setUsers(users)
      setQuery(query)
    })

  const onToggleFollow = query => {
    debugger
    handleSearch(query)
  }

  return <section className="users">
    <h2>Users</h2>
    <Search onSubmit={handleSearch} />
    {users && <Result users={users} onToggleFollow={onToggleFollow} token={token} />}
  </section>
}

