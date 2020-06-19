import React from 'react'
import {
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    Image
} from 'react-native'

import styles from './styles'

function SideBar({ onGoToCharts, onGoToManager, onGoToGreenhouse, onGoToForecast, onGoToCalendar, onGoToLogout, role }) {
    return (<>
        <View style={styles.container}>
            <View>
                <Text style={styles.text}> Charts</Text>
                <TouchableOpacity onPress={onGoToCharts}>
                    <Image source={require('../../../assets/images/charts.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
            {role === "admin" && (<>
                <View>
                    <Text style={styles.text}> Manager </Text>
                    <TouchableOpacity onPress={onGoToManager}>
                        <Image source={require('../../../assets/images/register.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </>)}
            <View>
                <Text style={styles.text}> Greenhouse </Text>
                <TouchableOpacity onPress={onGoToGreenhouse}>
                    <Image source={require('../../../assets/images/greenhouse.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={onGoToForecast}>
                    <Text style={styles.text}> Forecast </Text>
                    <Image source={require('../../../assets/images/forecast.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.text}> Calendar </Text>
                <TouchableOpacity onPress={onGoToCalendar}>
                    <Image source={require('../../../assets/images/calendar.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={onGoToLogout}>
                <Text style={styles.text}> Logout </Text>
                    <Image source={require('../../../assets/images/logout.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    </>)
}

export default SideBar