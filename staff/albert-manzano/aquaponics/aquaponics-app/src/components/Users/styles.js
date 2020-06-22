import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        width: '90%',
        
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 20,
    },

    data: {
        alignSelf: "center",
        flexDirection: 'column'
    },

    wrap: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems: 'baseline',
        width:'90%',
    },

    arrow: {
        marginTop: 20,
        width: 30,
        height: 30,
    },

    name:{
        alignItems:'center'
    },

    item: {
        textAlign: "center",
        alignItems:"center"
    }


})

export default styles