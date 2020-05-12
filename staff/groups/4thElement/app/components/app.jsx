const { useState } = React

import { TransitionGroup, CSSTransition} from "react-transition-group"

function App() {
    const [view, setView] = useState('home')
    const [token, setToken] = useState(undefined)
    const [forecastSelected, setForecastSelected] = useState('')
    const [sportState, setSportState] = useState('surf')
    

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
        setToken(undefined)
        delete sessionStorage.token
        setHashView('login')
    }

    const handleGoToSearch = () => {
        setHashView('search')
    }

    const onGoToSurfForecast = (ForecastSelected) => {
        if(sportState==='surf'){
            setHashView('surfForecast')
            setForecastSelected(ForecastSelected)
        }else {
            setHashView('snowForecast')
            setForecastSelected(ForecastSelected)
        }
    }

    const handleGoToFavs= () => {
        setHashView('favs')
    }

    const handelSportSate = () => {
        sportState === 'surf' ? setSportState('snow') : setSportState('surf')
    }

        return <>
            {<Header view={view} token={token} forecastSelected={forecastSelected} OnLogout={handleLogout} sportState={sportState}/>}
            {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin}/>}
            {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} onGoToHome={handleGoToHome}/>}
            {view === 'home' && <Home sportState={handelSportSate} ReturnsportState={sportState}/>}
            {view === 'search' && <Search token={token}  movingSurfForecast={onGoToSurfForecast} sportState={sportState}/>}
            {view === 'surfForecast' && <SurfForecast token={token} forecastSelected={forecastSelected} />}
            {view === 'snowForecast' && <SnowForecast token={token} forecastSelected={forecastSelected} />}
            {view === 'favs' && <FavSpots token={token} movingSurfForecast={onGoToSurfForecast}/>}
            {<Footer GoToHome={handleGoToHome} GoToSearch={handleGoToSearch} GoToFavs={handleGoToFavs}/>}
        </>
}