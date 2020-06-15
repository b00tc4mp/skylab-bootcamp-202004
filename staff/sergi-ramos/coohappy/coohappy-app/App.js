import React from 'react';
import Landing from "./app/components/Landing"
import Login from "./app/components/Login"
import Register from "./app/components/Register"
import WellcomePage from "./app/components/WellcomePage"
import UpdateUser from "./app/components/UpdateUser"
import JoinCommunity from "./app/components/JoinCommunity"
import CreateCommunity from "./app/components/CreateCommunity"
import Home from "./app/components/Home"
import Chat from "./app/components/Chat"
import HeaderHome from "./app/components/HeaderHome"
import Laundry from "./app/components/Laundry"
import ShopList from "./app/components/ShopList"

// import Navigator from "./routes/home-stack"
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import SvgUri from 'expo-svg-uri';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator()

export default function App() {

  return (<>
    {/* <HeaderHome /> */}
    {/* <CreateCommunity /> */}
    {/* <JoinCommunity /> */}
    {/* <UpdateUser /> */}
    {/* <WellcomePage /> */}

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer> 

   
  </>
  )}



