import React, { useState } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    Text
} from 'react-native';

import { registerUser, loginUser } from 'aquaponics-client-logic'

import styles from './styles';

import SideIntro from '../SideIntro'
import Login from '../Login'
import Navbar from '../Navbar'
import Register from '../Register'
import Feedback from '../Feedback';

function Landing({ onAuthorized }) {
    const [view, setView] = useState('landing')
    const [displayed, setSide] = useState(false);
    const [error, setError] = useState('')

    const handleSide = () => setSide(!displayed);

    const handleGoToRegister = () => {
        setSide(false)
        setView("register")
        setError(null)
    }

    const handleGoToLogin = () => {
        setView("login")
        setSide(false)
        setError(null)
    }

    const handleLogin = async (email, password) => {
        try {
            setError(null)
            const result = await loginUser(email, password)
            if (result === undefined) onAuthorized()
            else throw new Error('authorization problem, please retry')
        } catch (error) {
            if (error) setError(error)
        }
    }

    const handleRegister = async (name, surname, email, password, _password, phone) => {
        try {
            setError(null)
            const result = await registerUser(name, surname, email, password, _password, phone)
            if (!result) setView('login')
        } catch (error) {
            if (error) setError(error)
        }
    }

    return (<>
        <SafeAreaView style={styles.container}>
            <Navbar onDisplaySide={handleSide} />
            <ImageBackground source={require('../../../assets/images/lettuce1.jpg')} style={styles.image}>
                {view === 'landing' && <Text style={styles.title} >Welcome to Red Rock Aquaponics</Text>}
                {error ? <Feedback message={error.message} level={"error"} />:null}
                {view === 'landing' && (<>
                    {displayed && < SideIntro onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
                </>)}
                {view === 'login' && (<>
                    {/* <Navbar onDisplaySide={handleSide} /> */}
                    <Login error={error} onLogin={handleLogin} />
                    {displayed && <SideIntro onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
                </>)}
                {view === 'register' && (<>
                    {/* <Navbar onDisplaySide={handleSide} /> */}
                    <Register error={error} onRegister={handleRegister} />
                    {displayed && <SideIntro onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
                </>)}
            </ImageBackground>
        </SafeAreaView>
    </>)
}

export default Landing