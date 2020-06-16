import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,

} from 'react-native';

import styles from './styles';

import SideBar from '../SideBar';
import Navbar from '../Navbar';
import Feedback from '../Feedback';

function Home({ role,name, error, onGoToCalendar, onGoToCharts, onGoToForecast, onGoToRegister, onGoToGreenhouse }) {

    const [displayed, setSide] = useState(false);

    const handleSide = () => setSide(!displayed);



    return (<>
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/images/lettuce1.jpg')} style={styles.image}>
                {!error ? (<>
                    <Navbar onDisplaySide={handleSide} />
                    <Text style={styles.greet} > Welcome {name}</Text>
                    {displayed && <SideBar role={role} onGoToCalendar={onGoToCalendar} onGoToCharts={onGoToCharts} onGoToForecast={onGoToForecast} onGoToRegister={onGoToRegister} onGoToGreenhouse={onGoToGreenhouse} />}</>)
                    : (<View style={styles.error}><Feedback message={error.message} level={"error"} /></View>)
                }
            </ImageBackground>
        </View>
    </>)
}

export default Home