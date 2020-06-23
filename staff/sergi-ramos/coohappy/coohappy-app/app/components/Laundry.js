import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, AsyncStorage, Alert } from 'react-native'
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
    const [day, setDay] = useState(moment().date())
    const [result, setResults] = useState()
    const [laundries, setLaundries] = useState([])
    const [hour, setHour] = useState()
    const [update, setUpdate] = useState(false)
    const [userId, setUserId] = useState()
    const [cohousing, setCohousing] = useState()

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                const _cohousing = await retrieveCohousing()
                setCohousing(_cohousing)
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

    }, [day])


    //TODO delete all laundries when time pass

    const __handleUpdate__ = async () => {
        try {

            const { id } = await retrieveUser()
            const laundriesAmount = await retrieveLaundry(day)
            setUserId(id)
            setLaundries(laundriesAmount)

        } catch (error) {
            Alert.alert('OOPS!!', error.message)
        }
    }

    const handleDaySelection = async (_day) => setDay(_day.day)


    const handleHourSelection = async (hour) => {

        try {

            await addDateLaundry(day, hour)
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
                    laundries.find(laundry => laundry.userId === userId) ?


                        <View style={styles.reserve}>

                            <View>
                                <SvgUri source={require('../assets/ic-whasing-machine-black.svg')} />
                            </View>

                            <View style={styles.dayContainer}>
                                <Text style={styles.day}>Do you want to cancel?</Text>
                            </View>

                            <View style={styles.cancelContainer}>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => handleOnCancelLaundry()}>
                                    <Text style={styles.cancel}>CANCEL</Text>
                                </TouchableOpacity>
                            </View>
                        </View> :
                        <Text style={styles.textLaundry}>Reserve your washing machine!</Text>

                }

            </View>
            <View style={styles.daysContainer}>
                <WeekDays daySelected={day} currentWeek={week} onSelectedDay={handleDaySelection} />
                <TimeLaundry currentUserId={userId} onSelectedHour={handleHourSelection} laundriesAmount={laundries} />
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
        marginTop: 15,
        alignItems: 'center',
        height: 100
    },
    cancel: {
        width: 90,
        height: 50,
        backgroundColor: '#003725',
        color: 'white',
        fontWeight: '700',
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center'
    },

    day: {
        fontSize: 20
    }


})