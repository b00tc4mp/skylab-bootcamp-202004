import React, { useState } from 'react';

import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import Feedback from "../Feedback";

import styles from './styles';

function Login({error,onLogin}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        onLogin(email,password)
    }

    return (<>
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.text}>email</Text>
                <View >
                    <SafeAreaView style={styles.input}>
                        <TextInput
                            onChangeText={(email) => setEmail( email)}
                            placeholder="E-mail"
                            style={styles.placeholder}
                        ></TextInput>
                    </SafeAreaView>
                </View>
            </View>
            <View>
                <Text style={styles.text}>Password</Text>
                <View >
                    <SafeAreaView style={styles.input}>
                        <TextInput
                            onChangeText={(password) => setPassword( password)}
                            secureTextEntry={true}
                            placeholder="Password"
                            style={styles.placeholder}
                        ></TextInput>
                    </SafeAreaView>
                </View>
            </View>
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}>
                <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
            {error && <Feedback message={error.message} level={"error"} />}
        </SafeAreaView>
    </>)
}

export default Login





