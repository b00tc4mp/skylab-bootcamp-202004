import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    header: {
        height: 135,
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
    }
})

export default styles