function Search({ token, OnLogout }) {

    const handleLogout = () => {
        OnLogout()
    }

    const handleSubmitSpot = (query) =>{

        searchSpot(query)
    }

    return <section className="Search">
        <header className="Header">
            <section className="Header__container">
                <h2 className="Header__container--name">Search</h2>

                <a onClick={handleLogout} className="Header__container--login" href="">{token ? 'Logout' : 'Login'}</a>
            </section>
        </header>

        <SearchSpotCompo onSubmitSpot={handleSubmitSpot} />


    </section>
}