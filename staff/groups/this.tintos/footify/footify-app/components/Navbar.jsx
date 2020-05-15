const { useState } = React

function Navbar({ onGoToPlayerResults, onGoToSportNews, onGoToFwitter, onGoToDream, onGoToUpdateUser, onGoToLogOut }) {

    const [menu, setMenu] = useState()

    const handleSubmitSearch = (event) => {
        event.preventDefault()

        const queryPlayer = event.target.searchPlayer.value

        onGoToPlayerResults(queryPlayer)
    }
    const handleSubmitSport = (event) => {
        event.preventDefault()

        onGoToSportNews()

    }

    const handleSubmitFwitter = (event) => {
        event.preventDefault()

        onGoToFwitter()
    }

    const handleSubmitToggle = (event) => {
        event.preventDefault()
        if(menu) setMenu()
        else setMenu('menu')
      
    }

    const handleSubmitUpdateUser = (event) => {
        event.preventDefault()
        
        onGoToUpdateUser()
    }

    const handleSubmitDream = (event) => {
        event.preventDefault()

        onGoToDream()
    }

    const handleSubmitLogOut = (event) => {
        event.preventDefault()

        onGoToLogOut()
    }

    return <>
        <section className="navbar">
            <div className="navbar__container">
                <nav className="navbar__user">
                    <a href="" className="navbar__user-logo" >
                        <img src="img/logo.svg" alt="logo" />
                    </a>
                
                    <a href="" className="navbar__user-img">
                        <img className="navbar__user-image" src="img/user.svg" alt="user" onClick={handleSubmitToggle} />
                        {menu ? <a href="" className="navbar__user-menu">
                                    <div className="navbar__user-menu-container">
                                        <a onClick={handleSubmitLogOut}>Logout</a>
                                        <hr/>
                                        <a onClick={handleSubmitUpdateUser}>Account</a>
                                    </div>
                                </a>  : ''}
                    </a>
                </nav>
                <nav className="navbar__links">
                    <a href="">
                        <img src="img/home.svg" alt="logo" className="navbar__links-item" onClick={handleSubmitFwitter} />
                    </a>
                    <a href="" onClick={handleSubmitSport}>
                        <img src="img/news.svg" alt="user" id="navbar__links-news" />
                    </a>
                    <a href="" onClick={handleSubmitDream}>
                        <img src="img/dreamteam.svg" alt="user" className="navbar__links-item" />
                    </a>

                    <form action="" onSubmit={handleSubmitSearch}>
                        <input type="text" id="navbar__links-search" name='searchPlayer' />

                    </form>
                </nav>
            </div>
        </section>
    </>
}