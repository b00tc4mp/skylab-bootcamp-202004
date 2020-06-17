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

            {/* <FlatList
            
            horizontal={true}
            showsHorizontalScrollIndicator={false}
                data={week}
                renderItem={({ item }) => (
                    <View style={styles.dayContainer}>
                        <Text style={styles.day}>{item.day}</Text>
                        <Text style={styles.dayName}>{item.dayName}</Text>
                    </View>
                )}
            /> */}



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


const styles = StyleSheet.create({

    
    dayContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#e4e4e4',
        marginLeft: 10,
        marginRight: 10,
        width: 60,
        height: 60,
        borderRadius: 30
    },
    day: {
        fontSize: 25,
        color: '#81868e',
        fontWeight: '700',
        width: 32
    },
    dayName: {
        color: '#797979',
        marginBottom: 5

    },
    bar: {
        width: '100%',
        height: 0.7,
        backgroundColor: '#003725',
        marginTop: 15,
        marginBottom: 15

    }



})