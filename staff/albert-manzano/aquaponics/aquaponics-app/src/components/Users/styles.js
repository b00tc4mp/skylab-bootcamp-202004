import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        width: '90%',
        height: '20%',
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 20,
    },

    data: {
        alignSelf: "center",
    },

    wrap: {
        marginTop:50,
        flexDirection:'row',
        justifyContent: "space-evenly", 
        alignItems: 'baseline'
    }

})

export default styles