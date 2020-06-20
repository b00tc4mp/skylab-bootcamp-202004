import React, { useState, useEffect } from "react";

import {
    View,
    Image,
    ImageBackground,
    Text,
    TouchableHighlight
} from "react-native";

import styles from "./styles"
import Navbar from '../Navbar';
import SideBar from '../SideBar'
import Feedback from '../Feedback'

import { forecast, forecast3Days } from 'aquaponics-client-logic'
// import PropTypes from 'prop-types';

import { MaterialCommunityIcons } from '@expo/vector-icons';

function Forecast({ role, onGoToManager, onGoToCalendar, onGoToCharts, onGoToForecast, onGoToGreenhouse, onGoToLogout }) {
    const [view, setView] = useState('today')
    const [temp, setTemp] = useState('')
    const [temp_min, setTemp_min] = useState('')
    const [temp_max, setTemp_max] = useState('')
    const [main, setMain] = useState('')
    const [wind, setWind] = useState('')
    const [displayed, setSide] = useState(false);
    const [main1, setMain1] = useState('')
    const [temp1, setTemp1] = useState('')
    const [main2, setMain2] = useState('')
    const [temp2, setTemp2] = useState('')
    const [main3, setMain3] = useState('')
    const [temp3, setTemp3] = useState('')
    const [error, setError] = useState('')

    const handleSide = () => setSide(!displayed);

    useEffect(() => {

        (async () => {
            try {
                let { temp, temp_max, temp_min, main, wind } = await forecast(0)
                if (main === 'Rain') main = "rainy"
                if (main === 'Clouds') main = 'cloudy'
                setWind(wind)
                setMain(main)
                setTemp(temp)
                setTemp_min(temp_min)
                setTemp_max(temp_max)
            } catch (error) {
                if (error) setError(error.message)
            }
        })()
    }, [])

    const handle3daysForecast = () => {
        (async () => {
            try {
                let { main1, main2, main3, temp1, temp2, temp3 } = await forecast3Days()
                if (main1 === 'Rain') main1 = "rainy"
                if (main2 === 'Rain') main2 = "rainy"
                if (main2 === 'Rain') main3 = "rainy"
                setMain1(main1)
                setTemp1(temp1)
                setMain2(main2)
                setTemp2(temp2)
                setMain3(main3)
                setTemp3(temp3)
                setView('3days')
            } catch (error) {
                if (error) setError(error.message)
            }
        })()
    }

    const handleOnToday = () => {
        (async () => {
            try {
                let { temp, temp_max, temp_min, main, wind } = await forecast(0)
                if (main === 'Rain') main = "rainy"
                setWind(wind)
                setMain(main)
                setTemp(temp)
                setTemp_min(temp_min)
                setTemp_max(temp_max)
                setView('today')
            } catch (error) {
                if (error) setError(error.message)
            }
        })()
    }

    return (

        <View style={styles.container}>
            <Navbar onDisplaySide={handleSide} />
            {displayed && <SideBar role={role} onGoToCalendar={onGoToCalendar} onGoToManager={onGoToManager} onGoToCharts={onGoToCharts} onGoToGreenhouse={onGoToGreenhouse} onGoToForecast={onGoToForecast} onGoToLogout={onGoToLogout} />}
            <ImageBackground source={require("../../../assets/images/greenhouse4.jpg")} style={styles.image}>
                {view === "today" && (<>
                    <View style={styles.weatherContainer}>
                        <View style={styles.headerContainer}>
                            <MaterialCommunityIcons style={styles.icon} marginTop={'20%'} size={80} name={`weather-${main}`} />
                            <Text style={styles.temp}>Temp: {temp} C˚</Text>
                            <Text style={styles.wind}>wind: {wind} knoots</Text>
                        </View>
                        <View style={styles.bodyContainer}>
                            <Text style={styles.temp_min}>min temp. {temp_min} C˚ /</Text>
                            <Text style={styles.temp_max}>max temp. {temp_max} C˚</Text>
                        </View>

                    </View>
                    <TouchableHighlight style={styles.button} onPress={() => handle3daysForecast()}>
                        <Text style={styles.text}>Next 3 days</Text>
                    </TouchableHighlight>
                </>)}
                {view === "3days" && (<>
                    <View style={styles.weatherContainer}>
                        <View style={styles.day}>
                            <MaterialCommunityIcons style={styles.icon} size={50} name={`weather-${main1}`} />
                            <Text style={styles.temp1}>Temp: {temp1} C˚</Text>
                        </View>
                        <View style={styles.day}>
                            <MaterialCommunityIcons style={styles.icon} size={50} name={`weather-${main2}`} />
                            <Text style={styles.temp2}>Temp: {temp2} C˚</Text>
                        </View>
                        <View style={styles.day}>
                            <MaterialCommunityIcons style={styles.icon} size={50} name={`weather-${main3}`} />
                            <Text style={styles.temp3}>Temp: {temp3} C˚</Text>
                        </View>

                    </View>
                    <TouchableHighlight style={styles.button} onPress={() => handleOnToday()}>
                        <Text style={styles.text}>Today</Text>
                    </TouchableHighlight>
                </>)}
                {error ? <Feedback message={error.message} level={"error"} /> : null}
            </ImageBackground>
        </View>
    );
}


export default Forecast
