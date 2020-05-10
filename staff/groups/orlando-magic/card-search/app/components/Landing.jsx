function Landing({onLogin, onRegister, onLogOut, token}){
    const [error, setError] = useState(undefined)
    const [name, setName] = useState(undefined)
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

    useEffect(() => {
        if (!name) {
            try {
                retrieveUser(token , (error, user)=>{
                    if (error) return setError(error.message)
                    setName(user.nickname)
                })
            } catch ({message}) {
                setError(message)
            }
        }
    })

    return <>
        <div className='section-container'>
            <div className='landing-card-container'>
            <section className = 'menu-title'>
                <h1 className='name title'>{name ? name : 'Unknown User'}</h1>
                    <div className="frame-art-container">
                        <img className='frame-art' src='https://www.hipstersofthecoast.com/wp-content/uploads/2019/07/gidoath.png' alt='kytheon art'/>
                    </div>
                    <div className="type title">
                        <form onSubmit = {() => {event.preventDefault(); props.onBasicSearch(event)}}>
                            <input className='form-search' type="text" name="query" size="15"/>
                            <button>Card Search</button>
                        </form>
                    </div>
                    {error && <Feedback error={error} level='warning'/>}
                    <div className="nav">
                        <a className="nav__item" href="" onClick = {() => props.setView('adv')}>Advanced Search</a>
                        <a className="nav__item" href="" onClick = {event.preventDefault()}>About Us</a>
                        {token && <a className="nav__item" href="" onClick = {() => props.setView('account')}>Your Account</a>}
                        {!token && <a className="nav__item" href="" onClick = {handleLogin}>Login</a>}
                        {!token && <a className="nav__item" href="" onClick = {handleRegister}>Register</a>}
                        {token && <a className="nav__item" href="" onClick = {handleLogOut}>Logout</a>}
                    </div>

            </section>
            </div>
        </div>
    </>
}