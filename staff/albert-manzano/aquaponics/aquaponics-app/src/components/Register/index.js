import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView
} from "react-native";

import styles from './styles'
import Feedback from "../Feedback";

function Register({ error, onRegister }) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [_password, setConfirmation] = useState('')


    const handleRegister = (event) => {
        event.preventDefault()
        onRegister(name, surname, email, password, _password)
    }

    return (<>
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Name</Text>
                <View >
                    <SafeAreaView style={styles.input}>
                        <TextInput
                            onChangeText={(name) => setName(name)}
                            placeholder="Name"
                            style={styles.placeholder}
                        ></TextInput>
                    </SafeAreaView>
                </View>
                <Text style={styles.text}>Surname</Text>
                <View>
                    <SafeAreaView style={styles.input}>
                        <TextInput
                            onChangeText={(surname) => setSurname(surname)}
                            placeholder="Surname"
                            style={styles.placeholder}
                        ></TextInput>
                    </SafeAreaView>
                </View>
                <Text style={styles.text}>E-mail</Text>
                <View>
                    <SafeAreaView style={styles.input}>
                        <TextInput
                            onChangeText={(email) => setEmail(email)}
                            placeholder="E-mail"
                            style={styles.placeholder}
                        ></TextInput>
                    </SafeAreaView>
                </View>
                <Text style={styles.text}>Password</Text>
                <View >
                    <SafeAreaView style={styles.input}>
                        <TextInput
                            onChangeText={(password) => setPassword(password)}
                            placeholder="Password"
                            style={styles.placeholder}
                        ></TextInput>
                    </SafeAreaView>
                </View>
                <Text style={styles.text}>Password confirmation</Text>
                <View >
                    <SafeAreaView style={styles.input}>
                        <TextInput
                        required={ /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)(?=.*[#$^+=!*()@%&:]).{8,}/}
                            onChangeText={(_password) => setConfirmation(_password)}
                            placeholder="password confirmation"
                            style={styles.placeholder}
                        ></TextInput>
                    </SafeAreaView>
                </View>
                <TouchableOpacity
                    onPress={handleRegister}
                    style={styles.button}>
                    <Text style={styles.submit}>Submit</Text>
                </TouchableOpacity>
                {error && <Feedback message={error} level={"error"}/>}
            </View>
        </View>
    </>);
}

export default Register

