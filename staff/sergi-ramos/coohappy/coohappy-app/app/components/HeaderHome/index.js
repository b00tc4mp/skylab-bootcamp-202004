import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import SvgUri from 'expo-svg-uri'
import { retrieveUser } from 'coohappy-client-logic'
import styles from './styles'

const HeaderHome = function ({navigation, cohousingInfo }) {

    const [cohousing, setCohousing] = useState()
    const [userRole, setUserRole] = useState()

    useEffect(() => {
    }, [cohousingInfo])

    useEffect(() => {

        (async () => {
            const user = await retrieveUser()
            const { role } = user
            setUserRole(role)
        })()

    }, [])


    return (

        <View style={styles.header}>

            {userRole !== 'admin' ?

                <>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('InfoCommunity')}>
                        <SvgUri style={styles.houseIcon} source={require('../../assets/ic-house.svg')} />
                    </TouchableOpacity>
                    {cohousingInfo && <Text style={styles.titleText}>{cohousingInfo.name} </Text>}

                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('UpdateUser')}>
                        <SvgUri style={styles.userIcon} source={require('../../assets/ic-user.svg')} />
                    </TouchableOpacity>
                </> :

                <>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('InfoCommunityAdmin')}>
                        <SvgUri style={styles.houseIcon} source={require('../../assets/ic-house.svg')} />
                    </TouchableOpacity>
                    {cohousingInfo && <Text style={styles.titleText}>{cohousingInfo.name} </Text>}

                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('UpdateUser')}>
                        <SvgUri style={styles.userIcon} source={require('../../assets/ic-user.svg')} />
                    </TouchableOpacity>
                </>

            }

        </View>
    )
}

export default HeaderHome

