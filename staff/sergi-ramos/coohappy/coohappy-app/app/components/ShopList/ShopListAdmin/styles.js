import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    header: {
        backgroundColor: '#069b69',
        height: 135,
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        color: '#ffd545',
        flexDirection: "row",
        marginBottom: 30
    },
    titleText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 28,
        marginBottom: 20,
        marginLeft: 20,
        width: 400
    },
    returnIcon: {
        marginBottom: 25,
        marginLeft: 20
    },
    form: {
        width: '90%'
    },
    input: {
        backgroundColor: '#e4e4e4',
        height: 55,
        marginBottom: 20,
        paddingLeft: 10,
        color: 'black'
    },
    textPassword: {
        marginTop: 10,
        marginBottom: 20,
        fontWeight: "bold"
    },
    titleSend: {
        fontWeight: '700',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 20
    }
})

export default styles