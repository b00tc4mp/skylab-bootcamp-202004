import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, AsyncStorage, Alert } from 'react-native'
import styles from './styles'
import SvgUri from "expo-svg-uri"
import ButtonForm from '../ButtonForm'
import { retrieveUser, updateUser } from 'coohappy-client-logic'
import confirmPassword from 'coohappy-client-logic/helpers/confirmPassword'

const UpdateUser = function ({ navigation, setName: _setName }) {

    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [email, setEmail] = useState()
    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()


    useEffect(() => {

        try {
            (async () => {
                const { name, surname, email } = await retrieveUser()
                setName(name)
                setSurname(surname)
                setEmail(email)
            })()

        } catch (error) {
            Alert.alert('OOPS', error.message)
        }
    }, [])

    const handleOnUpdateUser = async () => {

        try {
            if (newPassword) {
                confirmPassword(newPassword, passwordConfirm)
            }
            await updateUser({ name, surname, email, oldPassword, newPassword })
            Alert.alert('DONE!', 'User update correctly')
        } catch (error) {
            Alert.alert('OOPS', error.message)
        }

        const { name: _name } = await retrieveUser()

        _setName(_name)
    }

    const handleOnLogout = async () => {

        navigation.navigate('Landing')
        await AsyncStorage.clear()
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => {

                    navigation.goBack()
                }}>
                    <SvgUri style={styles.returnIcon} source={require('../../assets/ic-arrow-back-yellow.svg')} />
                </TouchableOpacity>
                <Text style={styles.titleText}>{name} {surname}</Text>
            </View>

            <View style={styles.form}>
                <TextInput style={styles.input} onChangeText={(value => setName(value))} defaultValue={name} placeholder="name" placeholderTextColor="#81868e" />
                <TextInput style={styles.input} onChangeText={(value => setSurname(value))} defaultValue={surname} placeholder="surname" placeholderTextColor="#81868e" />
                <TextInput style={styles.input} onChangeText={(value => setEmail(value))} defaultValue={email} placeholder="email" placeholderTextColor="#81868e" />
                <Text style={styles.textPassword}>CHANGE PASSWORD</Text>
                <TextInput style={styles.input} onChangeText={(value) => setOldPassword(value)} secureTextEntry={true} placeholder="current password" placeholderTextColor="#81868e" />
                <TextInput style={styles.input} onChangeText={(value) => setNewPassword(value)} secureTextEntry={true} placeholder="new password" placeholderTextColor="#81868e" />
                <TextInput style={styles.input} onChangeText={(value) => setPasswordConfirm(value)} secureTextEntry={true} placeholder="confirm new password" placeholderTextColor="#81868e" />
            </View>

            <View style={{ width: '90%', marginTop: 10 }}>
                <ButtonForm text="SAVE CHANGES" bgColor="#009965" buttonAction={handleOnUpdateUser} />
            </View>

            <View style={{ width: '90%', marginTop: 30 }} >
                <ButtonForm text='LOGOUT' buttonAction={handleOnLogout} bgColor="#003725" />
            </View>

        </View>
    )
}

export default UpdateUser

