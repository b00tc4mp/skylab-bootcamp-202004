import React, { useState } from "react";
import {
  StyleSheet,
  View
} from "react-native";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Remote debugger"]);

import WelcomeScreen from './app/screens/WelcomeScreen'
import Home from './app/screens/Home'
import Login from './app/screens/Login'
import CardDetails from './app/screens/CardDetails'

export default function App() {
  return (
    // <WelcomeScreen />
    // <Home />
    // <Login />
    <CardDetails />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});