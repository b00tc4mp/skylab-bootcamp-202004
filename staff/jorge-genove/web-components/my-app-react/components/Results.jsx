function Result({ users, token, onToggleFollow }) {
  function handleToogleFollow(followingId) {
    try {
      toggleFollowers(followingId, token, error => {
        if (error) throw error
        onToggleFollow()
      })
    } catch (error) {
      if (error) throw error
    }
  }

  return <section className="results">
    {
      users.length ?
        <ul>{users.map(({ id, name, surname, email, following }) =>
          <li>{`${name} ${surname} ${email}`} {
            typeof following !== 'undefined' ?
              <button onClick={() => handleToogleFollow(id)}>
                {following ? 'Unfollow' : 'Follow'}
              </button>
              :
              undefined
          }
          </li>
        )}</ul>
        : <Feedback message="no users" level="warning" />
    }
  </section>
}
