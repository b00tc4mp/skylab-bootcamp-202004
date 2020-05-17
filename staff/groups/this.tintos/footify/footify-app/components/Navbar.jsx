const { useState } = React

function Navbar({ onGoToPlayerResults, onGoToSportNews, onGoToFwitter, onGoToDream, onGoToUpdateUser, onGoToLogOut }) {

    const [menu, setMenu] = useState()
    const [view,setView] = useState('home')

    const handleSubmitSearch = (event) => {
        event.preventDefault()

        const queryPlayer = event.target.searchPlayer.value
        
        onGoToPlayerResults(queryPlayer)
    }
    const handleSubmitSport = (event) => {
        event.preventDefault()
        setView('news')
        onGoToSportNews()

    }

    const handleSubmitFwitter = (event) => {
        event.preventDefault()
        setView('home')
        onGoToFwitter()
    }

    const handleSubmitToggle = (event) => {
        event.preventDefault()
        setView()
        if(menu) setMenu()
        else setMenu('menu')
      
    }

    const handleSubmitUpdateUser = (event) => {
        event.preventDefault()
        
        onGoToUpdateUser()
    }

    const handleSubmitDream = (event) => {
        event.preventDefault()
        setView('dream')
        onGoToDream()
    }

    const handleSubmitLogOut = (event) => {
        event.preventDefault()

        onGoToLogOut()
    }
    const handleHoverHome =()=>{
        setView('home')
    }
    const handleHoverDream =()=>{
        setView('dream')
    }
    const handleHoverNews =()=>{
        setView('news')
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
                        {menu ? <div className="navbar__user-menu">
                                    <div className="navbar__user-menu-container">
                                        <div onClick={handleSubmitLogOut}>Logout</div>
                                        <hr/>
                                        <div onClick={handleSubmitUpdateUser}>Account</div>
                                    </div>
                                </div>  : ''}
                    </a>
                </nav>
                <nav className="navbar__links">
                    <a href=""  onClick={handleSubmitFwitter}>
                        {
                            view ==='home'? <img src="img/home_onclick.svg" alt="logo" className="navbar__links-item" />:<img src="img/home.svg" alt="logo" className="navbar__links-item" />
                        }
                    </a>
                    <a href="" onClick={handleSubmitSport}>
                         {
                            view ==='news'?<img src="img/news_onclick.svg" alt="user" id="navbar__links-news" />:<img src="img/news.svg" alt="user" id="navbar__links-news" />
                        } 
                    </a>
                    <a href="" onClick={handleSubmitDream} >
                        {
                            view ==='dream'?<img src="img/dreamteam_onclick.svg" alt="user" className="navbar__links-item" />:<img src="img/dreamteam.svg" alt="user" className="navbar__links-item" />
                        } 
                    </a>

                    <form action="" onSubmit={handleSubmitSearch}>
                        <input type="text" id="navbar__links-search" name='searchPlayer' />
                    </form>
                </nav>
            </div>
        </section>
    </>
}