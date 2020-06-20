import React, { useState, useEffect } from "react";
import {
    LineChart,
    StackedBarChart
} from "react-native-chart-kit";

import {
    View,
    Image,
    ImageBackground,
    ActivityIndicator,
    TouchableHighlight,
    Text,
    Dimensions,
    ScrollView
} from "react-native";

import Navbar from '../Navbar';
import SideBar from '../SideBar'
import styles from './styles';

import { retrievePh, retrieveTemperature } from 'aquaponics-client-logic'

function Charts({ role, onGoToManager, onGoToCalendar, onGoToCharts, onGoToForecast, onGoToGreenhouse, onGoToLogout }) {
    // const [view, setView] = useState('temperature')
    const [temperatures, setTemps] = useState('')
    const [phs, setPhs] = useState('')
    const [displayed, setSide] = useState(false);

    const handleSide = () => setSide(!displayed);

    useEffect(() => {
        const timer = setTimeout(() => {
            (async () => {
                try {
                    let tempResult = await retrieveTemperature()
                    const temperatures = await tempResult.map(({ temperature }) => temperature)
                    setTemps(temperatures)
                    let phResult = await retrievePh()
                    const phs = await phResult.map(({ ph }) => ph)
                    setPhs(phs)
                } catch (error) {
                    throw new Error('something wrong happened')
                }
            })()
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../../assets/images/lettuce3.jpg")} style={styles.background}>
                <Navbar onDisplaySide={handleSide} />
                {displayed && <SideBar role={role} onGoToCalendar={onGoToCalendar} onGoToManager={onGoToManager} onGoToCharts={onGoToCharts} onGoToGreenhouse={onGoToGreenhouse} onGoToForecast={onGoToForecast} onGoToLogout={onGoToLogout} />}
                <Text style={styles.title}>Temperature</Text>
                {temperatures ? (<>
                    <View>
                        <ScrollView horizontal={true}>
                            <LineChart
                                data={{
                                    // labels: ["January", "February", "March", "April", "May", "June"],
                                    datasets: [
                                        {
                                            data: temperatures

                                        }
                                    ]
                                }}
                                width={temperatures.length * 20 + 50}
                                height={200}
                                yAxisSuffix=" C˚"
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "#e6e6e6",
                                    backgroundGradientFrom: "#B2BEB5",
                                    backgroundGradientTo: "#cccccc",
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 0.8) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "2",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                }}

                                style={{
                                    marginTop: 15,
                                    alignSelf: "center",
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            /></ScrollView>
                    </View></>) : <Text>Loading...</Text>}

                <Text style={styles.title}>Ph</Text>
                {phs ? (<>
                    <View>
                        <ScrollView horizontal={true}>
                            <LineChart
                                data={{
                                    // labels: ["January", "February", "March", "April", "May", "June"],
                                    datasets: [
                                        {
                                            data: phs

                                        }
                                    ]
                                }}
                                width={phs.length * 20 + 50}
                                height={200}
                                yAxisSuffix=" H+ "
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "#e6e6e6",
                                    backgroundGradientFrom: "#B2BEB5",
                                    backgroundGradientTo: "#cccccc",
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 0.8) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "2",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                }}

                                style={{
                                    marginTop: 15,
                                    alignSelf: "center",
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            /></ScrollView>
                    </View></>) : <Text >Loading...</Text>}
            </ImageBackground>
        </View>
    );
}

export default Charts
