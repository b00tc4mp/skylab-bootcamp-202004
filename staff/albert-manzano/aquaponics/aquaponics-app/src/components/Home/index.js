import React, { useState} from 'react';
import {
    View,
    Text,
    ImageBackground,
  
} from 'react-native';

import styles from './styles';

import SideBar from '../SideBar';
import Navbar from '../Navbar';
import Feedback from '../Feedback'

function Home({error,name,role,onGoToManager,onGoToCalendar,onGoToCharts,onGoToForecast,onGoToGreenhouse,onGoToLogout}) {
  
    const [displayed, setSide] = useState(false);

    const handleSide = () => setSide(!displayed);

    return (<>
        
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/images/lettuce1.jpg')} style={styles.image}>
            <Navbar  onDisplaySide={handleSide} />
            <Text style={styles.name}>Welcome {name} !</Text>
            {error ? <Feedback message={error} level={"error"} />:null}
            {displayed && <SideBar error={error} role={role} onGoToCalendar={onGoToCalendar} onGoToManager={onGoToManager} onGoToCharts={onGoToCharts} onGoToGreenhouse={onGoToGreenhouse} onGoToForecast={onGoToForecast} onGoToLogout={onGoToLogout} />}
            </ImageBackground>
        </View>
    </>)
}

export default Home