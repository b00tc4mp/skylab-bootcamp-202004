function Landing({onLogin, onRegister, onLogOut, token, onAdvSearch, onBasicSearch}){
    const [error, setError] = useState(undefined)
    const [name, setName] = useState(undefined)
//function Landing(props){

    const handleLogin = event => {
        event.preventDefault()
    
        onLogin()
    }

    const handleRegister = event => {
        event.preventDefault()

        onRegister()
    }

    const handleLogOut = event => {
        event.preventDefault()

        setName(undefined)
        onLogOut()
    }

    const handleAdvSearch = event =>{
        event.preventDefault()
        onAdvSearch()
    }

    useEffect(() => {
        if (token) {
            try {
                retrieveUser(token , (error, user)=>{
                    if (error) return setError(error.message)
                    setName(user.nickname)
                })
            } catch ({message}) {
                setError(message)
            }
        }
    }, [token])

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
                    {error && <Feedback error={error} level='warning'/>}
                    <div className="card-container__nav">
                        <a className="card-container__nav-item" href="" onClick = {handleAdvSearch}>Advanced Search</a>
                        <a className="card-container__nav-item" href="" onClick = {event.preventDefault()}>About Us</a>
                        {token && <a className="card-container__nav-item" href="" onClick = {() => props.setView('account')}>Your Account</a>}
                        {!token && <a className="card-container__nav-item" href="" onClick = {handleLogin}>Login</a>}
                        {!token && <a className="card-container__nav-item" href="" onClick = {handleRegister}>Register</a>}
                        {token && <a className="card-container__nav-item" href="" onClick = {handleLogOut}>Logout</a>}
                    </div>
            </section>
            </div>
        </div>
    </>
}