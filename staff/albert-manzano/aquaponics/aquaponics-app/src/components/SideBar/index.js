import React from 'react'
import {
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    Image
} from 'react-native'

import styles from './styles'

function SideBar({ onGoToCharts, onGoToRegister,onGoToGreenhouse,onGoToForescast,onGoToCalendar,onGoToLogout }) {

    const handleGoToCharts = () => {
        onGoToCharts()
    }

    const handleGoToRegister = () => {
        onGoToRegister()
    }

    const handleGoToGreenhouse = () => {
        onGoToGreenhouse()
    }

    const handleGoToForecast = () => {
        onGoToForescast()
    }
    
    const handleGoToCalendar = () => {
        onGoToCalendar()
    }

    const handleGoToLogout = () => {
        onGoToLogout()
    }


    return (<>
        <View style={styles.container}>
            <View>
                <Text style={styles.textCharts}> Charts</Text>
                <TouchableOpacity onPress={() => handleGoToCharts()}>
                    <Image source={require('../../../assets/images/charts.png')} style={styles.iconCharts} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.textRegister}> Register </Text>
                <TouchableOpacity onPress={() => handleGoToRegister()}>
                    <Image source={require('../../../assets/images/register.png')} style={styles.iconRegister} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.textGreenhouse}> Greenhouse </Text>
                <TouchableOpacity onPress={() => handleGoToGreenhouse()}>
                    <Image source={require('../../../assets/images/greenhouse.png')} style={styles.iconGreenhouse} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.textForecast}> Forecast </Text>
                <TouchableOpacity onPress={() => handleGoToForecast()}>
                    <Image source={require('../../../assets/images/forecast.png')} style={styles.iconForecast} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.textCalendar}> Calendar </Text>
                <TouchableOpacity onPress={() => handleGoToCalendar()}>
                    <Image source={require('../../../assets/images/calendar.png')} style={styles.iconCalendar} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.textLogout}> Logout </Text>
                <TouchableOpacity onPress={() => handleGoToLogout()}>
                    <Image source={require('../../../assets/images/logout.png')} style={styles.iconLogout} />
                </TouchableOpacity>
            </View>
        </View>
    </>)
}

export default SideBar