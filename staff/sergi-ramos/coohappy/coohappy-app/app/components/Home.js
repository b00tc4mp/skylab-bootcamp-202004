import React from 'react'
import Laundry from './Laundry'
import Chat from './Chat'
import ShopList from './ShopList'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SvgUri from 'expo-svg-uri';



const Tab = createBottomTabNavigator()

const Home = function () {

    return (

        <Tab.Navigator initialRouteName="Chat" tabBarOptions={{
            labelStyle: { display: 'none' },
            style: {
                height: 80
            }
        }} >
            <Tab.Screen name="Washing" component={Laundry}

                options={{

                    title: "Washing",
                    tabBarIcon: ({ focused }) => (
                        focused ?

                            <SvgUri source={require('../assets/ic-whasing-machine-green.svg')} /> :
                            <SvgUri source={require('../assets/ic-whasing-machine.svg')} />
                    )
                }} />

            <Tab.Screen name="Chat" component={Chat}

                options={{

                    title: "Chat",
                    tabBarIcon: ({ focused }) => (
                        focused ?
                            <SvgUri source={require('../assets/ic-chat-green.svg')} /> :
                            <SvgUri source={require('../assets/ic-chat-line.svg')} />
                    )
                }} />

            <Tab.Screen name="ShopList" component={ShopList}

                options={{

                    title: "ShopList",
                    tabBarIcon: ({ focused }) => (
                        focused ?
                            <SvgUri source={require('../assets/ic-bag-green.svg')} /> :
                            <SvgUri source={require('../assets/ic-bag-line.svg')} />

                    )
                }} />

        </Tab.Navigator>
    )
}

export default Home