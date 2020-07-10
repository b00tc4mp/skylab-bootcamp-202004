import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    header: {
        backgroundColor: '#069b69',
        height: '17%',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: "row",
        marginBottom: 30
    },
    input: {
        backgroundColor: '#e4e4e4',
        height: 55,
        marginBottom: 20,
        paddingLeft: 10,
        color: 'black'
    },
    bar: {
        width: 240,
        height: 1,
        backgroundColor: '#003725',
        marginTop: 45,
        marginBottom: 10
    },
    titleText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 28,
        marginBottom: 20,
        marginLeft: 20,
        width: 300
    },
    userIcon: {
        marginBottom: 20,
        marginRight: 20
    },
    title: {
        textAlign: 'center',
        fontWeight: "bold",
        marginBottom: 20
    },
    text: {
        color: '#81868e',
        marginBottom: 20
    }
})

export default styles