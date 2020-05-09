function NavBar(){

    return <nav className = "navigation">
        <div className = "navigation__basic">
            <a href="">Landing</a>
            <form onSubmit = {() => {event.preventDefault(); props.onBasicSearch(event)}}>
                <input type="text" name="query" placeholder = "Search for Magic cards"/>
            </form>
            <a href="">Menu</a>
        </div>

        <div className = "navigation__extended">
            <a href="" onClick = {() => {event.preventDefault();props.setView('adv')}}>Advanced Search</a>
            <a href="" onClick = {() => {event.preventDefault();props.setView('account')}}>Your Account</a>
            <a href="" onClick = {() => {event.preventDefault();props.setView('registe')}}>Register</a> 
            <a href="" onClick = {() => {event.preventDefault();props.setView('login')}}>Login</a>
            <a href="" onClick = {event.preventDefault}>Your Cards</a>
            <a href="" onClick = {event.preventDefault}>Your Decks</a>

        </div>
    </nav>
}