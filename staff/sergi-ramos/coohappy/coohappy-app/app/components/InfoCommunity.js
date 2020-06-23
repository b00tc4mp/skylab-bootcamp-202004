import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, AsyncStorage, Alert } from 'react-native'
import SvgUri from "expo-svg-uri"

import { retrieveCohousing, retrieveUser } from 'coohappy-client-logic'
import { ScrollView } from 'react-native-gesture-handler';

const InfoCommunity = function ({ navigation }) {


    const [cohousing, setCohousing] = useState()
    const [membersCohousing, setMembersCohousing] = useState()

    useEffect(() => {
        try {
            (async () => {
                const membersNames = []
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
                    <SvgUri style={styles.returnIcon} source={require('../assets/ic-arrow-back-yellow.svg')} />
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
                                <SvgUri source={require('../assets/ic-user-2.svg')}></SvgUri>
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

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        width: '100%',
    },
    header: {
        backgroundColor: '#069b69',
        height: 135,
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        color: '#ffd545',
        flexDirection: "row",
        marginBottom: 30
    },
    titleText: {
        color: '#ffd545',
        fontWeight: '700',
        fontSize: 28,
        marginBottom: 20,
        marginLeft: 20,
        width: 300
    },
    returnIcon: {
        marginBottom: 25,
        marginLeft: 20
    },
    cohousingInfo: {
        marginLeft: 25,
        marginBottom: 20
    },
    name: {
        fontWeight: '700',
        fontSize: 17,
        marginBottom: 2
    },
    address: {
        fontSize: 17,
        marginBottom: 2
    },
    bar: {
        width: '100%',
        height: 0.7,
        backgroundColor: '#003725',

    },
    barBold: {
        width: '100%',
        height: 1.4,
        backgroundColor: '#003725',
        marginBottom: 5

    },
    titleMembers: {
        fontWeight: '700',
        marginLeft: 25,
        marginBottom: 20,
        marginTop: 20

    },
    memberContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
        marginLeft: 25
    },
    nameMember: {
        fontSize:19,
        marginLeft: 15
    }


})