import React from "react";
import { 
  StyleSheet,
  View,
  StatusBar
} from "react-native";
import Modal from "./src/Modal";

const App = () => (
  
  <View style={styles.container}>
  <StatusBar barStyle="dark-content"/>
      <Modal />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
