import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    loginTitle: {
        fontSize: 40,
        alignSelf: 'flex-start',
        marginBottom: 28,
        fontWeight: "bold",
        width: '100%'
    },
    input: {
        backgroundColor: '#e4e4e4',
        height: 55,
        marginBottom: 20,
        paddingLeft: 10,
        color: 'black'
    },
    form: {
        width: '90%'
    },
    line: {
        marginBottom: 40
    },
    bar: {
        width: 240,
        height: 1,
        backgroundColor: '#003725',
        marginTop: 45,
        marginBottom: 45
    },
    closeItem: {
        alignSelf: 'flex-end',
        marginTop: 50,
        marginRight: 22
    },
    textAskMember: {
        marginBottom: 20,
        fontWeight: "bold",
        width: 120
    }
})

export default styles