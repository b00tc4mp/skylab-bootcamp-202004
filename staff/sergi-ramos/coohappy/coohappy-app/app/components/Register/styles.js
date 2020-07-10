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
        backgroundColor: '#E4E4E4',
        height: 55,
        marginBottom: 20,
        paddingLeft: 10,
        color: '#81868e'
    },
    form: {
        width: '90%'
    },
    buttonLogin: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#009965',
        alignSelf: 'center',
        width: '100%',
        height: 60,
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 30
    },
    buttonGoToRegister: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003725',
        alignSelf: 'center',
        width: '100%',
        height: 60,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 30
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
        marginTop: 50
    },
    textAskMember: {
        marginBottom: 20,
        fontWeight: "bold",
        width: 150,
    }
})

export default styles