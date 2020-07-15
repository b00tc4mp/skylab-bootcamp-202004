const { useState, useEffect } = React

function Home({ token, onLogout, onUserSessionExpired}) {

    const [user, setUser] = useState('')
    const [view, setView] = useState('users')
    const [userResults, setUserResults] = useState(undefined)
    const [userQuery, setUserQuery] = useState(undefined)
    const [googleResults, setGoogleResults] = useState(undefined)
    const [googleQuery, setGoogleQuery] = useState(undefined)
    const [holaNews, setHolaNews] = useState(undefined)


    useEffect(() => {
        if (token) {
            try {
                retrieveUser(token, (error, {name}) => {
                    if (error) throw error
                    setUser(name)
                })
            } catch (error) {
                throw error
            }
        }
    }, [])

    const handleUsers = event => {
        event.preventDefault()

        setView('users')
    }

    const handleGoogle = event => {
        event.preventDefault()

        setView('google')
    }

    const handleHolaNews = event => {
        event.preventDefault()

        setView('hola-news')
    }

    const handleTwitter = event => {
        event.preventDefault()
        
        setView('twitter')
    }

    const handleSearchUsersResultsAndQuery = (results, query) => {
        setUserResults(results)
        setUserQuery(query)
    }


    const handleSearchGoogleResultsAndQuery = (results, query) => {
        setGoogleResults(results)
        setGoogleQuery(query)
    }


    const handleRetrieveHolaNewsResults = news => {
        setHolaNews(news)
    }


    return <section className="home">
        <h1>Welcome, {user}!</h1>
        <a className={`home__link ${view === 'users' ? 'home__link--active' : ''}`} href="" onClick={handleUsers}>Users </a>
        <a className={`home__link ${view === 'google' ? 'home__link--active' : ''}`} href="" onClick={handleGoogle}>Google </a>
        <a className={`home__link ${view === 'hola-news' ? 'home__link--active' : ''}`} href="" onClick={handleHolaNews}>Hola News </a>
        <a className={`home__link ${view === 'twitter' ? 'home__link--active' : ''}`} href="" onClick={handleTwitter}>Twitter </a>
        <button onClick={onLogout}>Logout</button>

        {view === 'users' && <Users onSearch={handleSearchUsersResultsAndQuery} users={userResults} query={userQuery} token={token}  onUserSessionExpired={onUserSessionExpired}/>}
        {view === 'google' && <Google onSearch={handleSearchGoogleResultsAndQuery} results={googleResults} query={googleQuery} />}
        {view === 'hola-news' && <HolaNews onNews={handleRetrieveHolaNewsResults} news={holaNews} />}
        {view === 'twitter' && <Twitter getToken={token} />}
    </section>

}