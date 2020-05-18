function Home({token, onLogout, onLogin}) {
    const [view, setView] = useState('spinner')
    const [name, setName] = useState(undefined)
    const [usersResults, setUsersResults] = useState(undefined)
    const [usersQuery, setUsersQuery] = useState(undefined)
    const [usersError, setUsersError] = useState(undefined)
    const [googleResults, setGoogleResults] = useState(undefined)
    const [googleError, setGoogleError] = useState(undefined)
    const [googleQuery, setGoogleQuery] = useState(undefined)

    const setHashView = view => {
        location.hash = view

        setView(view)
    }
    
    function handleUsers(event) {
        event.preventDefault()
                
        setHashView('users')
        if (usersQuery) location.hash += `?q=${usersQuery}`
    }

    function handleGoogle(event) {
        event.preventDefault()
                
        setHashView('google')
        if (googleQuery) location.hash += `?q=${googleQuery}`
    }

    function handleNews(event) {
        event.preventDefault()
    
        setHashView('news')
    }

    function handleTwitter(event) {
        event.preventDefault()
    
        setHashView('twitter')
    }

    function handleSearchUsers(query) {
        if (!location.hash.includes('?q=')) {
            location.hash += `?q=${query}`
        }
        searchUsers(token, query, (error, users) => {
            if (error) {
                if (error.message === 'invalid token') {
                    sessionStorage.token = ''
                    onLogin()
                    return
                }
                setUsersError(error.message)
                
            } else {
                setUsersResults(users)
            }
        })
        setUsersQuery(query)
    }

    function handleGoogleSearch(query) {
        if (!location.hash.includes('?q=')) {
            location.hash += `?q=${query}`
        }
        google(query, (error, results) => {
            if (error) setGoogleError(error.message)
            else setGoogleResults(results)
        })
        setGoogleQuery(query)
    }

    function handleToggle(id) {
        toggleFollowUser(token, id, error => {
            if (error) {
                if (error.message === 'invalid token') {
                    sessionStorage.token = ''
                    onLogin()
                    return
                }
                setUsersError(error.message)
                
            } else {
                searchUsers(token, usersQuery, (error, users) => {
                    if (error) setUsersError(error.message)
                    else setUsersResults(users)
                })
            }
        })
    }

    useEffect(() => {
        try {
            retrieveUser(token, (error, user) => {
                if (error) throw error

                let hash = location.hash.substring(1)

                location.hash = hash ? hash : 'users' 

                if (hash.includes('?q=')) {
                    setView(hash.split('?q=')[0])
                    if (hash.includes('users')) handleSearchUsers(hash.split('?q=')[1])
                    else handleGoogleSearch(hash.split('?q=')[1])
                } else {
                    setView(hash)
                }

                setName(user.name)
            })
        } catch (error) {
            if (error) throw error
        }
    }, [])

    return <section className="home">
            <h1>Welcome, {name}!</h1>
            <a className={`home__link ${view === 'users' ? 'home__link--active' : '' }`} href="" onClick={handleUsers}> Users </a>
            <a className={`home__link ${view === 'google' ? 'home__link--active' : '' }`} href="" onClick={handleGoogle}> Google </a>
            <a className={`home__link ${view === 'news' ? 'home__link--active' : '' }`} href="" onClick={handleNews}> Hola News </a>
            <a className={`home__link ${view === 'twitter' ? 'home__link--active' : '' }`} href="" onClick={handleTwitter}> Twitter </a>
            <button onClick={() => {
                onLogout()
            }}>Logout</button>

            {view == 'spinner' && <Spinner />}
            {view === 'users' && <Users usersResults={usersResults} handleSearchUsers={handleSearchUsers} query={usersQuery} handleToggle={handleToggle} errorUsers={usersError}/>}
            {view === 'google' && <Google googleResults={googleResults} googleError={googleError} handleGoogleSearch={handleGoogleSearch} query={googleQuery}/>}
            {view === 'news' && <HolaNews />}
            {view === 'twitter' && <Tweet token={token} onLogin={onLogin}/>} 
        </section>
}