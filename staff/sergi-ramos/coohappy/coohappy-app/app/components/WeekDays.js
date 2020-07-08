import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, ScrollView } from 'react-native'


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


const styles = StyleSheet.create({

    dayContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#e4e4e4',
        margin: (15, 10, 15, 10),
        width: 60,
        height: 60,
        borderRadius: 30
    },
    day: {
        fontSize: 25,
        color: '#81868e',
        fontWeight: '700',
        width: 32,
        textAlign: 'center'
    },
    dayName: {
        color: '#797979',
        marginBottom: 5
    },
    dayContainerSelected: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#069b69',
        margin: (15, 10, 15, 10),
        width: 60,
        height: 60,
        borderRadius: 30
    },
    daySelected: {
        fontSize: 25,
        color: 'white',
        fontWeight: '700',
        width: 32,
        textAlign: 'center'
    },
    dayNameSelected: {
        color: 'white',
        marginBottom: 5
    },
    bar: {
        width: '100%',
        height: 0.7,
        backgroundColor: '#003725'
    }

})