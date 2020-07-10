import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({

    container: {
        width: '90%',
        alignSelf: 'center'
    },
    hourContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        height: 55,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#069b69'
    },
    hourContainerSelected: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        height: 55,
        borderRadius: 30,
        backgroundColor: '#ffd545'
    },
    hourSelected: {
        fontSize: 18,
        color: '#069b69',
        marginLeft: 20,
        fontWeight: '700',
        width: 120
    },
    availabilitySelected: {
        color: '#069b69',
        marginRight: 20,
        fontWeight: '700',
        width: 109
    },
    hourContainerComplete: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        height: 55,
        borderRadius: 30,
        backgroundColor: '#e4e4e4'
    },
    hour: {
        fontSize: 18,
        color: '#81868e',
        marginLeft: 20,
        width: 112
    },
    availability: {
        color: '#069b69',
        marginRight: 20
    },
    availabilityComplete: {
        color: '#81868e',
        marginRight: 20
    },
    scrollView: {
        width: '100%',
        height: 515
    }
})

export default styles