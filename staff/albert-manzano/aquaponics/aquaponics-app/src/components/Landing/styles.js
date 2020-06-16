import {StyleSheet,Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
      // flex: 0.6,
    alignItems: "center",
    flexDirection: "column",
    // justifyContent: "space-evenly",
    },
    
    image: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      // resizeMode:"cover"
    },

    title:{
      
      fontSize:60,
      color: "white",
      
    }
  });

  export default styles;