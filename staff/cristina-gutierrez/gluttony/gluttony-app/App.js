import React from "react";
import { 
  StyleSheet,
  View,
  StatusBar
} from "react-native";
import Modal from "./src/Modal";
import Map from './src/Map';

const App = () => {
  return (
    <View style={styles.container}>
    <StatusBar barStyle="dark-content"/>
        {/*<Modal />*/}
        <Map />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
