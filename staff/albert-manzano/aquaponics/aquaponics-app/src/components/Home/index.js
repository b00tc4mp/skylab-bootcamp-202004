import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
  
} from 'react-native';

import styles from './styles';

import {  SideBar,Navbar } from '../index';

function Home() {
  
    const [displayed, setSide] = useState(false);

    const handleSide = () => setSide(!displayed);

    return (<>
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/images/lettuce1.jpg')} style={styles.image}>
            <Navbar onDisplaySide={handleSide} />
            {displayed && <SideBar />}
            </ImageBackground>
        </View>
    </>)
}

export default Home