import React from "react";
import { StyleSheet, View, Text } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Navbar from "../Navbar";



function Manager() {
  return (
    <View style={styles.container}>
      <Navbar/>
      <View style={styles.rect}>
        <EntypoIcon name="users" style={styles.icon}></EntypoIcon>
        <Text style={styles.usersList}>Users List</Text>
        <EntypoIcon name="add-user" style={styles.icon2}></EntypoIcon>
        <Text style={styles.register}>register</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navbar: {
    height: 100,
    width: 494,
    marginLeft: -41
  },
  rect: {
    width: 400,
    height: 800,
    backgroundColor: "rgba(196,196,196,1)"
  },

  icon: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
    height: 44,
    width: 40,
    marginTop: 118,
    marginLeft: 178
  },
  usersList: {
   
    color: "#121212",
    marginTop: 34,
    marginLeft: 157
  },
  icon2: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
    height: 44,
    width: 40,
    marginTop: 122,
    marginLeft: 186
  },
  register: {
   
    color: "#121212",
    marginTop: 17,
    marginLeft: 164
  }
});

export default Manager;
