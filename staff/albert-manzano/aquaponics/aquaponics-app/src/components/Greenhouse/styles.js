import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
    },

    image: {
        height: Dimensions.get('window').height*0.9,
        width: Dimensions.get('window').width,
       
    },

    wrap: {
        width: '80%',
        height: '70%',
        backgroundColor: '#c4c4c4',
        margin: '10%',
        alignItems:'center',
        marginTop: '10%',
    },

    bgcolorgGreen:{
        backgroundColor:'green',
        marginTop:'20%',
    },

    ph:{
        marginTop:'20%',
    },

    bgcolorRed:{
        backgroundColor:'red',
        marginTop:'20%'
    },

    icon:{
        height:40,
        width:40,
    },

    battery:{
        marginTop:'20%',
        marginBottom:'20%'
    }

})

export default styles