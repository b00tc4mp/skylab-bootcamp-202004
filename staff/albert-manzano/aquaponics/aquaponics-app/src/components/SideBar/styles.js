import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:'absolute',
        top:80,
        width: 270,
        height: "100%",
        backgroundColor: "rgba(196,196,196,0.6)",
        marginLeft: 122,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        zIndex:3
    },

    text:{
        textAlign:"center",
        height: 20,
        width: 90,
        fontWeight: 'bold',
        bottom:30,
        // marginLeft:12,
    },

    icon:{
        alignSelf:"center",
        bottom:30,
        height: 40,
        width: 40,
        
    },
})


export default styles;