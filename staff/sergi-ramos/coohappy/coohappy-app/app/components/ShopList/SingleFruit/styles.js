import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({

    containerShopList: {
        width: Dimensions.get('window').width / 2,
        backgroundColor: 'white'
    },
    containerFruitItem: {
        alignSelf: 'center',
        width: Dimensions.get('window').width / 2 - 25,
        height: Dimensions.get('window').width / 2 - 25, 
        borderRadius: 15,
    },
    addText: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: '#069b69',
        borderWidth: 1,
        borderColor: '#ffd545',
        borderRadius: 20,
        width: Dimensions.get('window').width / 2 - 30,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 15,
        marginBottom: 40
    },
    fruitName: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'black',
        marginTop: 10
    },
    plusNameContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 15,
        marginTop: 10,
    },
    lessWeightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 15,
        marginTop: 10,
        marginBottom: 50
    },
    plus: {
        marginLeft: 50,
    },
    less: {
        marginLeft: 45  
    },
    plusText: {
        fontSize: 20
    },
    lessText: {
        fontSize: 20,
        fontWeight: '700',
        width: 70
    }
})

export default styles