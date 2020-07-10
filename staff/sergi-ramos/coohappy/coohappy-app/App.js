import React, { useState } from 'react';
import Landing from "./app/components/Landing"
import Login from "./app/components/Login"
import Register from "./app/components/Register"
import WellcomePage from "./app/components/WellcomePage"
import UpdateUser from "./app/components/UpdateUser"
import JoinCommunity from "./app/components/JoinCommunity"
import CreateCommunity from "./app/components/CreateCommunity"
import Home from "./app/components/Home"
import InfoCommunity from "./app/components/InfoCommunity/InfoCommunity/index"
import InfoCommunityAdmin from "./app/components/InfoCommunity/InfoCommunityAdmin/index"
import ShopListAdmin from './app/components/ShopList/ShopListAdmin'

import logic from 'coohappy-client-logic'

logic.__context__.storage = AsyncStorage
logic.__context__.API_URL = 'http://192.168.1.38:8080/api'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AsyncStorage } from 'react-native';
console.disableYellowBox = true


const Stack = createStackNavigator()

export default function App() {
  const [name, setName] = useState()
  
  return (<>

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="WellcomePage">
          {props => <WellcomePage {...props} name={name} />}
        </Stack.Screen>
        <Stack.Screen name="CreateCommunity" component={CreateCommunity} />
        <Stack.Screen name="JoinCommunity" component={JoinCommunity} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UpdateUser">
          {props => <UpdateUser {...props} setName={setName} />}
        </Stack.Screen>
        <Stack.Screen name="InfoCommunity" component={InfoCommunity} />
        <Stack.Screen name="InfoCommunityAdmin" component={InfoCommunityAdmin} />
        <Stack.Screen name="ShopListAdmin" component={ShopListAdmin} />

      </Stack.Navigator>
    </NavigationContainer>

  </>
  )
}



