const {useState, useEffect} = React

function NavBar(props){

    const [menu, setMenu] = useState(false)

    const handleLogin = event => {
        event.preventDefault()
    
        props.setHashView('login')
    }

    const handleRegister = event => {
        event.preventDefault()

        props.setHashView('register')
    }

    const handleAdvSearch = event =>{
        event.preventDefault()
        props.setHashView('adv')
    }

    const handleLanding = event =>{
        event.preventDefault()
        props.onLanding()
    }

    return <nav className = "navigation">
        <div className = "navigation__basic">
            <a href="" onClick = {handleLanding}>Main</a>
            <form className = "navigation--searchbar" onSubmit = {() => {event.preventDefault(); props.onBasicSearch(event)}}>
                <input type="text" name="query" placeholder = "Search cards by name"/>
            </form>
            <a href="" onClick = {() => {event.preventDefault(); setMenu(menu?false:true)}}>Menu</a>
        </div>

        {menu && <div className = "navigation__extended">
            {!props.token && <>
                <a href="" onClick = {handleRegister}>Register</a> 
                <a href="" onClick = {handleLogin}>Login</a>
            </>}

            {props.token && <>
                <form className = "navigation--searchbar" onSubmit = {() => {event.preventDefault(); props.onUserSearch(event)}}>
                    <input type="text" name="userquery" placeholder = "Search users by username"/>
                </form>
                <a href="" onClick = {()=>{event.preventDefault(); props.goToUser(undefined)}}>My Cards</a>
                <a href="" onClick = {() =>{event.preventDefault(); props.onFollowing()}}>Following</a>
            </>}
            <a href="" onClick = {handleAdvSearch}>Advanced Search</a>
        </div>}
    </nav>
}