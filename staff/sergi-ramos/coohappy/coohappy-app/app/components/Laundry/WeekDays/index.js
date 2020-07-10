import React from 'react';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native'
import styles from './styles'


const WeekDays = function ({ currentWeek, onSelectedDay, daySelected }) {


    return (

        <View style={styles.container}>
            <View>
                <View style={styles.bar}></View>
            </View>


            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} bouncesZoom={true}>

                {
                    currentWeek && currentWeek.map(day =>

                        <TouchableOpacity key={day.day}
                            onPress={() => onSelectedDay(day)}
                            activeOpacity={0.7} >

                            {day.day === daySelected ?
                                <View style={styles.dayContainerSelected}>
                                    <Text style={styles.daySelected}>{day.day}</Text>
                                    <Text style={styles.dayNameSelected}>{day.dayString}</Text>
                                </View> :

                                <View style={styles.dayContainer}>
                                    <Text style={styles.day}>{day.day}</Text>
                                    <Text style={styles.dayName}>{day.dayString}</Text>
                                </View>
                            }

                        </TouchableOpacity>
                    )
                }
            </ScrollView>
            <View>
                <View style={styles.bar}></View>
            </View>
        </View>
    )
}
export default WeekDays


