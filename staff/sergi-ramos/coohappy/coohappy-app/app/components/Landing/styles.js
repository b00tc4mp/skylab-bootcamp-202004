import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#009965',
      padding: 30,
    },
    landingContainer: {
      maxHeight: Dimensions.get('window').height * .95
    },
    imageContainer: {
      flex: 2,
      width: Dimensions.get('window').width * 0.65
    },
    buttonLogin: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '50%',
      height: '100%',
      borderRadius: 5,
      marginRight: '2%',
      color: '#003725'
    },
    buttonRegister: {
      backgroundColor: '#003725',
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      height: '100%',
      borderRadius: 5,
      marginLeft: '2%'
    },
    buttonContainer: {
      height: '7%',
      flexDirection: "row",
    },
  })

  export default styles