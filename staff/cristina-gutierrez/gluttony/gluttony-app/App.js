import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "./src/Modal";

export default function App() {
  return (
    <View style={styles.container}>
      <Modal />
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
