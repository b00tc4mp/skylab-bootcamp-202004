const { useState, useEffect } = React

function App() {
    const [view, setView] = useState('home')
    const [token, setToken] = useState(undefined)
    const [forecastSelected, setForecastSelected] = useState('')
    const [sportState, setSportState] = useState('surf')
    const [footerState, setFooterState] = useState('home')
    
    useEffect (() => {
        if (sessionStorage.token){
            try{
                authenticateToken(sessionStorage.token, (error, status) => {
                    if(error) throw error

                    if(status){
                        setToken(sessionStorage.token)
                    }
                })
            }catch(error){
                if (error) throw error
            }
        }
    }, [])

    const handleGoToRegister= () => setHashView('register')

    const handleGoToLogin= () => setView('home')

    const handleRegister= () => setView('login')

    const handleLogin= (token) => {
        setToken(token)
        sessionStorage.token = token
        setHashView('home')
    }

    const handleGoToHome= () => {
        setHashView('home')
        setFooterState('home')
    }
    
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
        setFooterState('search')
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
        setFooterState('favs')
    }

    const handleSportSate = () => {
        sportState === 'surf' ? setSportState('snow') : setSportState('surf')
    }

    const pointerMapSelected= (coordinates) =>{
        setForecastSelected(coordinates)
        sportState==='surf'? setHashView('surfForecast') : setHashView('snowForecast')
    }

        return <>
            {<Header view={view} token={token} forecastSelected={forecastSelected} OnLogout={handleLogout} sportState={sportState}/>}
            {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin}/>}
            {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} onGoToHome={handleGoToHome}/>}
            {view === 'home' && <Home sportState={handleSportSate} ReturnsportState={sportState} pointerMapSelected={pointerMapSelected}/>}
            {view === 'search' && <Search token={token}  movingSurfForecast={onGoToSurfForecast} sportState={sportState}/>}
            {view === 'surfForecast' && <SurfForecast token={token} forecastSelected={forecastSelected} sportState={sportState}/>}
            {view === 'snowForecast' && <SnowForecast token={token} forecastSelected={forecastSelected} sportState={sportState}/>}
            {view === 'favs' && <FavSpots token={token} movingSurfForecast={onGoToSurfForecast} sportState={sportState}/>}
            {<Footer GoToHome={handleGoToHome} GoToSearch={handleGoToSearch} GoToFavs={handleGoToFavs} footerState={footerState} sportState={sportState}/>}
        </>
}