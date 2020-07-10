import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native'
import styles from './styles'
import { timeFrames } from '../../../constants/time-frames'


const TimeLaundry = function ({ laundriesAmount, onSelectedHour, currentUserId, cohousing, daySelected }) {

    const [cohousingLaundries, setCohousingLaundries] = useState()

    useEffect(() => {

        (async () => {
            debugger
    
            const _cohousing = await retrieveCohousing()
            setCohousing(_cohousing)
            const { laundry } = _cohousing
            setCohousingLaundries(laundry)  
        })

    }, [])

    useEffect(() => {
       
    }, [cohousingLaundries])


    return (<>

        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>

                {
                    timeFrames && timeFrames.map(time =>

                        (laundriesAmount && laundriesAmount.findIndex(x => x.hour === time && x.amount === 4)) === -1 ?
                            <TouchableOpacity onPress={() => onSelectedHour(time)} activeOpacity={0.7} >
                                {
                            
                                    cohousing && cohousing.find(laundry => laundry.user === currentUserId && time === laundry.hour && daySelected.toString() === laundry.day  ) ?//prova
                                  
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
                                    cohousing && cohousing.find(laundry => laundry.user === currentUserId && time === laundry.hour ) ?

                                        <View style={styles.hourContainerSelected}>

                                            <Text style={styles.hourSelected}>{time}</Text>
                                            <Text style={styles.availabilitySelected}>Your reservation</Text>
                                        </View> :

                                        <View style={styles.hourContainerComplete}>

                                            <Text style={styles.hour}>{time}</Text>
                                            <Text style={styles.availabilityComplete}>Complete</Text>
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

