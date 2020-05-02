function Navbar({onChangeView, onLogout}) {
    return <section>
    <button onClick={event => {
        event.preventDefault()

        onLogout()
    }}>Log out</button> 
    
    <ul>
    <li><a href="" onClick={event => {
            event.preventDefault()

            onChangeView('users')
        }}>Users</a> 
    </li>
    <li><a href="" onClick={event => {
            event.preventDefault()

            onChangeView('feed')
        }}>Feed</a> 
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