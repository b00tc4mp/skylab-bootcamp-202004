import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height - 20,
        backgroundColor: 'white'
    },
    bar: {
        width: '100%',
        height: 0.8,
        backgroundColor: '#003725',
        marginBottom: 10,
        marginTop: 10
    },
    shoppingTitle: {
        fontWeight: '700',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 15
    },
    shoppingParagraph: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        fontSize: 18,
        color: '#81868e'
    },
    foodList: {
        marginTop: 40
    },
    weight: {
        marginLeft: 15,
        fontWeight: '700',
        fontSize: 17
    },
    name: {
        fontWeight: '500'
    },
    settings: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemSettings: {
        alignSelf: 'center',
        marginRight: 20
    }
})

export default styles