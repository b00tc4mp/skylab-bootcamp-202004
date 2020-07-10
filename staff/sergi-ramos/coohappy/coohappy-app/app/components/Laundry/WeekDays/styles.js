import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    dayContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#e4e4e4',
        margin: (15, 10, 15, 10),
        width: 60,
        height: 60,
        borderRadius: 30
    },
    day: {
        fontSize: 25,
        color: '#81868e',
        fontWeight: '700',
        width: 32,
        textAlign: 'center'
    },
    dayName: {
        color: '#797979',
        marginBottom: 5
    },
    dayContainerSelected: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#069b69',
        margin: (15, 10, 15, 10),
        width: 60,
        height: 60,
        borderRadius: 30
    },
    daySelected: {
        fontSize: 25,
        color: 'white',
        fontWeight: '700',
        width: 32,
        textAlign: 'center'
    },
    dayNameSelected: {
        color: 'white',
        marginBottom: 5
    },
    bar: {
        width: '100%',
        height: 0.7,
        backgroundColor: '#003725'
    }
})

export default styles