import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
  },

  image: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },

  title: {
    marginLeft: 4,
    fontSize: 60,
    color: "white"
  }
  
});

export default styles;