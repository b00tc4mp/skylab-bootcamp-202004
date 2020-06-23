import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, ScrollView } from 'react-native'
import weekDays from 'coohappy-client-logic/helpers/week-month-days'
import { timeFrames } from '../constants/time-frames'


const TimeLaundry = function ({ laundriesAmount, onSelectedHour, currentUserId }) {


    //     const [ laundries, setLaundries ] = useState(laundriesAmount)
    //useEffect(() => {

    // setLaundries(laundriesAmount)

    // }, [])

    //if(!laundriesAmount) return <Text>Loading</Text>

    return (<>

        {/* 
              <FlatList
              
              showsHorizontalScrollIndicator={false}
              data={timeFrames}
              renderItem={({ item }) => (
                  <View style={styles.hourContainer}>
                  <Text style={styles.hour}>{item.day}</Text>
                  
                  </View>
                  )}
                />  */}

        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>

                {
                    timeFrames && timeFrames.map(time =>
                        //console.log(time)
                        (laundriesAmount && laundriesAmount.findIndex(x => x.hour === time && x.amount === 4)) === -1 ?
                            <TouchableOpacity onPress={() => onSelectedHour(time)} activeOpacity={0.7} >
                                {

                                    laundriesAmount.find(laundry => laundry.userId === currentUserId && time === laundry.hour) ?

                                        <View style={styles.hourContainerSelected}>

                                            <Text style={styles.hourSelected}>{time}</Text>
                                            <Text style={styles.availabilitySelected}>Your reservation</Text>
                                        </View> :


                                        <View style={styles.hourContainer}>

                                            <Text style={styles.hour}>{time}</Text>
                                            <Text style={styles.availability}>Available</Text>
                                        </View>
                                }
                            </TouchableOpacity> :

                            <TouchableOpacity activeOpacity={0.7} >

                                {
                                    laundriesAmount.find(laundry => laundry.userId === currentUserId && time === laundry.hour) ?

                                        <View style={styles.hourContainerSelected}>

                                            <Text style={styles.hourSelected}>{time}</Text>
                                            <Text style={styles.availabilitySelected}>Your reservation</Text>
                                        </View> :


                                        <View style={styles.hourContainerComplete}>

                                            <Text style={styles.hour}>{time}</Text>
                                            <Text style={styles.availability}>Complete</Text>
                                        </View>
                                }
                            </TouchableOpacity>


                    )
                }
            </View>
        </ScrollView>
    </>)
}
export default TimeLaundry

const styles = StyleSheet.create({

    container: {
        width: '90%',
        alignSelf: 'center'
    },
    hourContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        height: 55,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#069b69'
    },
    hourContainerSelected: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        height: 55,
        borderRadius: 30,
        backgroundColor: '#ffd545'
    },
    hourSelected: {
        fontSize: 18,
        color: '#069b69',
        marginLeft: 20,
        fontWeight:'700',
        width: 120
    },
    availabilitySelected: {
        color: '#069b69',
        marginRight: 20,
        fontWeight:'700',
        width: 109
    },
    hourContainerComplete: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        height: 55,
        borderRadius: 30,
        backgroundColor: '#e4e4e4'
    },
    hour: {
        fontSize: 18,
        color: '#81868e',
        marginLeft: 20,
        width:112
    },
    availability: {
        color: '#069b69',
        marginRight: 20
    },
    scrollView: {
        width: '100%',
        height: 515
    }
})