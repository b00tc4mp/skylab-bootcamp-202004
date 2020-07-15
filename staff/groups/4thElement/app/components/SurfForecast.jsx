const { useState, useEffect } = React

function SurfForecast({token, forecastSelected, sportState}) {

    
    const [forecast, setForecast] = useState()
    const [following, setFollowing] = useState()
    const [forecastSelector, setForecastSelector] = useState('Forecast')
    const [error, setError] = useState()
    const [spiner, setSpiner] = useState()

    const handleFavButton = (token) => {
        addToFavs(token, forecastSelected, sportState, (error) => {
            if(error) throw new TypeError('error')
        })
        document.getElementById("deleteMe").style.display="none"; 
	    
    } //to do : handel error if not login

    useEffect(() => {
        setError(undefined)
        setSpiner('on')
        try{
            forecastLogic({forecastSelected}, sportState ,function (error, info) {
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
        
        favState(token, forecastSelected, (error, following)=>{
            if(error){ throw new TypeError('error')
        } else {
            setFollowing(following)
        }
        })
    }, [forecastSelected]); //upload each half an hour

    return <section className="forecast">
        <div className="forecast__selector">
            <div className={"forecast__selectorForecast" + (forecastSelector === 'Forecast' ? "--active" : "")} onClick={()=>setForecastSelector('Forecast')}>Forecast</div>
            <div className={"forecast__selectorReviews" + (forecastSelector === 'Reviews' ? "--active" : "")} onClick={()=>setForecastSelector('Reviews')}>Reviews</div>
        </div>
        {forecastSelector === 'Forecast' && <div>
            {!following && token && <div className='forecast__favButton' id='deleteMe' onClick={()=>handleFavButton(token)}><i className="fas fa-star fa-2x"></i></div>}
            {spiner && sportState === 'surf' && <img className="forecast__spiner" src='./images/spinerSurf.gif'/>}
            {spiner && sportState !== 'surf' && <img className="forecast__spiner" src='./images/spinerSnow.gif'/>}
            {forecast && <ul className='forecast__ul'>  
                    {forecast.data.weather.map((element) => {
                        return <li className='forecast__date'><span>{`${element.date}`}</span>
                            <div className='forecast__titles'>
                            <h2 className='forecast__titles--element'>Time</h2>
                            <h2 className='forecast__titles--element'>Air</h2>
                            <h2 className='forecast__titles--element'>Wind</h2>
                            <h2 className='forecast__titles--element'>Swell</h2>
                            </div>
                            {element.hourly.map((forTime) => {
                                return <li className='forecast__info'>
                                    <p>{`${forTime.time}h`}</p>
                                    <p>{`${forTime.tempC}ºC`}</p>
                                    <p>{`${forTime.windspeedKmph}Km/h`}</p> 
                                    <p>{`${forTime.swellHeight_m}m`}</p> 
                            </li>
                            })}

                        </li>
                    })}
                </ul>}
                {error && <Feedback message={error} level={'error'}/>}    
        </div>}
        {forecastSelector === 'Reviews' && <Reviews forecastSelected={forecastSelected} token={token} sportState={sportState}/>}
    </section>
}
