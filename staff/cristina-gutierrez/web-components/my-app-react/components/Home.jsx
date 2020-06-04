const { useState, useEffect } = React

function Home ({onLogout, token}) {
    
    const [view, setView] = useState ("home");
    const [googleResults, setGoogleResult] = useState ();
    const [googleQuery, setGoogleQuery] = useState ();
    const [holaNews, setHolaNews] = useState ();
    const [userResults, setUserResults] = useState ();
    const [usersQuery, setUsersQuery] = useState ();
    const [tweets, setTweets] = useState ();
    const [following, setFollowing] = useState ();
    const [name, setName] = useState ();
    
    useEffect(() => {
        try {
            retrieveUser(token, (error, user) => {
                if (error) throw error

                const hash = location.hash.substring(1)

                location.hash = hash ? hash : 'users'

                setName (user.name)

                setView (hash ? hash : 'users')
            })
        } catch (error) {
            throw error
        }
    }, [])

    const setHashView = view => {
        location.hash = view

        setView(view)
    }

    const handleUsers = event => {
        event.preventDefault()

        setHashView("users")
    }

    const handleGoogle = event => {
        event.preventDefault()

        setHashView("google")
    }

    const handleHolaNews = event => {
        event.preventDefault()

        setHashView("hola-news")
    }

    const handleTwitter = event => {
        event.preventDefault()

       setHashView("twitter")
    }
    
    const handleFollowing = event => {
        event.preventDefault()

        setFollowing (following)
    }

    const handleSearchUsersResultsAndQuery = (results, query) => {
        setUserResults (results)
        setUsersQuery (query)
    }

    const handleSearchGoogleResultsAndQuery = (results, query) => {
        setGoogleResult (results)
        setGoogleQuery (query)
    }

    const handleRetrieveHolaNewsResults = news => {
        setHolaNews (news)
    }

    const handleRetrieveTwitterResults = tweets => {
        setTweets (tweets)
    }

    return <section className="home">
        <h1>Welcome, {name}!</h1>
        <a className={`home__link ${view === 'users' ? 'home__link--active' : ''}`} href="" onClick={handleUsers}>Users </a>
        <a className={`home__link ${view === 'google' ? 'home__link--active' : ''}`} href="" onClick={handleGoogle}>Google </a>
        <a className={`home__link ${view === 'hola-news' ? 'home__link--active' : ''}`} href="" onClick={handleHolaNews}>Hola News </a>
        <a className={`home__link ${view === 'twitter' ? 'home__link--active' : ''}`} href="" onClick={handleTwitter}>Twitter </a>
        <button onClick={onLogout}> Logout </button>

        {view === 'users' && <Users onSearch={handleSearchUsersResultsAndQuery} results={userResults} query={usersQuery} token={token} />}
        {view === 'google' && <Google onSearch={handleSearchGoogleResultsAndQuery} result={googleResults} query={googleQuery} />}
        {view === 'hola-news' && <HolaNews onNews={handleRetrieveHolaNewsResults} news={holaNews} />}
        {view === 'twitter' && <Twitter onTweets={handleRetrieveTwitterResults} tweets={tweets} token={token} onFollowing={handleFollowing} following={following} />}
    </section>
}
