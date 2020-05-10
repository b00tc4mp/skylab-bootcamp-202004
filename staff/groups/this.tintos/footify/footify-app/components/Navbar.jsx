function Navbar({ onGoToPlayerResults }) {

    const handleSubmitSearch = (event) => {
        event.preventDefault()

        const queryPlayer = event.target.searchPlayer.value

        onGoToPlayerResults(queryPlayer)
    }





    return <>
        <section className="navbar">
            <div className="navbar__container">
                <nav className="navbar__user">
                    <a href="" className="navbar__user-logo">
                        <img src="img/logo.svg" alt="logo" />
                    </a>
                    <a href="" className="navbar__user-img">
                        <img src="img/user.svg" alt="user" />
                    </a>
                </nav>
                <nav className="navbar__links">
                    <a href="">
                        <img src="img/home.svg" alt="logo" className="navbar__links-item" />
                    </a>
                    <a href="">
                        <img src="img/news.svg" alt="user" id="navbar__links-news" />
                    </a>
                    <a href="">
                        <img src="img/dreamteam.svg" alt="user" className="navbar__links-item" />
                    </a>

                    <form action="" onSubmit={handleSubmitSearch}>
                        <input type="text" id="navbar__links-search" name='searchPlayer' />
                        <button>🔍</button>
                    </form>
                </nav>
            </div>
        </section>
    </>
}