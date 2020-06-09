import Home from './app/screens/Home'
import Login from './app/screens/Login'
import CardDetails from './app/screens/CardDetails'
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from "react-native-vector-icons/FontAwesome";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import Profile from './app/screens/Profile'
import AppPicker from './app/components/AppPicker'
import AppTextInput from './app/components/AppTextInput'

const categories = [
  { label: "Barcelona", value: 1 },
  { label: "Madrid", value: 2 },
  { label: "Valencia", value: 3 }
]
export default function () {
  const [category, setCategory] = useState()
  return (
    // <View style={styles.container}>
    //   <View style={styles.appheader}>
    //     <Text style={styles.title}>Escape Me</Text>
    //     <TouchableOpacity style={styles.logOut}>
    //       <AntDesign name="logout" size={24} color="white" />
    //     </TouchableOpacity>
    //   </View>
    //   <AppContainer />
    // </View>
    // <Login />
    <SafeAreaView>
      <AppPicker icon="city" placeholder="Province" items={categories}
        selectedItem={category} onSelectItem={item => setCategory(item)} />
      <AppTextInput placeholder='Email' icon="email" />
    </SafeAreaView>
  );

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