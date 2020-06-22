import React, { useState } from "react";
import { 
  StyleSheet,
  View,
  StatusBar
} from "react-native";
import Home from "./src/Home"
import MapBar from "./src/MapBar";
import MapRestaurant from "./src/MapRestaurant";
import ProfilePage from "./src/ProfilePage";
import Favourites from "./src/Favourites";
import Modal from "./src/Modal";
import Menu from "./src/Menu"

const App = () => {
  const [view, setView] = useState("home");
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={true} />
      { view === "home" && <Home 
        onGoToMapBar={ () => setView("mapBar") } 
        onGoToMapRestaurant={ () => setView("mapRestaurant") } 
      /> }
      { view === "mapBar" && <MapBar/> }
      { view === "mapRestaurant" && <MapRestaurant /> }
      { view === "profilePage" && <ProfilePage 
        onGoToHome={ () => setView("home") }
      /> }
      { view === "favourites" && <Favourites /> }
      <Modal 
        isVisible={ modalVisible } 
        onGoToHome={ () => setView("home") }
        onHideModal={ () => setModalVisible(false) } />
      <Menu onGoTo={ setView } />
    </View>
  )
}

console.disableYellowBox = true

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
