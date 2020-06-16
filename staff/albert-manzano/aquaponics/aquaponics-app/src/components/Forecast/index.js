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



// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import PropTypes from 'prop-types';
// import { weatherConditions } from '../utils/WeatherConditions';



function Forecast() {
    const [view, setView] = useState('today')

    const [displayed, setSide] = useState(false);

    const handleSide = () => setSide(!displayed);
    // useEffect

    const handleOnToday = () => {
        setView('future')
    }

    const handleOnFuture = () => {
        setView('today')
    }

    return (
        <View >
            <View >
                <ImageBackground source={require("../../../assets/images/greenhouse4.jpg")} style={styles.image}>
                    {view === "today" && (<><Navbar onDisplaySide={handleSide} />
                        <View>
                            <View style={styles.canvas}>

                            </View>
                            <TouchableHighlight onPress={() => handleOnFuture()}>
                                <Text style={styles.text}>Next 3 days</Text>
                            </TouchableHighlight>
                        </View></>)}
                    {view === "future" && (<>
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
                        </View></>)}
                </ImageBackground>
            </View>
        </View>
    );
}

export default Forecast
