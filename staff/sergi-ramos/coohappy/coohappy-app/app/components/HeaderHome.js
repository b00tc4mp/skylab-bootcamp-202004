import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity,AsyncStorage } from 'react-native'
import SvgUri from 'expo-svg-uri'
import { retrieveCohousing, retrieveUser } from 'coohappy-client-logic'

const HeaderHome = function ({ user, surname, navigation, cohousingInfo }) {

    const [ cohousing, setCohousing ] = useState()
    const [ userRole, setUserRole ] = useState()

    useEffect(() => {

      

    }, [cohousingInfo])

    useEffect(() => {

        (async () => {
            const token = await AsyncStorage.getItem('TOKEN')

            const user = await retrieveUser(token)
            const { role } = user
            setUserRole(role)
        })()

    },[])



    return (


        <View style={styles.header}>

            {userRole !== 'admin' ?
                <>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('InfoCommunity')}>
                        <SvgUri style={styles.houseIcon} source={require('../assets/ic-house.svg')} />
                    </TouchableOpacity>
                    {cohousingInfo && <Text style={styles.titleText}>{cohousingInfo.name} </Text>}

                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('UpdateUser')}>
                        <SvgUri style={styles.userIcon} source={require('../assets/ic-user.svg')} />
                    </TouchableOpacity>
                </> :

                <>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('InfoCommunityAdmin')}>
                        <SvgUri style={styles.houseIcon} source={require('../assets/ic-house.svg')} />
                    </TouchableOpacity>
                    {cohousingInfo && <Text style={styles.titleText}>{cohousingInfo.name} </Text>}

                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('UpdateUser')}>
                        <SvgUri style={styles.userIcon} source={require('../assets/ic-user.svg')} />
                    </TouchableOpacity>
                </>


            }




        </View>
    )
}

export default HeaderHome

const styles = StyleSheet.create({
    header: {
        height: 135,
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        backgroundColor: '#069b69',
    },
    titleText: {
        color: '#ffd545',
        fontWeight: '700',
        fontSize: 28,
        marginBottom: 20,
        marginRight: 50,
        width: 200
    },
    houseIcon: {
        marginBottom: 15,
        marginLeft: 20
    },

    userIcon: {
        marginBottom: 20,
        marginRight: 20
    }


})