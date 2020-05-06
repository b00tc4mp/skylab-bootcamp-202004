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
    
                    setName (user.name)
                })
            } catch (error) {
                throw error
            }
        }, [])

    const handleUsers = event => {
        event.preventDefault()

        setView("users")
    }

    const handleGoogle = event => {
        event.preventDefault()

        setView("google")
    }

    const handleHolaNews = event => {
        event.preventDefault()

        setView("hola-news")
    }

    const handleTwitter = event => {
        event.preventDefault()

       setView("twitter")
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
