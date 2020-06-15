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
        // alignItems: "center",
        backgroundColor: "#c4c4c4",
        height: 531,
        width: 279,
        marginTop:'5%',
        alignSelf: 'center',
        // marginTop:"5%",
    },
   
    activityIndicator: {
        flexDirection:"column",
        alignContent:'center',
    },


    iconTemp: {
        height: 45,
        width: 45,
    },

    iconPh: {
        height: 45,
        width: 45,
    },

    wrap:{
        marginTop:'5%',
        flexDirection: "row",
        justifyContent:"space-evenly",
        alignItems:"center",
    }
});

export default styles;
