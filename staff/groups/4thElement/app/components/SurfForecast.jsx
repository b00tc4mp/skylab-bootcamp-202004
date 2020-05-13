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

    return <section className="forecast">


        {!following && <div className='forecast__favButton' id='deleteMe' onClick={()=>handleFavButton(token)}><i className="fas fa-star fa-2x"></i></div>}
        {
            forecast ? (<>
                
                <ul className='forecast__ul'>
                    
                    {forecast.data.weather.map((element) => {
                        return <li className='forecast__date'><span>{`${element.date}`}</span>
                            <div className='forecast__titles'>
                            <h2 className='forecast__titles--element'>Time</h2>
                            <h2 className='forecast__titles--element'>Air</h2>
                            <h2 className='forecast__titles--element'>Wind</h2>
                            <h2 >Swell</h2>
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
                </ul>
            </>)
                : (
                    <Feedback message="sorry, no results :(" /> //handel error and maybe add spiner when charging
                )
            }    
    </section>
}
