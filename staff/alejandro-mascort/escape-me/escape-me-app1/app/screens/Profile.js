import React from "react";
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
    Text
} from "react-native";

import UserItem from '../components/UserItem'
import Card from '../components/Card'

import { Entypo, FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';


export default function Profile() {
    return (
        <SafeAreaView style={styles.container} >
            <ScrollView >
                <UserItem name={'Tyler'} surname={'Durden'} email={'fightclub@mail.com'} image={require('../assets/tyler.jpg')} />
                <TouchableOpacity style={styles.edit}>
                    <Entypo name="pencil" size={30} color="white" />
                    <Text style={styles.text}>Edit profile</Text>
                </TouchableOpacity>
                <View style={styles.details}>
                    <TouchableOpacity style={[styles.pair, styles.selected]}>
                        <FontAwesome name="heart" size={24} color={'#fc5c65'} />
                        <Text>Favorite</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.pair}>
                        <MaterialIcons name="done-all" size={24} color="black" />
                        <Text>Done</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.pair}>
                        <Ionicons name="md-contacts" size={24} color="black" />
                        <Text>Following</Text>
                    </TouchableOpacity>
                </View>
                <Card title="Whitechapel" rating="4.9" people='2-6' genre='Terror' price="50-90€" image={require('../assets/whitechapel.jpg')} />
                <Card title="Whitechapel" rating="4.9" people='2-6' genre='Terror' price="50-90€" image={require('../assets/whitechapel.jpg')} />
                <Card title="Whitechapel" rating="4.9" people='2-6' genre='Terror' price="50-90€" image={require('../assets/whitechapel.jpg')} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        backgroundColor: '#f8f4f4',
        paddingTop: 30
    },
    details: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    edit: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fc5c65',
        padding: 10,
        borderRadius: 20
    },
    pair: {
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 20,
        borderWidth: 5,
        padding: 10,
        borderColor: '#4ecdc4'
    },
    selected: {
        borderColor: '#fc5c65'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24
    }
});