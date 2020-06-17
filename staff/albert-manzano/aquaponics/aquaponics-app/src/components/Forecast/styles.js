import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  image: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    // resizeMode:"cover"
  },


  canvas: {
    alignItems: "center",
    backgroundColor: "#c4c4c4",
    height: 531,
    width: 279,
    marginTop: '5%',
    alignSelf: 'center',
    // marginTop:"5%",
  },


});

export default styles;


