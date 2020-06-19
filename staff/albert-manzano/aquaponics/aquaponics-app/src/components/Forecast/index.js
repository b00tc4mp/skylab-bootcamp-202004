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

import { forecast } from 'aquaponics-client-logic'
import PropTypes from 'prop-types';

import { MaterialCommunityIcons } from '@expo/vector-icons';

function Forecast({ onGoToManager, onGoToCalendar, onGoToCharts, onGoToForecast, onGoToGreenhouse, onGoToLogout }) {
    const [view, setView] = useState('today')
    const [temp, setTemp] = useState('')
    const [temp_min, setTemp_min] = useState('')
    const [temp_max, setTemp_max] = useState('')
    const [main, setMain] = useState('')
    const [wind, setWind] = useState('')
    const [displayed, setSide] = useState(false);

    const handleSide = () => setSide(!displayed);

    useEffect(() => {

        (async () => {
            let { temp, temp_max, temp_min, main, wind } = await forecast(0)
            if (main === 'Rain') main = "rainy"

            setWind(wind)
            setMain(main)
            setTemp(temp)
            setTemp_min(temp_min)
            setTemp_max(temp_max)
        })()
    }, [])

    return (
        <View style={styles.container}>
            <Navbar onDisplaySide={handleSide} />
            {displayed && <SideBar onGoToCalendar={onGoToCalendar} onGoToManager={onGoToManager} onGoToCharts={onGoToCharts} onGoToGreenhouse={onGoToGreenhouse} onGoToForecast={onGoToForecast} onGoToLogout={onGoToLogout} />}
            <ImageBackground source={require("../../../assets/images/greenhouse4.jpg")} style={styles.image}>
                {view === "today" && (<>
                    <View style={styles.weatherContainer}>
                        <View style={styles.headerContainer}>
                            <MaterialCommunityIcons size={48} name={`weather-${main}`} />
                            <Text style={styles.temp}> {temp}C˚</Text>
                        </View>
                        <View style={styles.bodyContainer}>

                            <Text style={styles.temp_min}>{temp_min}</Text>
                            <Text style={styles.temp_max}>{temp_max}</Text>
                        </View>
                    </View>
                    <TouchableHighlight style={styles.buttons} onPress={() => handle3daysForecast()}>
                        <Text style={styles.text}>Next 3 days</Text>
                    </TouchableHighlight>
                </>)}
                {/* {view === "future" && (<>
                        <Navbar onDisplaySide={handleSide} />
                        <View style={styles.wrap}>
                            <View>
                                <View>
                                </View>
                                <View>
                                </View>
                                <View>
                                </View>
                                <View>
                                </View>
                                <View>
                                </View>
                            </View>
                            <TouchableHighlight onPress={() => handleOnToday()}>
                                <Text style={styles.text}>Today</Text>
                            </TouchableHighlight>
                        </View></>)} */}
            </ImageBackground>
        </View>
    );
}


export default Forecast
