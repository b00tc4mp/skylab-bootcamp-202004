import React, { useState } from "react";
import { 
  StyleSheet,
  View,
  StatusBar,
  Text
} from "react-native";
import Modal from "./src/Modal";
import MapBar from "./src/MapBar";
import MapRestaurant from "./src/MapRestaurant";
import Home from "./src/Home"

const App = () => {
  const [view, setView] = useState("home");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      { view === "home" && <Home 
        onGoToMapBar={ () => setView("mapBar") } 
        onGoToMapRestaurant={ () => setView("mapRestaurant") } 
      /> }
      { view === "mapBar" && <MapBar/> }
      { view === "mapRestaurant" && <MapRestaurant /> }
      {/*<Modal />*/}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
