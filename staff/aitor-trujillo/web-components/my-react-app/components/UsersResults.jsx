
function UsersResults({ results, userToken, searchSubmit, userEmail }) {

  function handleToggleFollow(followingId) {
    try {
      toggleFollowUser(userToken, followingId, error => {
        if (error) {
          if (error.message === 'invalid token')
            console.log('sesion expired')// onUserSessionExpired()
          else throw error
        } else onToggleFollow()
      })
    } catch (error) {
      if (error) throw error
    }
  }

  return <section>
    <Search query={searchSubmit} />

    {results && results.length && <ul>{results.map(({ id, name, surname, email, following }) => <li>{`${name} ${surname} (${email})`}<button onClick={event => { event.preventDefault(); handleToggleFollow(id) }}>{following ? 'Unfollow' : 'Follow'}</button></li>)}</ul>}
    {results && !results.length && results instanceof Array && <Feedback message="sorry, no results :(" level="warning" />}


  </section>
}


