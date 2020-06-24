import React, { useState, useEffect, } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Text, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import SvgUri from "expo-svg-uri"
import HeaderHome from './HeaderHome'
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
                    <SvgUri width='50' height='50' source={require('../assets/btn-send.svg')} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 0.2,
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
    },
    chat: {
        height: 80,
        width: '100%',
        backgroundColor: '#c4c4c4',
        justifyContent: 'center',
        flexDirection: 'row', justifyContent: 'space-between'
    },
    input: {
        backgroundColor: 'white',
        height: 55,
        width: '80%',
        marginTop: 12,
        marginLeft: 12,
        borderRadius: 25,
        paddingLeft: 20,
        color: 'black'
    },
    messages: {
        flex: 1,
        backgroundColor: 'white'
    },
    messageContainer: {
        alignSelf: 'flex-start',
        marginBottom: 15,
        marginTop: 5,
        marginLeft: 20,
        marginRight: 40,
        backgroundColor: '#f1f1f1',
        alignItems: 'flex-start',
        padding: (10, 10, 10, 10),
        borderRadius: 15,
    },
    hour: {
        color: '#c4c4c4',
        fontSize: 10
    },
    message: {
        color: 'black',
        fontSize: 15
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        width: 150
    },
    send: {
        justifyContent: 'center',
        marginRight: 10
    },
    messageContainerCurrentUser: {
        alignSelf: 'flex-end',
        marginBottom: 15,
        marginTop: 5,
        marginLeft: 40,
        marginRight: 20,
        backgroundColor: '#ffedad',

        alignItems: 'flex-start',
        padding: (10, 10, 10, 10),
        borderRadius: 15,
    },
    hourCurrentUser: {
        color: '#c4c4c4',
        fontSize: 10
    },
    messageCurrentUser: {
        color: 'black',
        fontSize: 15
    },
    nameCurrentUser: {
        fontSize: 15,
        fontWeight: '700',
        width: 150
    },
})