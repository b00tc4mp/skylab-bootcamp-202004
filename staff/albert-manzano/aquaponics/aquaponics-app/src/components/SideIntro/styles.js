import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        position:"absolute",
        // top:80,
        width: "70%",
        height:"100%",
        backgroundColor: "rgba(196,196,196,0.6)",
        marginLeft: 122,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center"
    },

    textLogin: {
        position:"absolute",
        height: 20,
        width: 60,
        fontWeight: 'bold',
        bottom:40,
    },

    textRegister: {
        position:"absolute",
        height: 20,
        width: 60,
        fontWeight: 'bold',
        bottom:40,
    },
    
    iconRegister:{
        // position:"absolute",
        zIndex:3,
        height: 40,
        width: 40,
    },

    iconLogin:{
        // position:"absolute",
        zIndex:3,
        height: 40,
        width: 40,
    }
})


export default styles;