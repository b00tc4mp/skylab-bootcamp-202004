const { useState, useEffect } = React

function Home ({onLogout}) {

    const [view, setView] = useState("home");
    const [browser, setBrowser] = useState();
    const [favorites, setFavorites] = useState();
    const [profile, setProfile] = useState();
    const [groupies, setGroupies] = useState();

    const handleHome = event => {
        event.preventDefault()

        setView("home")
    }

    const handleBrowser = event => {
        event.preventDefault()

        setView("browser")
    }

    const handleFavorites = event => {
        event.preventDefault()

        setView("favorites")
    }

    const handleProfile = event => {
        event.preventDefault()

       setView("profile")
    }

    const handleGroupies = event => {
        event.preventDefault()

       setView("groupies")
    }

    return <section className="home">
        <section className="home-header">
            <img className="home-header__photo" src="" />
            <p className="home-header__text">El lugar donde nace la música</p>
        </section>
        <section className="navbar">
            <h2 className="navbar__title">Music Roll</h2>
            <ul className="navbar-list">
                <li className={`navbar-list__item ${view === "home" ? "navbar-list__item--active" : ""}`} onClick={handleHome}>Home</li>
                <li className={`navbar-list__item ${view === "browser" ? "navbar-list__item--active" : ""}`} onClick={handleBrowser}>Browser</li>
                <li className={`navbar-list__item ${view === "favorites" ? "navbar-list__item--active" : ""}`} onClick={handleFavorites}>Favorites</li>
                <li className={`navbar-list__item ${view === "profile" ? "navbar-list__item--active" : ""}`} onClick={handleProfile}>Profile</li>
                <li className="navbar-list__item" onClick={onLogout}>Logout</li>
            </ul>
        </section>
        <section className="home-groupies">
            <img className="home-groupies__photo" src="" />
            <p className="home-groupies__text" onClick={handleGroupies}>My groupies</p>
        </section>
        <section className="home-music">
            <img className="home-music__photo" src="" />
            <p className="home-music__text">Cápsula de 20 minutos de música</p>
        </section>
    </section>
}