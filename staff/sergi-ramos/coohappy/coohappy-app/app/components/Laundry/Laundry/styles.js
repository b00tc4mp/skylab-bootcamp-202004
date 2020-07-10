import { StyleSheet, Dimensions } from 'react-native'


const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        backgroundColor: '#069b69',
    },
    textLaundry: {
        fontWeight: '700',
        fontSize: 20,
        width: '100%',
        marginLeft: 15,
        marginBottom: 15,
        marginTop: 15
    },
    daysContainer: {
        width: '100%',
        backgroundColor: 'white'
    },
    reserve: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 0.7,
        alignItems: 'center',
        height: 100
    },
    verticalLine: {
        width: 1,
        height: 100,
        backgroundColor: 'black'
    },
    dayContainer: {
        width: Dimensions.get('window').width / 2
    },
    cancelContainer: {
        width: Dimensions.get('window').width / 2,
        flex: 1,
        alignItems: 'center'
    },
    cancel: {
        width: 180,
        height: 50,
        backgroundColor: '#003725',
        color: 'white',
        fontWeight: '700',
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    day: {
        fontSize: 17,
        marginLeft: 20,
        marginBottom: 2,
    },
    hour: {
        fontSize: 18,
        marginLeft: 20,
        marginTop: 2,
        fontWeight: '700'
    }
})

export default styles