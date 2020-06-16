import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView
} from "react-native";

import EntypoIcon from "react-native-vector-icons/Entypo";

import Navbar from "../Navbar";

import styles from './styles'

function Manager() {
  const [view, setView] = useState('manager')


  const [displayed, setSide] = useState(false);

  const handleSide = () => setSide(!displayed);

  const handleGoToAdd = () => {
    setSide(false)
    setView("register")
    setError(null)
  }

  const handleGoToUsers = () => {
    setView("login")
    setSide(false)
    setError(null)
  }

  return (<>
    <SafeAreaView style={styles.container}>
      <Navbar onDisplaySide={handleSide} />
      {view === 'manager' && (<>
        <View style={styles.rect}>
          <EntypoIcon name="users" style={styles.icon}></EntypoIcon>
          <Text style={styles.usersList}>Users List</Text>
          <EntypoIcon name="add-user" style={styles.icon2}></EntypoIcon>
          <Text style={styles.register}>register</Text>
        </View>
      </>)}
      {view === 'users'}
      {view === 'add'}
    </SafeAreaView>
  </>);
}



export default Manager;
