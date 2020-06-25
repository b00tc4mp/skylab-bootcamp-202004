import React, { useState, useEffect } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    AsyncStorage,
} from "react-native";

import styles from './styles'

import { getIdFromToken } from '../../../../aquaponics-commons/utils'
import { retrieveAllUsers, updateUser, revokeUnrevokeUser, confirmUser, retrieveUser } from 'aquaponics-client-logic'

function Users({ handleGoToBack }) {
    const [listOfUsers, setUser] = useState([])
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        try {
            (async () => {
               
                const { email } = await retrieveUser()
                const users = await retrieveAllUsers()
                const listOfUsers = users.filter(user => user.email!==email)
                setUser(listOfUsers)
                setEmail(email)
            })()
        } catch (error) {
            if (error) setError(error.message)
        }
    }, [])

    const handleStatus = (id) => {
        try {
            (async () => {
                revokeUnrevokeUser(id)
                const users = await retrieveAllUsers()
                const listOfUsers = users.filter(user => user.email!==email)
                setUser(listOfUsers)
            })()
        } catch (error) {
            if (error) setError(error.message)
        }
    }

    const handleConfirm = (id) => {

        try {
            (async () => {
                confirmUser(id)
                const users = await retrieveAllUsers()
                const listOfUsers = users.filter(user => user.email!==email)
                setUser(listOfUsers)
            })()

        } catch (error) {
            if (error) setError(error.message)
        }
    }

    const handleRole = (id, role) => {
        try {
            (async () => {
                updateUser(id, { role: role === "admin" ? 'user' : "admin" })
                const users = await retrieveAllUsers()
                const listOfUsers = users.filter(user => user.email!==email)
                setUser(listOfUsers)
            })()

        } catch (error) {
            if (error) setError(error.message)
        }
    }

    return (<>
        <View>
            <TouchableOpacity
                onPress={handleGoToBack}>
                <Image source={require('../../../assets/images/arrow.png')} style={styles.arrow} />
            </TouchableOpacity>

            {listOfUsers && <FlatList data={listOfUsers} keyExtractor={(users) => users.id} renderItem={({ item }) =>
                <View style={styles.container}>
                    <Text >Name : {item.name}</Text>
                    <Text >Surname : {item.surname}</Text>
                    <Text >E-mail : {item.email}</Text>
                    <Text >Phone : {item.phone}</Text>
                    <View style={styles.wrap}>
                        <TouchableOpacity style={styles.boxes} onPress={() => handleStatus(item.id, item.status)}><Text>{item.status}</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.boxes} onPress={() => handleRole(item.id, item.role)}><Text>{item.role}</Text></TouchableOpacity>
                        {!item.confirmed && <TouchableOpacity style={styles.boxes} onPress={() => handleConfirm(item.id, item.confirmed)}><Text>confirm</Text></TouchableOpacity>}
                    </View>
                </View>

            } />}

        </View>
    </>)
}

export default Users