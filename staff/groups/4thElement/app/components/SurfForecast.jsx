const { useState, useEffect } = React

function SurfForecast({token, forecastSelected}) {

    const handleFavButton = (token) => {
        addToFavs(token, forecastSelected, (error) => {
            if(error) throw new TypeError('error')
        })
        document.getElementById("deleteMe").style.display="none"; 
	    
    } //to do : handel error if not login

    const [forecast, setForecast] = useState()
    const [following, setFollowing] = useState()

    useEffect(() => {
        surfForecastLogic({forecastSelected}, function (error, info) {
            setForecast(info)
        })
        hideButton(token, forecastSelected, (error, following)=>{
            if(error){ throw new TypeError('error')
        } else {
            setFollowing(following)
        }
        })
    }, [forecastSelected]); //upload each half an hour

    return <section className="spot-result-list">

        {
            forecast ? (<>
                <div>
                    <h2>Time</h2>
                    <h2>Air</h2>
                    <h2>Wind</h2>
                    <h2>Swell</h2>
                </div>
                <ul className='ul-spot-forecast'>
                    {forecast.data.weather.map((element) => {
                        return <li className='li-spot-forecast-date'>{`${element.date}`}

                            {element.hourly.map((forTime) => {
                                return <li className='li-spot-forecast-info'>{`${forTime.time}h  ${forTime.tempC}ºC ${forTime.windspeedKmph}Km/h  ${forTime.swellHeight_m}m`} </li>
                            })}

                        </li>
                    })}
                </ul>
            </>)
                : (
                    <Feedback message="sorry, no results :(" /> //handel error and maybe add spiner when charging
                )
            }
            {following!==1 && <div className='fav-button' id='deleteMe' onClick={()=>handleFavButton(token)}><i className="fas fa-star star-fore fa-2x"></i></div>}
        
    </section>
}
