import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Alert } from 'react-native'
import SvgUri from "expo-svg-uri"
import { retrieveCohousing } from 'coohappy-client-logic'
import { ScrollView } from 'react-native-gesture-handler'
import styles from './styles'



const InfoCommunity = function ({ navigation }) {


    const [cohousing, setCohousing] = useState()
    const [membersCohousing, setMembersCohousing] = useState()

    useEffect(() => {
        try {
            (async () => {
                
                const _cohousing = await retrieveCohousing()
                setCohousing(_cohousing)
                const { members } = _cohousing
                setMembersCohousing(members)
            })()
        } catch (error) {
            Alert.alert('OOPS!!', error.message)
        }

    }, [])

    useEffect(() => {

    }, [cohousing, membersCohousing])



    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => {

                    navigation.goBack()
                }}>
                    <SvgUri style={styles.returnIcon} source={require('../../../assets/ic-arrow-back-yellow.svg')} />
                </TouchableOpacity>
                {cohousing && <Text style={styles.titleText}>{cohousing.name}</Text>}
            </View>

            {cohousing && <View style={styles.cohousingInfo}>
                <Text style={styles.name}>{cohousing.name}</Text>
                <Text style={styles.address}>{`${cohousing.address.street}, ${cohousing.address.number}`}</Text>
                <Text style={styles.address}>{cohousing.address.city}</Text>
                <Text style={styles.address}>{cohousing.address.country}</Text>

            </View>}

            <View>
                <View style={styles.barBold}></View>
            </View>
            <Text style={styles.titleMembers}>COMMUNITY MEMBERS</Text>
           
            <ScrollView>
                {
                    membersCohousing && membersCohousing.map(({ name, surname }) =>
                        <>
                            <View>
                                <View style={styles.bar}></View>
                            </View>
                            <View style={styles.memberContainer}>
                                <SvgUri source={require('../../../assets/ic-user-2.svg')}></SvgUri>
                                <Text style={styles.nameMember}>{`${name} ${surname}`}</Text>
                            </View>
                        </>
                    )
                }
            </ScrollView>
            <View>
                <View style={styles.barBold}></View>
            </View>
        </View>
    )
}

export default InfoCommunity

