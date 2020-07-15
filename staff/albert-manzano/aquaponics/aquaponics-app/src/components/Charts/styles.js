import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    background: {
        position:"relative",
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        resizeMode:"contain"
    },

    canvas: {
        backgroundColor: "#c4c4c4",
        height: '90%',
        width: '90%',
        marginTop:'5%',
        alignSelf: 'center',
    },
   
    title:{
        alignSelf:"center",
        fontSize:25,
        marginTop:15
    }
});

export default styles;
