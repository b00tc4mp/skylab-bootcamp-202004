import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
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
    cohousingInfo: {
        marginLeft: 25,
        marginBottom: 20
    },
    name: {
        fontWeight: '700',
        fontSize: 17,
        marginBottom: 2
    },
    address: {
        fontSize: 17,
        marginBottom: 2
    },
    bar: {
        width: '100%',
        height: 0.7,
        backgroundColor: '#003725',

    },
    barBold: {
        width: '100%',
        height: 1.4,
        backgroundColor: '#003725',
        marginBottom: 5

    },
    titleMembers: {
        fontWeight: '700',
        marginLeft: 25,
        marginBottom: 20,
        marginTop: 20

    },
    memberContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
        marginLeft: 25
    },
    nameMember: {
        fontSize:19,
        marginLeft: 15
    }
})

export default styles