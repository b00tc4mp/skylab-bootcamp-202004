import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 0.2,
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        backgroundColor: '#069b69',
    },
    titleText: {
        color: '#ffd545',
        fontWeight: '700',
        fontSize: 28,
        marginBottom: 20,
        marginRight: 50,
        width: 200
    },
    houseIcon: {
        marginBottom: 15,
        marginLeft: 20
    },
    userIcon: {
        marginBottom: 20,
        marginRight: 20
    },
    chat: {
        height: 80,
        width: '100%',
        backgroundColor: '#c4c4c4',
        justifyContent: 'center',
        flexDirection: 'row', justifyContent: 'space-between'
    },
    input: {
        backgroundColor: 'white',
        height: 55,
        width: '80%',
        marginTop: 12,
        marginLeft: 12,
        borderRadius: 25,
        paddingLeft: 20,
        color: 'black'
    },
    messages: {
        flex: 1,
        backgroundColor: 'white'
    },
    messageContainer: {
        alignSelf: 'flex-start',
        marginBottom: 15,
        marginTop: 5,
        marginLeft: 20,
        marginRight: 40,
        backgroundColor: '#f1f1f1',
        alignItems: 'flex-start',
        padding: (10, 10, 10, 10),
        borderRadius: 15,
    },
    hour: {
        color: '#c4c4c4',
        fontSize: 10
    },
    message: {
        color: 'black',
        fontSize: 15
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        width: 150
    },
    send: {
        justifyContent: 'center',
        marginRight: 10
    },
    messageContainerCurrentUser: {
        alignSelf: 'flex-end',
        marginBottom: 15,
        marginTop: 5,
        marginLeft: 40,
        marginRight: 20,
        backgroundColor: '#ffedad',

        alignItems: 'flex-start',
        padding: (10, 10, 10, 10),
        borderRadius: 15,
    },
    hourCurrentUser: {
        color: '#c4c4c4',
        fontSize: 10
    },
    messageCurrentUser: {
        color: 'black',
        fontSize: 15
    },
    nameCurrentUser: {
        fontSize: 15,
        fontWeight: '700',
        width: 150
    },
})

export default styles