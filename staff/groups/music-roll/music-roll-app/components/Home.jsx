const { useState, useEffect } = React

function Home ({onLogout}) {
    
        const [view, setView] = useState ("home");
        const [browser, setBrowser] = useState();
        const [favorites, setFavorites] = useState();
        const [contacts, setContacts] = useState();
        const [profile, setProfile] = useState ();
    
    const handleBrowser = event => {
        event.preventDefault()

        setView("browser")
    }

    const handleFavorites = event => {
        event.preventDefault()

        setView("favorites")
    }

    const handleContacts = event => {
        event.preventDefault()

        setView("contacts")
    }

    const handleProfile= event => {
        event.preventDefault()

       setView("profile")
    }

    const handleBrowserResults = (results, query) => {

    }

    const handleFavorites = favorites => {
        setFavorites (favorites)
    }

    const handleContacts = contacts => {
        setContacts (contacts)
    }

    const handleProfile = profile => {
        setProfile (profile)
    }

    return <section className="home">
        <h1>Music Roll</h1>
        <a className={`home__link ${view === 'browser' ? 'home__link--active' : ''}`} href="" onClick={handleBrowser}>Browser </a>
        <a className={`home__link ${view === 'favorites' ? 'home__link--active' : ''}`} href="" onClick={handleFavorites}>Favorites </a>
        <a className={`home__link ${view === 'contacts' ? 'home__link--active' : ''}`} href="" onClick={handleContacts}>Contacts </a>
        <a className={`home__link ${view === 'profile' ? 'home__link--active' : ''}`} href="" onClick={handleProfile}>Profile </a>
        <button onClick={onLogout}> Logout </button>

        {view === 'browser' && <Browser onBrowser={handleBrowser} results={browserResults} query={browserQuery} />}
        {view === 'favorites' && <Favorites onFavorites={handleFavorites} />}
        {view === 'contacts' && <Contacts onContacts={handleContacts} />}
        {view === 'profile' && <Profile onProfile={handleProfile} />}
    </section>
}