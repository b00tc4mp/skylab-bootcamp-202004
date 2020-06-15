import {StyleSheet,Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    
    image: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      // resizeMode:"cover"
    }
  });

  export default styles;