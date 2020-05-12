const {useState} = React

function Navbar({onChangeView }){
    
    const [view, setView] = useState('home')
    
    /*  const handleOnHome = (event) =>{
        event.preventDefault()
        
        setView('home')
    } */
    /*  const handleOnBrowser =(event) =>{
        event.preventDefault()
        
        onBrowser()  */
        
        
        /*  } */
        
        /*  const handleOnPlaylist =(event) =>{
            event.preventDefault()
            
            setView('playlist')
        }
        
        const handleOnFavorites =(event) =>{
            event.preventDefault()
            
            setView('favorites')
        }
        
        const handleOnFriends =(event) =>{
            event.preventDefault()
            
            setView('friends')>XX
        }
        
        const handleOnLogOut =(event) =>{
            event.preventDefault()
            
            setView('login')
        }
        */
        
        
        
        
        
        
    return <nav className="navbar">
        <ul className="navbar__list">
            <li className="navbar__item">
                <div className="navbar__user"></div><a href="" onClick = {event => {
                    event.preventDefault()

                    onChangeView('user')
                }}>Logged User</a> 
            </li>
            <li className="navbar__item">
                <a href="">Home</a>
            </li>
            <li className="navbar__item">
                <a href="" onClick = {event => {
                    event.preventDefault()

                    onChangeView('browser')
                }}>Browser</a>
            </li>
            <li className="navbar__item">
                <a href="" onClick = {event => {
                    event.preventDefault()

                    onChangeView('playlists')
                }}>Playlists</a>
            </li>
            <li className="navbar__item">
                <a href="" onClick = {event => {
                    event.preventDefault()

                    onChangeView('favorites')
                }}>Favorites</a>
            </li>
            <li className="navbar__item">
                <a href="" onClick = {event => {
                    event.preventDefault()

                    onChangeView('friends')
                }}>Friends</a>
            </li>
            <li className="navbar__item">
                <a href="" onClick = {event => {
                    event.preventDefault()

                    onChangeView('login')
                }}>LogOut</a>
            </li>
        </ul>
    </nav>
        
     
   
}