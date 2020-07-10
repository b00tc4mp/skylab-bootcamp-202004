import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, ScrollView, Clipboard, Alert } from 'react-native'
import SvgUri from "expo-svg-uri"
import ButtonForm from '../../ButtonForm'
import { retrieveCohousing, updateCohousing } from 'coohappy-client-logic'
import styles from './styles'

const InfoCommunityAdmin = function ({ navigation }) {

    const [name, setName] = useState()
    const [street, setStreet] = useState()
    const [number, setNumber] = useState()
    const [city, setCity] = useState()
    const [country, setCountry] = useState()
    const [accessCode, setAccessCode] = useState()
    const [membersCohousing, setMembersCohousing] = useState()


    useEffect(() => {

        try {
            (async () => {
                
                const { name, address: { street, number, city, country }, accessCode, members } = await retrieveCohousing()
                setName(name)
                setStreet(street)
                setNumber(number.toString())
                setCity(city)
                setCountry(country)
                setAccessCode(accessCode)
                setMembersCohousing(members)
            })()

        } catch (error) {
            Alert.alert('OOPS!', error.message)
        }
    }, [])


    const handleOnUpdateCommunity = async () => {
        
        try {
            
            await updateCohousing( { name, address: { street, number, city, country } })
            Alert.alert('DONE!', 'Cohousing update correctly')
        } catch (error) {
            Alert.alert('OOPS!', error.message)
        }
    }


    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {

                        navigation.goBack()
                    }}>
                        <SvgUri style={styles.returnIcon} source={require('../../../assets/ic-arrow-back-yellow.svg')} />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>{name}</Text>
                </View>

                <View style={styles.form}>
                    <TextInput style={styles.input} onChangeText={(value => setName(value))} defaultValue={name} placeholder="community name" placeholderTextColor="#81868e" />
                    <TextInput style={styles.input} onChangeText={(value => setStreet(value))} defaultValue={street} placeholder="street" placeholderTextColor="#81868e" />
                    <TextInput style={styles.input} onChangeText={(value => setNumber(value))} keyboardType='numeric' defaultValue={`${number}`} placeholder="number" placeholderTextColor="#81868e" />
                    <TextInput style={styles.input} onChangeText={(value) => setCity(value)} defaultValue={city} placeholder="city" placeholderTextColor="#81868e" />
                    <TextInput style={styles.input} onChangeText={(value) => setCountry(value)} defaultValue={country} placeholder="country" placeholderTextColor="#81868e" />
                </View>

                <View style={{ width: '90%', marginTop: 10 }}>
                    <ButtonForm buttonAction={handleOnUpdateCommunity} text="SAVE CHANGES" bgColor="#009965" />
                </View>


                <View style={styles.barBold}></View>
                <View style={styles.passwordContainer}>
                    <Text style={styles.titlePassword}>COMMUNITY PASSWORD</Text>
                    <Text style={styles.paragraphPassword}>Sent this password to your neighbor to join this community.</Text>
                </View>

                <View style={styles.accessCodeConatiner}>
                    <Text style={styles.textAccessCode}>{accessCode}</Text>
                    <TouchableOpacity onPress={() => Clipboard.setString(accessCode)}>
                        <SvgUri style={styles.copyAccesCode} source={require('../../../assets/ic-copy.svg')} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.titleMembers}>COMMUNITY MEMBERS</Text>
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


            </View>
        </ScrollView>
    )
}

export default InfoCommunityAdmin

