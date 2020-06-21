import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage';

import Landing from './app/screens/LandingScreen'
import Login from './app/screens/LoginScreen'
import Register from './app/screens/RegisterScreen'
import ManageWorkspaceScreen from './app/screens/ManageWorkspaceScreen'
import ManageReviewsScreen from './app/screens/ManageReviewsScreen'
import EditWorkspaceScreen from './app/screens/EditWorkspaceScreen'
import Home from './app/screens/HomeScreen'
import Profile from './app/screens/ProfileScreen'
import Card from './app/components/Card'
import AppTextInput from './app/components/NomadTextInput'
import AppPicker from './app/components/Picker'
import AppButton from './app/components/Button'
import ListingPage from './app/screens/WorkspacePage'
import Review from './app/components/Review'
import ImageInput from './app/components/ImageInput';
import SearchScreen from './app/screens/SearchScreen';
import WorkspacePage from './app/screens/WorkspacePage';
import Favorites from './app/screens/FavoritesScreen';
import colors from './app/styles/colors'
import UploadImageScreen from './app/screens/UploadImageScreen';
import PostReviewScreen from './app/screens/PostReviewScreen';
import MapScreen from './app/screens/MapScreen';
import UploadProfileScreen from './app/screens/UploadProfileScreen';

const { isUserAuthenticated } = require('nomad-client-logic')



const Stack = createStackNavigator();
const StackNavigator = ({ onLoggedIn }) => (
  <Stack.Navigator screenOptions={{
    headerShown: false
  }} >
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Login" >
      {(props) => <Login  {...props} onLoggedIn={onLoggedIn} />}
    </Stack.Screen>
  </Stack.Navigator>
)

const Tab = createBottomTabNavigator();
const TabNavigator = ({ handleLogout }) => (
  <Tab.Navigator tabBarOptions={{
    showLabel: false,
    activeTintColor: '#1c1c1c',
    style: {
      width: '70%',
      position: 'absolute',
      left: '15%',
      right: '15%',
      shadowOpacity: 0.5,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    }
  }} initialRouteName='Home'>
    <Tab.Screen name="Home" component={MainNavigator}
      options={{
        tabBarIcon: ({ color }) =>
          (< MaterialCommunityIcons name="earth" size={30} color={color} />)
      }} />
    <Tab.Screen name="Map" component={MapScreen}
      options={{
        tabBarVisible: false,
        tabBarIcon: ({ color }) =>
          (< MaterialCommunityIcons name="map" size={30} color={color} />)
      }} />
    <Tab.Screen name="Favorites" component={Favorites}
      options={{
        tabBarIcon: ({ color }) =>
          (< MaterialCommunityIcons name="bookmark" size={30} color={color} />)
      }} />
    <Tab.Screen name="Profile"
      options={{
        // tabBarVisible: false,
        tabBarIcon: ({ color }) =>
          (< MaterialCommunityIcons name="account" size={30} color={color} />),
      }}
    >
      {(props) => <ProfileNavigator  {...props} handleLogout={() => handleLogout()} />}
    </Tab.Screen>

  </Tab.Navigator>
)

const MainNavigator = () => (
  <Stack.Navigator screenOptions={{
    headerShown: false
  }} mode='modal'>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="WorkspacePage" component={WorkspacePage} />
    <Stack.Screen name="SearchScreen" component={SearchScreen} mode='card' options={{ tabBarVisible: false }} />
    <Stack.Screen name="ReviewPage" component={PostReviewScreen} />
  </Stack.Navigator>
)
const ProfileNavigator = ({ handleLogout }) => (
  <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name="Profile" >
      {(props) => <Profile  {...props} handleLogout={() => handleLogout()} />}
    </Stack.Screen>
    <Stack.Screen name="UploadProfile" component={UploadProfileScreen} />
    <Stack.Screen name="WorkspaceEditor" component={EditorNavigator} />
    <Stack.Screen name="ManageReviews" component={ManageReviewsScreen} />
  </Stack.Navigator>
)
const EditorNavigator = () => (
  <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name="ManageWs" component={ManageWorkspaceScreen} />
    <Stack.Screen name="CreateWs" component={EditWorkspaceScreen} />
    <Stack.Screen name="UploadImage" component={UploadImageScreen} />
  </Stack.Navigator>
)


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [imageUri, setImageUri] = useState()

  useEffect(() => {
    getAuthentication()
  }, [])

  const getAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        const auth = await isUserAuthenticated(token)
        return setIsAuthenticated(auth)
      }
    } catch (e) {
      console.log(e) // TODO HANDLE THIS
    }
  }
  const handleLogout = async () => {
    try {
      const removeToken = await AsyncStorage.removeItem('token')
      return setIsAuthenticated(false)

    } catch (e) {
      console.log(e) // TODO HANDLE THIS
    }
  }


  return (
    <NavigationContainer >
      {isAuthenticated === false && <StackNavigator onLoggedIn={getAuthentication} />}
      {isAuthenticated && <TabNavigator handleLogout={() => handleLogout()} />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // container: {
  //   backgroundColor: 'white',
  //   height: '100%',
  //   padding: 20,
  //   paddingTop: 100,
  // },
});