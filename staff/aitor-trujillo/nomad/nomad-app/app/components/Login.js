import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Button,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    ViewComponent
} from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form
const User = t.struct({
    email: t.String,
    password: t.String
})
const options = {
    fields: {
        email: {
            error: 'Dude enter your email at least'
        },
        password: {
            error: 'Oops, wrong password'
        },
    },
};


const bgImage = require('../assets/background.jpg')

const handleLogin = () => {
    const value = this._form.getValue();
    if (value)
        console.log('registering:', value)
}

export default () => {
    return (
        <ImageBackground source={bgImage} style={styles.bgImage} >
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={
                        {
                            // "fontFamily": "Montserrat",
                            "marginTop": 20,
                            "fontWeight": "bold",
                            "fontSize": 36,
                            "letterSpacing": 20,
                            "textAlign": "center",
                            "color": "rgba(255, 255, 255, 255)",
                            // "marginStart": 40
                        }
                    } > nomad </Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <Text style={
                            {
                                // "fontFamily": "Montserrat",
                                "fontWeight": "bold",
                                "fontSize": 36,
                                "textAlign": "center",
                                "color": "black",
                                // "marginStart": 40
                            }
                        } >Sign in</Text>
                        <Form ref={c => this._form = c} options={options} type={User} />
                        <TouchableOpacity style={styles.button2} onPress={handleLogin}>
                            <Text style={styles.lightText} >Sign in</Text >
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View>
      </View> */}
            </SafeAreaView >
        </ImageBackground>

    );

};
const styles = StyleSheet.create({
    container: {
        // alignItems: "space-between",
        // alignItems: "center",
        // justifyContent: 'space-between',
        // width: '100%',

        // flexDirection: "column",
        // paddingStart: 45,
        // paddingTop: 46,
        justifyContent: 'center',
        flex: 1

    },
    formContainer: {

        alignSelf: 'center',
        width: '90%',
        height: 350,
        padding: 30,
        borderRadius: 25,
        backgroundColor: "white"
    },
    button2: {
        alignSelf: 'center',
        marginTop: 20,
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(17, 16, 21, 255)",
        opacity: 0.89,
        width: 250,
        height: 50,
        padding: 10,
        borderRadius: 25,
        backgroundColor: "#5D5D5A"
        ,
        zIndex: 0

    },
    lightText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14
    },
    darkText: {
        color: "#1c1c1c",
        fontWeight: "bold",
        fontSize: 14
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        backgroundColor: 'red',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
        // opacity: 0.1
    },
    overlay: {
        opacity: 0.1
    }
})