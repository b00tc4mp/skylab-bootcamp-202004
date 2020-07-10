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
        color: '#ffd545',
        fontWeight: '700',
        fontSize: 28,
        marginBottom: 20,
        marginLeft: 20,
        width: 300
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
    barBold: {
        width: '100%',
        height: 1.2,
        backgroundColor: '#003725',
        marginBottom: 30,
        marginTop: 30
    },
    titlePassword: {
        fontWeight: '700',
        marginBottom: 15
    },
    paragraphPassword: {
        color: '#81868e',
        fontSize: 17
    },
    passwordContainer: {
        marginLeft: 25
    },
    accessCodeConatiner: {
        flexDirection: 'row',
        backgroundColor: '#e4e4e4',
        width: '90%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    textAccessCode: {
        marginLeft: 20,
        fontSize: 18
    },
    copyAccesCode: {
        marginRight: 20
    },
    bar: {
        width: '100%',
        height: 0.7,
        backgroundColor: '#003725',

    },
    memberContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'flex-start',
        marginLeft: 25
    },
    nameMember: {
        fontSize: 19,
        marginLeft: 15
    },
    titleMembers: {
        fontWeight: '700',
        marginLeft: 25,
        marginBottom: 20,
        marginTop: 20,
        alignSelf: 'flex-start',
        width: 200

    }
})

export default styles