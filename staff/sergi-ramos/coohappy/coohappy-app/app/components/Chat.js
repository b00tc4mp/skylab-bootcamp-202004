import React from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native'
import SvgUri from "expo-svg-uri"
import HeaderHome from './HeaderHome'

const Chat = function ({ route, navigation }) {


    


    return (

        <View style={styles.container}>

            <HeaderHome   />

            <View style={styles.messages}>
                <ScrollView>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxkljkljvcxvcxvvcx</Text>
                    <Text>lordxcxvckjkljxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvkjljljcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvckljkljxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvckljkljxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvclkjkljxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvkljcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvclkjkljxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvkljcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvckljlkjxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxkljkljvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                    <Text>lordxcxvcxvcxvvcx</Text>
                </ScrollView>
            </View>
            <View style={styles.chat}>

                <TextInput style={styles.input} placeholder="Say something to your neighbors" placeholderTextColor="#81868e" />
            </View>


        </View>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
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
        flex: 0.15,
        width: '100%',
        backgroundColor: '#c4c4c4',
        justifyContent: 'center'
    },
    input: {
        backgroundColor: 'white',
        height: 55,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 25,
        paddingLeft: 25,
        color: 'black'
    },
    messages: {
        flex: 1,
        height: 400
    }
})