
const { useState, useEffect } = React

function Home({ token, onLogout }) {

  const [view, setView] = useState('users')
  const [usersResults, setUsersResults] = useState(undefined)
  const [googleResults, setGoogleResults] = useState(undefined)
  const [name, setName] = useState(undefined)

  useEffect(() => {
    try {
      retrieveUser(token, (error, user) => {
        if (error) throw error

        const { name } = user
        setName(name)
      })
    } catch (error) {
      throw error
    }
  }, [])

  const handleLogout = e => {
    e.preventDefault()

    onLogout()
  }

  const usersSearch = e => {
    e.preventDefault()

    setResults(undefined)
    setView('users')
  }

  const googleSearch = e => {
    e.preventDefault()

    setResults(undefined)
    setView('google')
  }
  const twitterFeed = e => {
    e.preventDefault()

    setResults(undefined)
    setView('feed')
  }

  const handleUsersQuery = (request) => {
    if (view === 'users') {
      searchUsers(token, query, (error, usersFound) => {
        if (error) throw new Error(error)

        if (usersFound.length)
          setUsersResults(usersFound)
        else
          setUsersResults([])

      })
    }
  }
  const handleGoogleQuery = (request) => {
    if (view === 'google') {
      google(request, (queryResults) => {
        queryResults.length ?
          this.setGoogleResults(queryResults) : setGoogleResults([])

      })
    }
  }


  return <section className="home-nav"><h1>Welcome, {name}!</h1>
    <a href="#" onClick={usersSearch}>Users Search </a>
    <a href="#" onClick={googleSearch}>Google Search </a>
    <a href="#" onClick={twitterFeed}>Twitter Feed</a>
    <button className="logout-button" onClick={handleLogout}>Log out</button>

    {view === 'users' && <UsersResults results={usersResults} userToken={token} searchSubmit={handleUsersQuery} />}
    {view === 'google' && <GoogleResults results={googleResults} searchSubmit={handleGoogleQuery} />}
    {view === 'feed' && <Feed results={results} userToken={token} />}
  </section>
}