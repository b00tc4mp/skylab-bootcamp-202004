import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "./src/Modal";
import Home from "./src/Home"

export default function App() {
  return (
    <View>
      <Home />
      <Modal />
    </View>
  )
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFC87",
    alignItems: "center",
    justifyContent: "center",
  },
}); */
