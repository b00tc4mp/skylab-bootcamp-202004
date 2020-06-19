import {StyleSheet,Dimensions} from 'react-native';


const styles = StyleSheet.create({
image:{
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
},

wrap:{
    width:'80%',
    height: '70%',
    backgroundColor: '#c4c4c4',
    margin: '10%',
}

})

export default styles