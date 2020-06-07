import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        color: 'white',
        ...Platform.select({
            ios: {
                fontFamily: 'Avenir'
            },
            android: {
                fontFamily: 'Roboto'
            }
        })
    }
})

export default styles