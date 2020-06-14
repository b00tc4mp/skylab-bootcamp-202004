import React from 'react';
import { Landing, Login, Register, WellcomePage, UpdateUser, JoinCommunity, CreateCommunity, Home, Chat, HeaderHome, Laundry, ShopList } from "./app/components"
// import Navigator from "./routes/home-stack"
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from "@expo/vector-icons"
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import SvgUri from 'expo-svg-uri';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export default function App() {

  return (<>
    {/* <HeaderHome /> */}
    {/* <CreateCommunity /> */}
    {/* <JoinCommunity /> */}
    {/* <UpdateUser /> */}
    {/* <WellcomePage /> */}
    {/* <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer> */}

    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" tabBarOptions={{
        labelStyle: { display: 'none' },
        style: {
          height: 80
        }
      }} >
        <Tab.Screen name="Washing" component={Laundry}

          options={{

            title: "Washing",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="washing-machine" size={50} color={"#009965"} />


            )
          }} />

        <Tab.Screen name="Chat" component={Home}

          options={{

            title: "Chat",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="message1" size={45} color={'#009965'} />

            )
          }} />

        <Tab.Screen name="ShopList" component={ShopList}

          options={{

            title: "ShopList",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="shopping-basket" size={40} color={'#009965'} />

            )}}/>

      </Tab.Navigator>
    </NavigationContainer>




  </>
  )
}



