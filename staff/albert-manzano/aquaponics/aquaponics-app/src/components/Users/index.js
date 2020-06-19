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


import { retrieveAllUsers, confirmUser, revokeUnrevokeUser, updateUser } from 'aquaponics-client-logic'

function Users({ handleGoToback }) {
    // useEffect(() => {

    //     (async()=>{
    //         const users = await retrieveAllUsers

    //     })()

    // },[users])
    let users = [{
       
        role : "user",
        confirmed : false,
        status : "enable",
        
        name : "Marc",
        surname : "Panther",
        email : "Marc2@gmail.com",
       
        phone : 665656565,
      
    },
    {
        role : "user",
        confirmed : false,
        status : "enable",
        
        name : "Marc",
        surname : "Panther",
        email : "Marca@gmail.com",
       
        phone : 665656565,
      
    },
    {
        
        role : "user",
        confirmed : false,
        status : "enable",
        
        name : "Marc",
        surname : "Panther",
        email : "Marc3@gmail.com",
       
        phone : 665656565,
    },
    {
        
        role : "user",
        confirmed : false,
        status : "enable",
        
        name : "Marc",
        surname : "Panther",
        email : "Mar4@gmail.com",
       
        phone : 665656565,
      
    },
    ]
    
    

    return (<>

        <FlatList data={users} keyExtractor={(user) => user.email} renderItem={({ item }) =>
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.data}>
                        {item.name}
                        {item.surname}
                        {item.email}
                        {item.phone}
                </Text>
                    <View style={styles.wrap}>
                        <TouchableOpacity style={styles.boxes} onPress={() => console.log("change")}><Text>{item.status}</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.boxes} onPress={() => console.log("change")}><Text>{item.role}</Text></TouchableOpacity>
                        {!item.confirmed && <TouchableOpacity style={styles.boxes} onPress={() => console.log("change")}><Text>{item.confirmed}</Text></TouchableOpacity>}
                    </View>
                </View>
            </View>
        } />



    </>)
}

export default Users