const { useState } = React

function App() {
    const [view, setView] = useState('home')
    const [token, setToken] = useState(undefined)
    const [forecastSelected, setForecastSelected] = useState('')
    

    const handleGoToRegister= () => setHashView('register')

    const handleGoToLogin= () => setView('home')

    const handleRegister= () => setView('login')

    const handleLogin= (token) => {
        setToken(token)
        sessionStorage.token = token
        setHashView('home')
    }

    const handleGoToHome= () => setHashView('home')
    
    const setHashView = view => {
        location.hash = view
        setView(view)
    }

    const handleLogout = () => {
        console.log('hola')
        setToken(undefined)
        delete sessionStorage.token
        setHashView('login')
    }

    const handleGoToSearch = () => {
        setHashView('search')
    }

    const onGoToSurfForecast = (surfForecastSelected) => {
        setHashView('surfForecast')
        setForecastSelected(surfForecastSelected)
    }

    const handleGoToFavs= () => {
        setHashView('favs')
    }

        return <>
            {<Header view={view} token={token} forecastSelected={forecastSelected} OnLogout={handleLogout}/>}
            {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin}/>}
            {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} onGoToHome={handleGoToHome}/>}
            {view === 'home' && <Home />}
            {view === 'search' && <Search token={token}  movingSurfForecast={onGoToSurfForecast}/>}
            {view === 'surfForecast' && <SurfForecast token={token} forecastSelected={forecastSelected} />}
            {view === 'favs' && <FavSpots token={token} />}
            {<Footer GoToHome={handleGoToHome} GoToSearch={handleGoToSearch} GoToFavs={handleGoToFavs}/>}
        </>
}