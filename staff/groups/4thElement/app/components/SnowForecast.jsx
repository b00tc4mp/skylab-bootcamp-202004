const { useState, useEffect } = React

function SnowForecast({token, forecastSelected, sportState}) {

    const [forecast, setForecast] = useState()
    const [following, setFollowing] = useState()

    const handleFavButton = (token) => {
        addToFavs(token, forecastSelected, sportState, (error) => { //handel favs for snow instead of surf
            if(error) throw new TypeError('error')
        })
        document.getElementById("deleteMe").style.display="none"; 
	    
    } //to do : handel error if not login


    useEffect(() => { // add try catch
        snowForecastLogic({forecastSelected}, function (error, info) {
            setForecast(info)
        })
        // hideButton(token, forecastSelected, (error, following)=>{
        //     if(error){ throw new TypeError('error')
        // } else {
        //     setFollowing(following)
        // }
        // })
    },[]) //upload each half an hour

    return <section className="forecast">

        {!following && !token && <div className='forecast__favButton' id='deleteMe' onClick={()=>handleFavButton(token)}><i className="fas fa-star fa-2x"></i></div>}
        {forecast && <div className="forecastInfoSnow__day">
                {<h2>{forecast.data.weather[0].date}</h2>}
                {<h4>sunrise:{forecast.data.weather[0].astronomy[0].sunrise}, sunset:{forecast.data.weather[0].astronomy[0].sunset}</h4>}
                <ul className='forecast__ul'>
                    {forecast.data.weather[0].hourly.map((element)=>{
                        return <li className='forecast__date'>
                            <div className="forecastInfoSnow__time">Hour: {element.time}</div>
                            <div className="forecastInfoSnow__temp">Temp.Top ºC {element.top[0].tempC}, Temp.Mid ºC {element.mid[0].tempC}, Temp.Bottom ºC {element.bottom[0].tempC}</div>
                            <div className="forecastInfoSnow__windDir">Wind degree.Top {element.top[0].winddir16Point}, Wind degree.Mid {element.mid[0].winddir16Point}, Wind degree.Bottom {element.bottom[0].winddir16Point}</div>
                            <div className="forecastInfoSnow__windSpeed"></div>
                        </li>
                    })}
                </ul>
            </div>
        }
        
        
    </section>
}