const { useState } = React

function Home({ user, logOut, useremail, token }) {

  const [mediavida, setMediavida] = useState(undefined)
  const [view, setView] = useState('spinner')

  useEffect(() => {
    try {
      retrieveUser(token, (error, user) => {
        if (error) throw error

        const hash = location.hash.substring(1)
        location.hash = hash ? hash : 'users'
        setView(hash ? hash : 'users')
      })
    } catch (error) {
      throw error
    }
  }, [])

  const goToView = view => {
    location.hash = view === 'users' || view === 'google' || view === 'mediavida' || view === 'twitter' || view === 'ecosia' ? view : ''

    setView(view)
  }

  const handleOnGoogle = (event) => {
    event.preventDefault()

    goToView('google')
  }

  const handleOnUsers = (event) => {
    event.preventDefault()

    goToView('user')
  }

  const handleOnEcosia = (event) => {
    event.preventDefault()
    goToView('ecosia')
  }

  const handleOnNews = (event) => {
    event.preventDefault()
    goToView('mediavida')
  }

  const handleOnTwitter = () => {
    event.preventDefault()
    goToView('twitter')
  }

  const handleRetrieveHolaNewsResults = results =>
    setMediavida(results)

  return <section className="home">
    <h1>Welcome {user}</h1>
    <button onClick={logOut}>Logout</button>
    <ul className="links">
      <a onClick={handleOnUsers} className="home__link" href="">Users</a>
      <a onClick={handleOnGoogle} className="home__link" href="">Google</a>
      <a onClick={handleOnEcosia} className="home__link" href="">Ecosia</a>
      <a onClick={handleOnNews} className="home__link" href="">Mediavida</a>
      <a onClick={handleOnTwitter} className="home__link" href="">Twitter</a>
    </ul>
    {view === 'spinner' && <Spinner />}
    {view === 'user' && <User token={token} useremail={useremail} />}
    {view === 'google' && <Google />}
    {view === 'ecosia' && <Ecosia />}
    {view === 'mediavida' && <HomeNews results={mediavida} onNews={handleRetrieveHolaNewsResults} />}
    {view === 'twitter' && <Twitter onClick useremail={useremail} token={token} />}
  </section>
}

