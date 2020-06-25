import React from 'react';
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
        <TouchableOpacity onPress={() => handleOnPress()}>
          <Image source={require('../../../assets/images/hamburger.png')} style={styles.hamburguer} />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>

  </>)
}

export default Navbar