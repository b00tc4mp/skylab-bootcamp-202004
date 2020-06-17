import React from "react";
import { 
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";
import Modal from "./src/Modal";

const App = () => (
  <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    style={styles.container}
  >
    <View style={styles.container}>
      <Modal />
    </View>
  </KeyboardAvoidingView>
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
