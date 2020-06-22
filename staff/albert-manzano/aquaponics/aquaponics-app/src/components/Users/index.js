import React, { useState, useEffect } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Image,
    FlatList,

} from "react-native";

import styles from './styles'
import Feedback from "../Feedback";


import { retrieveAllUsers, updateUser } from 'aquaponics-client-logic'

function Users({ handleGoToBack }) {
    const [users, setUser ] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        try{
            (async () => {
                const users = await retrieveAllUsers()
                return setUser(users)
            })()
        }catch(error){
            if (error) setError(error.message)
        }
    }, [users.length])

    const handleStatus = (id,status) => {
        try {
            (async () => {
                updateUser(id,status)
            })()
        } catch (error) {
            if (error) setError(error.message)
        }
    }

    const handleConfirm = (id,confirmed) => {
        try {
            (async () => {
                updateUser(id,{confirmed})
            })()

        } catch (error) {
            if (error) setError(error.message)
        }
    }

    const handleRole = (id,role) => {
        try {
            (async () => {
                updateUser(id,role)
            })()

        } catch (error) {
            if (error) setError(error.message)
        }
    }

    // const users = [{"role":"admin","confirmed":true,"status":"enable","events":[],"name":"Albert","surname":"Manzano","email":"vetu87@gmail.com","phone":699674074,"__v":0,"id":"5ee86cb82639313bf1398c2e"},{"role":"user","confirmed":false,"status":"enable","events":[],"name":"Alex","surname":"Park","email":"alexpark@gmail.com","phone":65665655998,"__v":0,"id":"5ee8a1aa31f15b6bfa274c7c"},{"role":"user","confirmed":false,"status":"enable","events":[],"name":"Albert","surname":"Manzano","email":"vetu@gmail.com","phone":6666777555,"__v":0,"id":"5ee8c13d78754c0c12bbc923"},{"role":"user","confirmed":false,"status":"enable","events":[],"name":"Marc","surname":"Panther","email":"Marc@gmail.com","phone":665656565,"__v":0,"id":"5ee9dd0a73541c137df71afd"},{"role":"user","confirmed":false,"status":"enable","events":[],"name":"Albert","surname":"Manzano","email":"vetu90@gmail.com","phone":699674074,"__v":0,"id":"5eeba0d6a710af5a0a14fc7e"},{"role":"user","confirmed":false,"status":"enable","events":[],"name":"Albert","surname":"Ssss","email":"Ahshshs@gmail.com","phone":64645545454,"__v":0,"id":"5eebaa66a710af5a0a14fc7f"},{"role":"user","confirmed":false,"status":"enable","events":[],"name":"Lisandro","surname":"Bartoli","email":"Lisandro@gmail.com","phone":64996785,"__v":0,"id":"5eec5f825d13b612092ed475"},{"role":"user","confirmed":false,"status":"enable","events":[],"name":"Lisandro","surname":"Bartoli","email":"Lisandro1@gmail.com","phone":8878787878,"__v":0,"id":"5eec6bf25d13b612092ed476"},{"role":"user","confirmed":false,"status":"enable","events":[],"name":"Lisandro","surname":"Bartoli","email":"Lisandro2@gmail.com","phone":8878787878,"__v":0,"id":"5eec6c575d13b612092ed477"},{"role":"user","confirmed":false,"status":"enable","events":[],"name":"Alex","surname":"Park","email":"Park@gmail.com","phone":55455454,"__v":0,"id":"5eec6c965d13b612092ed478"},{"role":"user","confirmed":false,"status":"enable","events":[],"name":"Alex","surname":"Park","email":"Park1@gmail.com","phone":58888888,"__v":0,"id":"5eec6ccc5d13b612092ed479"},{"role":"user","confirmed":false,"status":"enable","events":[],"name":"Alex","surname":"Park","email":"Park2@gmail.com","phone":58888888,"__v":0,"id":"5eec6d065d13b612092ed47a"},{"role":"user","confirmed":false,"status":"enable","events":[],"name":"Alex","surname":"Park","email":"Park4@gmail.com","phone":58888888,"__v":0,"id":"5eec6d315d13b612092ed47b"},{"role":"user","confirmed":false,"status":"enable","events":[],"name":"Alex","surname":"Park","email":"Park6@gmail.com","phone":58888888,"__v":0,"id":"5eec6d6c5d13b612092ed47c"},{"role":"user","confirmed":false,"status":"enable","events":[],"name":"Gorge","surname":"Genove","email":"Gorge@gmail.com","phone":656565,"__v":0,"id":"5ef05e3f73cfac165a4e3d43"}]


    return (<>
        <View>
            <TouchableOpacity
                onPress={handleGoToBack}>
                <Image source={require('../../../assets/images/arrow.png')} style={styles.arrow} />
            </TouchableOpacity>
            {users &&<FlatList data={users} keyExtractor={(users) => users.id} renderItem={({ item }) =>
                <View style={styles.container}>
                    <View style={styles.item}>
                        <Text >Name : {item.name}</Text>
                        <Text >Surname : {item.surname}</Text>
                        <Text >E-mail : {item.email}</Text>
                        <Text >Phone : {item.phone}</Text>
                        <View style={styles.wrap}>
                            <TouchableOpacity style={styles.status} onPress={() => handleStatus(user.id,item.status)}><Text>{item.status}</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.enable} onPress={() => handleRole(users.id,item.role)}><Text>{item.role}</Text></TouchableOpacity>
                            {!item.confirmed && <TouchableOpacity style={styles.boxes} onPress={() =>  handleConfirm(item.id,item.confirmed)}><Text>confirm</Text></TouchableOpacity>}
                        </View>
                    </View>

                </View>
            } />}

        </View>



    </>)
}

export default Users