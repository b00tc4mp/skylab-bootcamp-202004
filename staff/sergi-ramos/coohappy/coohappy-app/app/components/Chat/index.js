import React, { useState, useEffect, } from 'react';
import { TextInput, TouchableOpacity, View, Text, Alert } from 'react-native'
import styles from './styles'
import { useFocusEffect } from '@react-navigation/native'
import SvgUri from "expo-svg-uri"
import HeaderHome from '../HeaderHome'
import { sendMessage, retrieveMessage, retrieveUser, retrieveCohousing } from 'coohappy-client-logic'
import getNow from 'coohappy-client-logic/helpers/getNow'
import { FlatList } from 'react-native-gesture-handler';

const Chat = function ({ navigation }) {

    const [messages, setMessages] = useState([])
    const [singleMessage, setSingleMessage] = useState()
    const [userId, setUserId] = useState()
    const [cohousing, setCohousing] = useState()

    let interval
    let textInputRef
    
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

    useFocusEffect(
        React.useCallback(() => {
            interval = setInterval(async () => {

                const _messages = await retrieveMessage()
                setMessages(_messages.messages.reverse())
                const cohousing = await retrieveCohousing()
                setCohousing(cohousing)
            }, 2000)

            return () => {
                clearInterval(interval)
            }
        }, [])
    )


    useEffect(() => {
        textInputRef.clear();
    }, [messages.length])

    useEffect(() => {
        (async () => {

            const user = await retrieveUser()
            setUserId(user.id)
            const cohousing = await retrieveCohousing()
            setCohousing(cohousing)

            const _messages = await retrieveMessage()
            setMessages(_messages.messages.reverse())
        })()
    }, [])

    function handleOnSubmitSendMessage() {

        try {

            (async () => {
                const date = getNow()


                await sendMessage(singleMessage, date)
                const _messages = await retrieveMessage()
                setMessages(_messages.messages.reverse())

            })()

        } catch (error) {
            Alert.alert('OOPS!!', error.message)
        }
    }

    return (

        <View style={styles.container}>

            <HeaderHome navigation={navigation} cohousingInfo={cohousing} />

            <View style={styles.messages}>

                <FlatList
                    data={messages}
                    inverted={true}
                    renderItem={({ item }) =>
                        <>
                            {userId === item.userId._id ?

                                <View style={styles.messageContainerCurrentUser}>
                                    <Text style={styles.hourCurrentUser}><Text numberOfLines={3} style={styles.messageCurrentUser}>{item.message + '  '}</Text>{item.date.hour}</Text>
                                </View> :

                                <View style={styles.messageContainer}>
                                    <Text style={styles.name}>{item.userId.name + ' ' + item.userId.surname}</Text>
                                    <Text style={styles.hour}><Text numberOfLines={3} style={styles.message}>{item.message + '  '}</Text>{item.date.hour}</Text>
                                </View>
                            }
                        </>
                    } />

            </View>
            <View style={styles.chat}>

                <TextInput ref={ref => textInputRef = ref}  onChangeText={(value) => setSingleMessage(value)} style={styles.input} placeholder="Say something to your neighbors" placeholderTextColor="#81868e" />

                <TouchableOpacity activeOpacity={0.2} style={styles.send} onPress={() => handleOnSubmitSendMessage()}>
                    <SvgUri width='50' height='50' source={require('../../assets/btn-send.svg')} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Chat

