const {useState, useEffect} = React

function NavBar(props){

    const [menu, setMenu] = useState(false)

    const handleLogin = event => {
        event.preventDefault()
    
        props.onLogin()
    }

    const handleRegister = event => {
        event.preventDefault()

        props.onRegister()
    }

    const handleAdvSearch = event =>{
        event.preventDefault()
        props.onAdvSearch()
    }
    return <nav className = "navigation">
        <div className = "navigation__basic">
            <a href="">Landing</a>
            <form className = "navigation--searchbar" onSubmit = {() => {event.preventDefault(); props.onBasicSearch(event)}}>
                <input type="text" name="query" placeholder = "Search cards by name"/>
            </form>
            <a href="" onClick = {() => {event.preventDefault(); setMenu(menu?false:true)}}>Menu</a>
        </div>

        {menu && <div className = "navigation__extended">
            <form className = "navigation--searchbar" onSubmit = {() => {event.preventDefault(); props.onUserSearch(event)}}>
                <input type="text" name="userquery" placeholder = "Search users by username"/>
            </form>
            <a href="" onClick = {handleAdvSearch}>Advanced Search</a>
            <a href="" onClick = {() => {event.preventDefault();props.setView('account')}}>Your Account</a>
            <a href="" onClick = {handleRegister}>Register</a> 
            <a href="" onClick = {handleLogin}>Login</a>
            <a href="" onClick = {event.preventDefault}>Your Cards</a>
            <a href="" onClick = {event.preventDefault}>Your Decks</a>
        </div>}
    </nav>
}