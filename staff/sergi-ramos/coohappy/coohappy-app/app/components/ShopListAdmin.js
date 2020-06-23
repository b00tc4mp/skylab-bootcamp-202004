import React, {  useState } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Text, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import SvgUri from "expo-svg-uri"
import ButtonForm from './ButtonForm'
require('coohappy-commons/polyfills/string')
const { utils: { Email } } = require('coohappy-commons')
import { retrieveAllUsersFoodList, sendFoodList } from 'coohappy-client-logic'



const ShopListAdmin = function ({ navigation }) {

    const [email, setEmail] = useState()
    const [usersFoodList, setUsersFoodList] = useState()

    useFocusEffect(
        React.useCallback(() => {

            (async () => {
                const usersFoodList = await retrieveAllUsersFoodList()
                setUsersFoodList(usersFoodList)

            })()

            return () => {

            }
        }, [])
    )

    const handleOnSendMail = () => {
        try {
            String.validate.notVoid(email)
            Email.validate(email)
            
            
            Alert.alert('SEND EMAIL', 'Are your sure??',
            [
                {
                    text: 'Yes, send!',
                    onPress: async() => {
                        try {
                            await sendFoodList(usersFoodList, email)
                            
                        } catch (error) {
                            Alert.alert(error.message)
                        }
                    }
                },
                {
                    text: 'No, later',
                    style:'cancel'
                }
                
            ])
            } catch (error) {
                Alert.alert('OOPS!!', error.message)
        }
    }


    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => {

                    navigation.goBack()
                }}>
                    <SvgUri style={styles.returnIcon} source={require('../assets/ic-arrow-back-withe.svg')} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Shooping management</Text>
            </View>
            <Text style={styles.titleSend}>SUPPLIER EMAIL</Text>
            <View style={styles.form}>
                <TextInput style={styles.input} onChangeText={(value => setEmail(value))} placeholder="info@supplier.com" placeholderTextColor="#81868e" />
            </View>

            <View style={{ width: '90%', marginTop: 10 }}>
                <ButtonForm buttonAction={handleOnSendMail} text="SEND FOOD LIST" bgColor="#009965" />
            </View>


        </View>
    )
}

export default ShopListAdmin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
        color: 'white',
        fontWeight: '700',
        fontSize: 28,
        marginBottom: 20,
        marginLeft: 20,
        width: 400
    },
    returnIcon: {
        marginBottom: 25,
        marginLeft: 20
    },
    form: {
        width: '90%'
    },
    input: {
        backgroundColor: '#e4e4e4',
        height: 55,
        marginBottom: 20,
        paddingLeft: 10,
        color: 'black'
    },
    textPassword: {
        marginTop: 10,
        marginBottom: 20,
        fontWeight: "bold"
    },
    titleSend: {
        fontWeight: '700',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 20

    }
})