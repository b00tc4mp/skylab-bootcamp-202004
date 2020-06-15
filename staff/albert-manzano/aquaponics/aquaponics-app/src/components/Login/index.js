import React, { useState } from 'react';

import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import styles from './styles';

function Login({onLogin}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        onLogin(username,password)
    }

    return (<>
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.text}>Username</Text>
                <View >
                    <SafeAreaView style={styles.input}>
                        <TextInput
                            onChangeText={(username) => setUsername( username)}
                            placeholder="Username"
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
                onPress={(event) => handleLogin(event)}
                style={styles.button}>
                <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    </>)
}

export default Login





