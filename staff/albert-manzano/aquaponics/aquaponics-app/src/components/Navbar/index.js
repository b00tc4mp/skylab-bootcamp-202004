import React, { useState } from 'react';
import { Image, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './styles';


function Navbar({ onDisplaySide }) {

  const handleOnPress = () => {
    onDisplaySide()
  }
  
  return (<>
    <SafeAreaView style={styles.container}>
      <SafeAreaView >
        <Image source={require('../../../assets/images/logo.jpg')} style={styles.logo}>
        </Image>
      </SafeAreaView>
      <SafeAreaView >
        {/* {name &&<Image source={require('../../../assets/images/registered.png')} style={styles.user}/>} */}
        <TouchableOpacity onPress={() => handleOnPress()}>
          <Image source={require('../../../assets/images/hamburger.png')} style={styles.hamburguer} />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>

  </>)
}

export default Navbar