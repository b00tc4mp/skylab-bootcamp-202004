function Landing({setHashView, onLogOut, token, onBasicSearch, onUserSearch, onFollowing, goToUser}){
    const [error, setError] = useState(undefined)
    const [name, setName] = useState(undefined)

    const handleLogin = event => {
        event.preventDefault()
    
        setHashView('login')
    }

    const handleRegister = event => {
        event.preventDefault()

        setHashView('register')
    }

    const handleLogOut = event => {
        event.preventDefault()

        setName(undefined)
        onLogOut()
    }

    const handleAdvSearch = event =>{
        event.preventDefault()
        setHashView('adv')
    }

    useEffect(() => {
        try {
            retrieveUser(token , (error, user)=>{
                if (error) return setError(error.message)
                setName(user.nickname)
            })
        } catch ({message}) {
            setError(message)
        }
    }, [])

    return <>
        <div className='section-container'>
            <div className='landing-card-container'>
            <section className = 'card-container__section'>
                <h1 className='card-container__name card-container__title'>{name ? name : 'Unknown User'}</h1>
                    <div className="card-container__frame-art-container">
                        <img className='card-container__frame-art' src='https://www.hipstersofthecoast.com/wp-content/uploads/2019/07/gidoath.png' alt='kytheon art'/>
                    </div>
                    <div className="card-container__type card-container__title">
                        <form onSubmit = {() => {event.preventDefault(); onBasicSearch(event)}}>
                            <input className='form-search' type="text" name="query" size="15"/>
                            <button>Card Search</button>
                        </form>
                    </div>
                    {token && <div className="card-container__type card-container__title">
                        <form onSubmit = {() => {event.preventDefault(); onUserSearch(event)}}>
                            <input className='form-search' type="text" name="userquery" size="15"/>
                            <button>User Search</button>
                        </form>
                    </div>}
                    {error && <Feedback error={error} level='warning'/>}
                    <div className="card-container__nav">
                        <a className="card-container__nav-item" href="" onClick = {handleAdvSearch}>Advanced Search</a>
                        {token && <a className="card-container__nav-item" href="" onClick = {()=>{event.preventDefault(); goToUser(undefined)}}>My Cards</a>}
                        {token && <a className="card-container__nav-item" href="" onClick = {() =>{event.preventDefault(); onFollowing()}}>Following</a>}
                        {!token && <a className="card-container__nav-item" href="" onClick = {handleLogin}>Login</a>}
                        {!token && <a className="card-container__nav-item" href="" onClick = {handleRegister}>Register</a>}
                        {token && <a className="card-container__nav-item" href="" onClick = {handleLogOut}>Logout</a>}
                    </div>
            </section>
            </div>
        </div>
    </>
}