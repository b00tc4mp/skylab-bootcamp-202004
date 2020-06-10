import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';



const bgImage = require('../assets/background.jpg')

const handleLogin = () => {
  console.log('login')
}
const handleRegister = () => {
  console.log('register')
}

export default () => {
  return (
    <ImageBackground source={bgImage} style={styles.bgImage} >
      <SafeAreaView style={styles.container} >
        <View styles={styles.overlay}>

          <Text style={
            {
              // "fontFamily": "Montserrat",
              "fontWeight": "bold",
              "fontSize": 36,
              "letterSpacing": 10,
              "textAlign": "center",
              "color": "rgba(255, 255, 255, 255)",
              // "marginStart": 40
            }
          } > nomad </Text>
          <Text style={
            {
              // "fontFamily": "Montserrat",
              "fontWeight": "bold",
              "fontSize": 50,
              "letterSpacing": 3,
              "textAlign": "center",
              "color": "rgba(255, 255, 255, 255)",
              // "marginStart": 45,
              "marginTop": 86
            }
          } > Work{"\n"}Share{"\n"}Travel</Text>
          <Text style={
            {
              // "fontFamily": "Montserrat",
              "fontSize": 14,
              "textAlign": "center",
              "color": "rgba(255, 255, 255, 255)",
              "marginStart": 6,
              "marginTop": 86,
              "opacity": 0.9
            }
          } > Find your next workspace, share your{"\n"} work with people like you, go beyond{"\n"} geographical limits. </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button1} onPress={handleRegister}>
              <Text style={styles.darkText} >Sign up, it’ s free</Text >
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={handleLogin}>
              <Text style={styles.darkText} >Sign in</Text >
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
    alignItems: "flex-start",
    alignItems: "center",
    justifyContent: 'center',
    // flexDirection: "column",
    // paddingStart: 45,
    // paddingTop: 46,
    flex: 1

  },
  slogan: {

  },
  button1: {
    marginTop: 200,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(17, 16, 21, 255)",
    opacity: 0.89,
    width: 286,
    height: 50,
    padding: 10,
    borderRadius: 25,
    backgroundColor: "#FFF4E3",

  },
  button2: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(17, 16, 21, 255)",
    opacity: 0.89,
    width: 286,
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