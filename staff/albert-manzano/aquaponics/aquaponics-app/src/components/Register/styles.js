import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
    
  },

  image: {
    // height: Dimensions.get('window').height,
    // width: Dimensions.get('window').width,
    // resizeMode:"cover"
  },


  placeholder:{
    position:"absolute",
    alignSelf:'center',
  },

  text:{
    fontWeight: "bold",
  },

input: {
    paddingTop:30,
    marginBottom: 10,
    width: 160,
    height: 30,
    // left: -40,
    backgroundColor: "#E6E6E6",
    borderWidth: 1,
    borderColor: "rgba(196,196,196,1)",
    borderRadius: 5,
    // position: "absolute",
    alignItems: "center",
},

button: {
    width: 100,
    height: 30,
    backgroundColor: "#E6E6E6",
    borderWidth: 1,
    borderColor: "rgba(196,196,196,1)",
    borderRadius: 5,
    marginTop: '10%',
    paddingTop:3,

    alignSelf: "center",
    alignItems: 'center'
},
  
});

export default styles;