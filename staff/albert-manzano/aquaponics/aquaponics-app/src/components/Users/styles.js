import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 20,
        height: 150,
        alignItems: "center",
        padding:10,
    },

    data: {
        alignSelf: "center",
        flexDirection: 'column'
    },

    wrap: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'baseline',
        width: '90%',
    },

    arrow: {
        marginTop: 20,
        width: 30,
        height: 30,
    },

    name: {
        alignItems: 'center',
    },

    item: {
        textAlign: "center",
        alignItems: "center"
    },

    boxes: {
        width: 100,
        height: 30,
        backgroundColor: "#E6E6E6",
        borderWidth: 1,
        borderColor: "rgba(196,196,196,1)",
        borderRadius: 5,
        paddingTop: 3,
        alignSelf: "center",
        alignItems: 'center',
        marginBottom: 5
    },




})

export default styles