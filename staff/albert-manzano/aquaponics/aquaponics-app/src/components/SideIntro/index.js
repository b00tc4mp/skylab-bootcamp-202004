import React from 'react'
import {
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    Image
} from 'react-native'

import styles from './styles'

function SideIntro({ onGoToLogin, onGoToRegister }) {

    const handleGoToLogin = () => {
        onGoToLogin()
    }
    const handleGoToRegister = () => {
        onGoToRegister()
    }

    return (<>
        <View style={styles.container}>
            <View>
                <Text style={styles.textRegister}> Register</Text>
                <TouchableOpacity onPress={() =>handleGoToRegister()}>
                    <Image source={require('../../../assets/images/register.png')} style={styles.iconRegister} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.textLogin}> Login </Text>
                <TouchableOpacity onPress={() => handleGoToLogin()}>
                    <Image source={require('../../../assets/images/login.png')} style={styles.iconLogin} />
                </TouchableOpacity>
            </View>
        </View>
    </>)
}

export default SideIntro