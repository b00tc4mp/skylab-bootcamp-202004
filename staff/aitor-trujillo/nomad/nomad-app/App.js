import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'

import Landing from './app/screens/LandingScreen'
import Login from './app/screens/LoginScreen'
import Register from './app/screens/RegisterScreen'
import EditWorkspaceScreen from './app/screens/EditWorkspaceScreen'
import Home from './app/screens/HomeScreen'
import Profile from './app/screens/ProfileScreen'
import Card from './app/components/Card'
import AppTextInput from './app/components/AppTextInput'
import AppPicker from './app/components/AppPicker'
import AppButton from './app/components/Button'
import ListingPage from './app/screens/WorkspacePage'
import Review from './app/components/Review'
import ImageInput from './app/components/ImageInput';
import WorkspacePage from './app/screens/WorkspacePage';
import Favorites from './app/screens/FavoritesScreen';
import colors from './app/styles/colors'


const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator screenOptions={{
    headerShown: false
  }} >
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Home" component={TabNavigator} />
  </Stack.Navigator>
)

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator tabBarOptions={{
    showLabel: false,
    activeTintColor: '#1c1c1c',
    style: {
      // alignSelf: 'center',
      width: '70%',
      position: 'absolute',
      left: '15%',
      right: '15%',
      shadowOpacity: 0.5,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      // blurRadius: 90
    },

  }}>
    <Tab.Screen name="Home" component={MainNavigator}
      options={{
        tabBarIcon: ({ color }) =>
          (< MaterialCommunityIcons name="earth" size={30} color={color} />)
      }} />
    <Tab.Screen name="Favorites" component={Favorites}
      options={{
        tabBarIcon: ({ color }) =>
          (< MaterialCommunityIcons name="bookmark" size={30} color={color} />)
      }} />
    <Tab.Screen name="Profile" component={ProfileNavigator}
      options={{
        tabBarIcon: ({ color }) =>
          (< MaterialCommunityIcons name="account" size={30} color={color} />),
      }}
    />
  </Tab.Navigator>
)

const MainNavigator = () => (
  <Stack.Navigator screenOptions={{
    headerShown: false
  }} mode='modal'>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="WorkspacePage" component={WorkspacePage} />
  </Stack.Navigator>
)
const ProfileNavigator = () => (
  <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="WorkspaceEditor" component={EditWorkspaceScreen} />
  </Stack.Navigator>
)


export default function App() {
  const [imageUri, setImageUri] = useState()


  return (
    // <NavigationContainer >
    //   <Stack.Screen name="Landing" component={Landing} />
    //   <Stack.Screen name="Register" component={Register} />
    //   <Stack.Screen name="Login" component={Login} />
    //   <Stack.Screen name="Home" component={Home} />
    <NavigationContainer >
      {/* <View style={styles.container}> */}
      {/* <EditWorkspaceScreen /> */}
      <StackNavigator />
      {/* </View> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',

    // overflow: ''
  },
  // container: {
  //   backgroundColor: 'white',
  //   height: '100%',
  //   padding: 20,
  //   paddingTop: 100,
  // },
});