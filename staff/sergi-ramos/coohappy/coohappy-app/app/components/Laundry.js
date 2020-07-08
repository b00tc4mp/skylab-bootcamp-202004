import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, Dimensions } from 'react-native'
import HeaderHome from './HeaderHome'
import WeekDays from './WeekDays'
import TimeLaundry from './timeLaundry'
import { retrieveLaundry, addDateLaundry, retrieveUser, deleteDateLaundry, retrieveCohousing } from 'coohappy-client-logic'
import getDayMonthWeek from 'coohappy-client-logic/helpers/week-month-days'
import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SvgUri from 'expo-svg-uri';
import { useFocusEffect } from '@react-navigation/native'


const Laundry = function ({ navigation }) {
    const [week, setWeek] = useState()
    const [dayNow, setDay] = useState(moment().date())
    const [result, setResults] = useState()
    const [laundries, setLaundries] = useState([])
    const [hourSelected, setHour] = useState()
    const [update, setUpdate] = useState(false)
    const [userId, setUserId] = useState()
    const [cohousing, setCohousing] = useState()
    const [dayCancel, setDayCancel] = useState('')
    const [hourCancel, setHourCancel] = useState('')
    const [cohousingLaundries, setCohousingLaundries] = useState([])

    useFocusEffect(
        React.useCallback(() => {
            (async () => {

                const { id } = await retrieveUser()
                const _cohousing = await retrieveCohousing()
                setCohousing(_cohousing)

                const { laundry } = _cohousing
                const { hour, day } = laundry.find(laundry => laundry.user === id)
                console.log(hour)
                setHourCancel(hour)
                setDayCancel(day)
                setCohousingLaundries(laundry)


            })()

            return () => {
            }
        }, [])
    )

    useEffect(() => {
        (async () => {
            try {
                const updateWeek = getDayMonthWeek()

                setWeek(updateWeek)

                const _cohousing = await retrieveCohousing()
                setCohousing(_cohousing)

                await __handleUpdate__()

            } catch (error) {
                Alert.alert('OOPS!!', error.message)
            }
        })()

    }, [dayNow, cohousingLaundries.length])


    const __handleUpdate__ = async () => {
        try {
            debugger
            const { id } = await retrieveUser()
            const laundriesAmount = await retrieveLaundry(dayNow)

            const _cohousing = await retrieveCohousing()
            const { laundry } = _cohousing
            setCohousingLaundries(laundry)

            setUserId(id)
            setLaundries(laundriesAmount)

        } catch (error) {
            Alert.alert('OOPS!!', error.message)
        }
    }

    const handleDaySelection = async (_day) => setDay(_day.day)


    const handleHourSelection = async (hourSelected) => {


        try {

            await addDateLaundry(dayNow, hourSelected)
            setHourCancel(hourSelected)
            setDayCancel(dayNow)

            await __handleUpdate__()

        } catch (error) {

            Alert.alert('OOPS!!', error.message)
        }
    }

    const handleOnCancelLaundry = async () => {

        try {


            await deleteDateLaundry()
            await __handleUpdate__()

        } catch (error) {
            Alert.alert('OOPS!!', error.message)
        }
    }

    return (

        <View style={styles.container}>

            <HeaderHome navigation={navigation} cohousingInfo={cohousing} />
            <View style={{ backgroundColor: 'white' }}>

                {
                    cohousingLaundries.find(laundry => { return laundry.user === userId }) ?// prova
                        //laundries.find(laundry => { return laundry.userId === userId }) ?
                        <>
                            <Text style={styles.textLaundry}>Your reservation</Text>
                            <View style={styles.reserve}>


                                <View style={styles.dayContainer}>
                                    <Text style={styles.day}>Day & Hour:</Text>
                                    <Text style={styles.hour}>{dayCancel},  {hourCancel}</Text>
                                </View>

                                <View style={styles.verticalLine}></View>

                                <View style={styles.cancelContainer}>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => handleOnCancelLaundry()}>
                                        <Text style={styles.cancel}>CANCEL</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                        :

                        <Text style={styles.textLaundry}>Reserve your washing machine!</Text>

                }

            </View>
            <View style={styles.daysContainer}>
                <WeekDays daySelected={dayNow} currentWeek={week} onSelectedDay={handleDaySelection} />
                <TimeLaundry currentUserId={userId} onSelectedHour={handleHourSelection} laundriesAmount={laundries} cohousing={cohousingLaundries} daySelected={dayNow} />
            </View>
        </View>
    )
}

export default Laundry

const styles = StyleSheet.create({
    container: {
        width: '100%'

    },
    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        backgroundColor: '#069b69',
    },
    textLaundry: {
        fontWeight: '700',
        fontSize: 20,
        width: '100%',
        marginLeft: 15,
        marginBottom: 15,
        marginTop: 15
    },
    daysContainer: {
        width: '100%',
        backgroundColor: 'white'
    },

    reserve: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 0.7,
        alignItems: 'center',
        height: 100
    },
    verticalLine: {
        width: 1,
        height: 100,
        backgroundColor: 'black'
    },
    dayContainer: {
        width: Dimensions.get('window').width / 2

    },
    cancelContainer: {
        width: Dimensions.get('window').width / 2,
        flex: 1,
        alignItems: 'center'

    },
    cancel: {
        width: 180,
        height: 50,
        backgroundColor: '#003725',
        color: 'white',
        fontWeight: '700',
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center'
    },

    day: {
        fontSize: 17,
        marginLeft: 20,
        marginBottom: 2,

    },
    hour: {
        fontSize: 18,
        marginLeft: 20,
        marginTop: 2,
        fontWeight: '700'
    }


})