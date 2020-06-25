import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  image: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    // resizeMode:"cover"
  },

  weatherContainer: {
    width: '80%',
    height: '70%',
    backgroundColor: '#c4c4c4',
    alignSelf: 'center',
    alignContent: "center",
    justifyContent: "center",
    marginTop: '10%',
    borderRadius:10,
  },

  headerContainer: {
    alignItems: "center",
    marginBottom: 60,
  },

  button: {
    width: 100,
    height: 30,
    backgroundColor: "#C4c4c4",
    borderWidth: 1,
    borderColor: "rgba(196,196,196,1)",
    borderRadius: 5,
    marginTop: '10%',
    paddingTop: 3,
    alignSelf: "center",
    alignItems: 'center'
  },

  temp: {
    fontSize: 20,
    marginTop: 10,
  },

  canvas: {
    alignItems: "center",
    backgroundColor: "#c4c4c4",
    height: 531,
    width: 279,
    alignSelf: 'center',
  },

  icon: {
    alignSelf: "center",
  },

  bodyContainer: {
    flexDirection: 'row',
    marginLeft: '6%',
    alignContent: 'flex-end',
    padding: 10,
    borderRadius: 10,
  },

  iconDays: {
    alignSelf: "center",
    flexDirection:'column',
    alignContent:'space-between'
  },

  days:{
    alignSelf: "center",
    flexDirection:'column',
    alignContent:'space-between',
    marginTop:'10%',
  },

  date:{
    fontSize:40,
    color:'white',
  }

});

export default styles;


