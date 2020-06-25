import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Image,
    ScrollView,
} from "react-native";

import styles from './styles';
import Feedback from "../Feedback";

import {registerUser} from 'aquaponics-client-logic';


function Add({ handleGoToBack }) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [_password, setConfirmation] = useState('')
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleRegister = (name, surname, email, password, _password, phone, role) => {
        (async () => {
            try {
                setError(null)
                setSuccess(null)
                const result = await registerUser(name, surname, email, password, _password, phone, role)
                if (!result) setSuccess('User was correctly registered')
            } catch ({message}) {
                setError(message)
            }
        })()
    }

    return (<>
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.wrap}>
                <View>
                    <Text style={styles.text}>Name</Text>
                    <View >
                        <SafeAreaView style={styles.input}>
                            <TextInput
                                onChangeText={name => setName(name)}
                                placeholder="Name"
                                style={styles.placeholder}
                            ></TextInput>
                        </SafeAreaView>
                    </View>
                    <Text style={styles.text}>Surname</Text>
                    <View>
                        <SafeAreaView style={styles.input}>
                            <TextInput
                                onChangeText={surname => setSurname(surname)}
                                placeholder="Surname"
                                style={styles.placeholder}
                            ></TextInput>
                        </SafeAreaView>
                    </View>
                    <Text style={styles.text}>E-mail</Text>
                    <View>
                        <SafeAreaView style={styles.input}>
                            <TextInput
                                onChangeText={email => setEmail(email)}
                                placeholder="E-mail"
                                style={styles.placeholder}
                            ></TextInput>
                        </SafeAreaView>
                    </View>
                    <Text style={styles.text}>Role</Text>
                    <View>
                        <SafeAreaView style={styles.input}>
                            <TextInput
                                onChangeText={role => setRole(role)}
                                placeholder="user or admin"
                                style={styles.placeholder}
                            ></TextInput>
                        </SafeAreaView>
                    </View>
                    <Text style={styles.text}>Password</Text>
                    <View >
                        <SafeAreaView style={styles.input}>
                            <TextInput
                                onChangeText={password => setPassword(password)}
                                placeholder="Password"
                                secureTextEntry={true}
                                style={styles.placeholder}
                            ></TextInput>
                        </SafeAreaView>
                    </View>
                    <Text style={styles.text}>Password confirmation</Text>
                    <View >
                        <SafeAreaView style={styles.input}>
                            <TextInput
                                onChangeText={_password => setConfirmation(_password)}
                                placeholder="password "
                                secureTextEntry={true}
                                style={styles.placeholder}
                            ></TextInput>
                        </SafeAreaView>
                    </View>
                    <Text style={styles.text}>Phone number</Text>
                    <View >
                        <SafeAreaView style={styles.input}>
                            <TextInput
                                keyboardType={"numeric"}
                                onChangeText={phone => setPhone(phone)}
                                placeholder="phone number "
                                style={styles.placeholder}
                            ></TextInput>
                        </SafeAreaView>
                    </View>
                    <TouchableOpacity
                        onPress={() =>{
                            handleRegister(name, surname, email, password, _password, phone, role)
                        }} 
                        style={styles.button}>
                        <Text style={styles.submit}>Submit</Text>
                    </TouchableOpacity>
                    {error ? <Feedback message={error}  level={"error"} />: null}
                    {success ? <Feedback message={success} level={"success"} /> : null}
                </View>
                <TouchableOpacity
                    onPress={handleGoToBack}>
                    <Image source={require('../../../assets/images/arrow.png')} style={styles.arrow} />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    </>);
}

export default Add

