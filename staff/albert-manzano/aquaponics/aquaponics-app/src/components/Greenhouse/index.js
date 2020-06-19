import React, { useState } from "react";
import { View, Image, ImageBackground, Text } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

import styles from './styles'

import Navbar from '../Navbar'
import SideBar from '../SideBar'

function Greenhouse({name,role,onGoToManager,onGoToCalendar,onGoToCharts,onGoToForecast,onGoToGreenhouse,onGoToLogout}) {
    const [displayed, setSide] = useState(false);
    const [error, setError] = useState('')
    
    const handleSide = () => setSide(!displayed);
    
    return (

        <View >
            <Navbar onDisplaySide={handleSide} />
            {displayed && <SideBar role={role} onGoToCalendar={onGoToCalendar} onGoToManager={onGoToManager} onGoToCharts={onGoToCharts} onGoToGreenhouse={onGoToGreenhouse} onGoToForecast={onGoToForecast} onGoToLogout={onGoToLogout} />}
            <ImageBackground
                source={require("../../../assets/images/greenhouse2.jpg")}
                style={styles.image}>
                <View style={styles.wrap}>
                    <View >
                        <Text>Ph</Text>
                        <Text>tempe</Text>
                        <Text >50%</Text>
                        <FeatherIcon name="wifi" ></FeatherIcon>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}



export default Greenhouse;
