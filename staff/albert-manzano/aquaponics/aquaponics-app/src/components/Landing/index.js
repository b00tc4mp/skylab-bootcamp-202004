import React, { useState } from 'react';
import {
    ImageBackground,
    SafeAreaView
} from 'react-native';

import styles from './styles';

import { SideIntro, Login, Navbar, Register } from '../index';

function Landing({error, onLogin,onRegister}) {
    const [view, setView] = useState('landing')
    const [displayed, setSide] = useState(false);

    const handleSide = () => setSide(!displayed);

    const handleGoToRegister = () => {
        setSide(false)
        setView("register")
    }

    const handleGoToLogin = () => {
        setView("login")
        setSide(false)
    }

    return (<>
        <SafeAreaView style={styles.container}>
            <Navbar onDisplaySide={handleSide} />
            <ImageBackground source={require('../../../assets/images/lettuce1.jpg')} style={styles.image}>
                {view === 'landing' && (<>
                    {displayed && < SideIntro onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
                </>)}
                {view === 'login' && (<>
                    {/* <Navbar onDisplaySide={handleSide} /> */}
                    <Login onLogin={onLogin}/>
                    {displayed && <SideIntro onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
                </>)}
                {view === 'register' && (<>
                    {/* <Navbar onDisplaySide={handleSide} /> */}
                    <Register error={error} onRegister={onRegister}/>
                    {displayed && <SideIntro onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
                </>)}
            </ImageBackground>
        </SafeAreaView>
    </>)
}

export default Landing