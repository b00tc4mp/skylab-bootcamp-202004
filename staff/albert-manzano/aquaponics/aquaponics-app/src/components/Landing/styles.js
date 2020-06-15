import {StyleSheet,Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
      // flex: 0.8,
      // alignSelf: "flex-end" 
      // height: "80%"
    },
    
    image: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      // resizeMode:"cover"
    }
  });

  export default styles;