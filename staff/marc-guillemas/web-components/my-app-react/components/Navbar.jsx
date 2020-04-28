function Navbar({onChangeView}) {
    return <section>
    <h1>{`Welcome ${name}`}</h1>
    <button onClick={event => {
        event.preventDefault()

        onChangeView('landing')
    }}>Log out</button> 
    
    <ul>
    <li><a href="" onClick={event => {
            event.preventDefault()

            onChangeView('users')
        }}>Users</a> 
    </li>
    
    <li><a href="" onClick={event => {
            event.preventDefault()

            onChangeView('google')
        }}>Google</a> 
    </li>
    
    <li><a href="" onClick={event => {
            event.preventDefault()

            onChangeView('wired')
        }}>Wired</a> 
    </li>
    </ul>
    
    
    
    </section>
    
}