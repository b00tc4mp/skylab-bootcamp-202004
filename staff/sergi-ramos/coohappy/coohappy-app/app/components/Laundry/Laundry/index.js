import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native'
import HeaderHome from '../../HeaderHome'
import WeekDays from '../WeekDays'
import TimeLaundry from '../TimeLaundry'
import styles from './styles'
import { retrieveLaundry, addDateLaundry, retrieveUser, deleteDateLaundry, retrieveCohousing } from 'coohappy-client-logic'
import getDayMonthWeek from 'coohappy-client-logic/helpers/week-month-days'
import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler';
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
                    cohousingLaundries.find(laundry => { return laundry.user === userId }) ?
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

