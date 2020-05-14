const { useState, useEffect } = React

function SnowForecast({token, forecastSelected, sportState}) {

    const [forecast, setForecast] = useState()
    const [following, setFollowing] = useState()
    const [forecastSelector, setForecastSelector] = useState('Forecast')
    const [error, setError] = useState()
    const [spiner, setSpiner] = useState()
    

    const handleFavButton = (token) => {
        addToFavs(token, forecastSelected, sportState, (error) => { //handel favs for snow instead of surf
            if(error) throw new TypeError('error')
        })
        document.getElementById("deleteMe").style.display="none"; 
	    
    } 


    useEffect(() => { // add try catch
        setError(undefined)
        setSpiner('on')
        try{
            forecastLogic({forecastSelected}, sportState, function (error, info) {
                setSpiner(undefined)
                if(error){
                    setError(error)
                }else{
                    setForecast(info)
                }
            })
        }catch({message}){
            setSpiner(undefined)
            setError(message)
        }
        hideButton(token, forecastSelected, (error, following)=>{
            if(error){ throw new TypeError('error')
        } else {
            setFollowing(following)
        }
        })
    },[]) 

    return <section className="forecastInfoSnow">
        <div className="forecastInfoSnow__selector">
            <div className={"forecastInfoSnow__selectorForecast" + (forecastSelector === 'Forecast' ? "--active" : "")} onClick={()=>setForecastSelector('Forecast')}>Forecast</div>
            <div className={"forecastInfoSnow__selectorReviews" + (forecastSelector === 'Reviews' ? "--active" : "")} onClick={()=>setForecastSelector('Reviews')}>Reviews</div>
        </div>
        {forecastSelector === 'Forecast' && <div>
            {!following && token && <div className='forecast__favButton' id='deleteMe' onClick={()=>handleFavButton(token)}><i className="fas fa-star fa-2x"></i></div>}
            {spiner && sportState === 'surf' && <img className="forecastInfoSnow__spiner" src='./images/spinerSurf.gif'/>}
            {spiner && sportState !== 'surf' && <img className="forecastInfoSnow__spiner" src='./images/spinerSnow.gif'/>}
            {forecast && <div className="forecastInfoSnow__day">
                    {<h2>{forecast.data.weather[0].date}</h2>}
                    {<h4>sunrise: {forecast.data.weather[0].astronomy[0].sunrise}, sunset: {forecast.data.weather[0].astronomy[0].sunset}</h4>}
                    <ul className="forecastInfoSnow__hour">
                        {forecast.data.weather[0].hourly.map((element)=>{
                            return <li className="forecastInfoSnow__list">
                                <div className="forecastInfoSnow__time">Hour: {element.time}</div>
                                <div className="forecastInfoSnow__overAllInfo">Snow fall (cm): {element.snowfall_cm} Freez level (m): {element.freezeLevel} Cloud cover: {element.cloudcover}</div>
                                <div className="forecastInfoSnow__temp">Temp: Top ºC {element.top[0].tempC}, Mid ºC {element.mid[0].tempC}, Bottom ºC {element.bottom[0].tempC}</div>
                                <div className="forecastInfoSnow__windDir">Wind degree: Top {element.top[0].winddir16Point}, Mid {element.mid[0].winddir16Point}, Bottom {element.bottom[0].winddir16Point}</div>
                            <div className="forecastInfoSnow__windSpeed">Wind speed kh: Top {element.top[0].windspeedKmph}, Mid {element.top[0].windspeedKmph}, Bottom {element.top[0].windspeedKmph}</div>
                            </li>
                        })}
                    </ul>
                    {error && <Feedback message={error} level={'error'}/>} 
                </div>
            }
        </div>}
        {forecastSelector === 'Reviews' && <Foro forecastSelected={forecastSelected} token={token} sportState={sportState}/>}
    </section>
}