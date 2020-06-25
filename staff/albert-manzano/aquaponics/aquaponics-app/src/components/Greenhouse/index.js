import React, { useState } from "react";
import { View, Image, ImageBackground, Text } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

import styles from './styles'

import Navbar from '../Navbar'
import SideBar from '../SideBar'

function Greenhouse({ lastPh,lastTemp, role, onGoToManager, onGoToCalendar, onGoToCharts, onGoToForecast, onGoToGreenhouse, onGoToLogout }) {
    const [displayed, setSide] = useState(false);
    const [error, setError] = useState('')
    let { temperature } = lastTemp
    let { ph } = lastPh
    const handleSide = () => setSide(!displayed);

    return (<>
        <View sytle={styles.container}>
            <Navbar onDisplaySide={handleSide} />
            {displayed && <SideBar role={role} onGoToCalendar={onGoToCalendar} onGoToManager={onGoToManager} onGoToCharts={onGoToCharts} onGoToGreenhouse={onGoToGreenhouse} onGoToForecast={onGoToForecast} onGoToLogout={onGoToLogout} />}
            <ImageBackground source={require("../../../assets/images/greenhouse2.jpg")} style={styles.image}>
                <View style={styles.wrap}>

                    <Text style={[(temperature< 30 && temperature>25) ? styles.bgcolorgGreen : styles.bgcolorRed]} >Current temp: {temperature} C˚</Text>
                    <Text style={[(ph<7 && ph>4) ? styles.bgcolorgGreen : styles.bgcolorRed]}>Current Ph: {ph}</Text>
                    {/* <Text style={styles.battery}>Bat. remaining:   %</Text> */}
                    <FeatherIcon size={80} name="wifi" ></FeatherIcon>
                </View>
            </ImageBackground>
        </View>
    </>);
}



export default Greenhouse;
