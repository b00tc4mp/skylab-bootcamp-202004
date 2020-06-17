import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Text, ScrollView, FlatList, SafeAreaView, TouchableHighlight } from 'react-native'
import weekDays from 'coohappy-client-logic/helpers/week-days'



const WeekDays = function () {

    const [week, setWeek] = useState()
    useEffect(() => {

        try {
            const updateWeek = weekDays()
            debugger
            setWeek(weekDays)

        } catch (error) {
            console.log(error)
        }
    }, [])
    return (

        <View style={styles.container}>
            <View>
                <View style={styles.bar}></View>
            </View>

                   <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} bouncesZoom={true}>

                {
                    week && week.map(day =>

                        <TouchableOpacity activeOpacity={0.7} >
                        
                            <View style={styles.dayContainer}>
                                <Text style={styles.day}>{day.day}</Text>
                                <Text style={styles.dayName}>{day.dayName}</Text>
                            </View>
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
