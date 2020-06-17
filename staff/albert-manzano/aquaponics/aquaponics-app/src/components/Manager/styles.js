import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // flexDirection: "column",
    backgroundColor: "#A9A9A9",
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },

  icon: {
    alignSelf: "center",
    height: 100,
    width: 100,
    marginTop: 100
  },

  text: {
    fontWeight: 'bold',
    alignSelf: 'center',
  }
});

export default styles;