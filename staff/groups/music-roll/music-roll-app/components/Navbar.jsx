const {useState} = React

function navbar(){

/*     const [view, setView] = useState('home')
   
    const handleOnHome = (event) =>{
        event.preventDefault()

        setView('home')
    }
    const handleOnBrowser =(event) =>{
        event.preventDefault()

        setView('browser')
    }

    const handleOnPlaylist =(event) =>{
        event.preventDefault()

        setView('playlist')
    }

    const handleOnFavorites =(event) =>{
        event.preventDefault()

        setView('favorites')
    }

    const handleOnFriends =(event) =>{
        event.preventDefault()

        setView('friends')
    }

    const handleOnLogOut =(event) =>{
        event.preventDefault()

        setView('login')
    }
 
 */





return <section className="navbar">
                <ul className="navbar__list">
                    <li className="navbar__item"><div className="navbar__user"></div> Logged User</li>
                    <li className="navbar__item"><span onHome={handleOnHome}>Home</span></li>
                    <li className="navbar__item"><span onBrowser={handleOnBrowser}>Browser</span></li>
                    <li className="navbar__item"><span onPlaylist={handleOnPlaylist}>Playlists</span></li>
                    <li className="navbar__item"><span onFavorites={handleOnFavorites}>Favorites</span></li>
                    <li className="navbar__item"><span onFriends={handleOnFriends}>Friends</span></li>
                    <li className="navbar__item"><span onLogout={handleOnLogOut}>LogOut</span></li>
                </ul>

                {/* {view === 'home' && <Home/>}
                {view === 'browser' && <Browser/>}
                {view === 'playlist' && <Playlists/>}
                {view === 'favorites' && <Favorites/>}
                {view === 'friends' && <Friends/>}
                {view === 'logout' && <Logout/>}
 */}
            </section>
}