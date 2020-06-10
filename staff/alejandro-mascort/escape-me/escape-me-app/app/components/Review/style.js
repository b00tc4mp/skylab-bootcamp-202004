import { StyleSheet } from 'react-native'

module.exports = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 15,
        padding: 5,
        marginVertical: 5
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10
    }
})