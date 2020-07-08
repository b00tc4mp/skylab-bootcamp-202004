import React, { useState, useEffect } from 'react'
import './SetMood.sass'
import thermometer from '../images/thermometer_1.png'
import retrieveUser from 'termometro-client-logic/retrieve-user'
const { setMood } = require('termometro-client-logic')
const moment = require('moment')



function SetMood({ token, history }) {
    const [tooManyMoods, setTooManyMoods] = useState(false)

    useEffect(() => {
        try {
            retrieveUser(token)
                .then(({ mood }) => {
                    let dateNow = moment(new Date).format('L')

                    const moodsToday = mood.filter(element => (moment(element.date).format('L')) === dateNow)

                    if (moodsToday.length >= 2) setTooManyMoods(true)
                })
        } catch (error) {
            if (error) throw error
        }
    }, [])

    const [value, setValue] = useState('7')

    const handleSetMood = (event) => {

        event.preventDefault()

        let moodScore = Number(value)

        try {
            setMood(token, moodScore)
                .then(history.push('/main-stats'))
        } catch (error) {
            if (error) throw error
        }
    }

    const handleOnChange = (event) => {

        setValue(event.target.value)

    }

    return (
        <section className="sliderContainer">
        
            {!tooManyMoods && <div className='sliderContainer__titleContainer'>
                <h1 className='sliderContainer__title'>Qué tal está tu autoestima hoy?</h1>
            </div>}
            {!tooManyMoods && <div className='sliderContainer__thermoContainer'>
                <img alt='the thermometer' src={thermometer} className='sliderContainer__thermoContainer--thermoImg'></img>
                <div className={`sliderContainer__thermoContainer--progress ${value === '1' && 'height1'} ${value === '2' && 'height2'} ${value === '3' && 'height3'} ${value === '4' && 'height4'} ${value === '5' && 'height5'} ${value === '6' && 'height6'} ${value === '7' && 'height7'} ${value === '8' && 'height8'} ${value === '9' && 'height9'} ${value === '10' && 'height10'} `}></div>
                <div className='sliderContainer__value'>{value}</div>
            </div>}
                {!tooManyMoods && <input type="range" min="0" max="10" className="sliderContainer__thermoContainer--slider" value={value} onChange={handleOnChange}></input>}
            {!tooManyMoods && <button onClick={handleSetMood} className='sliderContainer__button'>Enviar</button>}


            {tooManyMoods && <div className='tooManyMoodsContainer'>
                <h1 className='tooManyMoodsContainer__tooManyMoodsFeedback'>Espera a mañana para volver a puntuar como te sientes!</h1>
            </div>}
        
        </section>
    )
}

export default SetMood
{/* <progress min="0" max="10" className="sliderContainer__thermoContainer--progress" value={value} onChange={handleOnChange}></progress> */ }