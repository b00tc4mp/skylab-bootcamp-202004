import React, { useState } from 'react'
import './SetMood.sass'
import thermometer from '../images/thermometer_1.png'
const { setMood } = require('termometro-client-logic')


function SetMood({ token }) {

    const [value, setValue] = useState(7)

    const handleSetMood = (event) => {

        event.preventDefault()

        let moodScore = Number(value)

        try {
            setMood(token, moodScore)
        } catch (error) {
            if (error) throw error
        }
    }

    const handleOnChange = (event) => {
        
        setValue(event.target.value)
        
    }

    return (
        <section className="sliderContainer">
                <div className='sliderContainer__thermoContainer'>
                <img src={thermometer} className='sliderContainer__thermoContainer--thermoImg'></img>
                <input type="range" min="0" max="10" className="sliderContainer__thermoContainer--slider" value={value} onChange={handleOnChange}></input>
                <div className={`sliderContainer__thermoContainer--progress ${value==='1' && 'height1'} ${value==='2' && 'height2'} ${value==='3' && 'height3'} ${value==='4' && 'height4'} ${value==='5' && 'height5'} ${value==='6' && 'height6'} ${value==='7' && 'height7'} ${value==='8' && 'height8'} ${value==='9' && 'height9'} ${value==='10' && 'height10'} `}></div>
                </div>
                <div>{value}</div>
            <form onSubmit={handleSetMood}>
                <button>SUBMIT</button>
            </form>
        </section>
    )
}

export default SetMood
{/* <progress min="0" max="10" className="sliderContainer__thermoContainer--progress" value={value} onChange={handleOnChange}></progress> */}