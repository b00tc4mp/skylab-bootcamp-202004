// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View
// } from "react-native";
// import WelcomeScreen from './app/screens/WelcomeScreen'
// import Home from './app/screens/Home'
// import Login from './app/screens/Login'
// import CardDetails from './app/screens/CardDetails'

// export default function App() {
//   return (
//     // <WelcomeScreen />
//     // <Home />
//     // <Login />
//     <CardDetails />
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// })

// In App.js in a new project

// import 'react-native-gesture-handler';
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createCompatNavigatorFactory } from '@react-navigation/compat';
// import Home from './app/screens/Home'
// import CardDetails from './app/screens/CardDetails'


// const RootStack = createCompatNavigatorFactory(createStackNavigator)(
//   {
//     Home: { screen: Home },
//     CardDetail: { screen: CardDetails },
//   },
//   {
//     initialRouteName: 'Home',
//   }
// );

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <RootStack />
//     </NavigationContainer>
//   );
// }

// import React from 'react'
// import { StyleSheet, View } from 'react-native'
// import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import Home from './app/screens/Home'
// import CardDetails from './app/screens/CardDetails'


// const Tab = createMaterialBottomTabNavigator();
// const TopTab = createMaterialTopTabNavigator();

// function MyTabs() {
//   return (
//     // <View style={styles.container}>
//     //   <NavigationContainer>
//     //     <TopTab.Navigator>
//     //       <TopTab.Screen name="Home" component={Home} />
//     //       <TopTab.Screen name="Card Details" component={CardDetails} />
//     //     </TopTab.Navigator>
//     //   </NavigationContainer>

//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={Home} />
//         <Tab.Screen name="Card Details" component={CardDetails} />
//       </Tab.Navigator>
//     </NavigationContainer>
//     // </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   }
// })

// export default function App() {
//   return <MyTabs />
// }

import Home from './app/screens/Home'
import CardDetails from './app/screens/CardDetails'
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from "react-native-vector-icons/FontAwesome";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import Profile from './app/screens/Profile'


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.appheader}>
          <Text style={styles.title}>Escape Me</Text>
          <TouchableOpacity style={styles.logOut}>
            <AntDesign name="logout" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <AppContainer />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  appheader: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#4ecdc4',
  },
  container: {
    flex: 1
  },
  logOut: {
    position: 'absolute',
    right: 20
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  }
})

class NotificationsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text> This is my Notifications screen </Text>
      </View>
    );
  }
}

const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={25} color={tintColor} />
        )
      }
    },
    Search: {
      screen: NotificationsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="search1" size={24} color={tintColor} />)
      }
    },
    Pending: {
      screen: CardDetails,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Entypo name="list" size={24} color={tintColor} />
        )
      }
    },
    Follow: {
      screen: CardDetails,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="adduser" size={24} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" size={25} color={tintColor} />
        )
      }
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#4ecdc4'
    }
  }
);

const AppContainer = createAppContainer(bottomTabNavigator);