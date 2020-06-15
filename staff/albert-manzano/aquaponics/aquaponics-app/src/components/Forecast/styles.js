import { StyleSheet ,Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  
  image: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    // resizeMode:"cover"
  },
  
  container: {
    width: 294,
    height: 476,
    backgroundColor: "#E6E6E6",
    marginLeft: 36
  },

  canvas: {
    alignItems: "center",
    backgroundColor: "#c4c4c4",
    height: 531,
    width: 279,
    marginTop:'5%',
    alignSelf: 'center',
    // marginTop:"5%",
},
  
  text: {
    color: "rgba(128,128,128,1)",
    fontSize: 20,
    height: 44,
    width: 100,
    
  },
  
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  tempText: {
    fontSize: 72,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 60,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  }
});

export default styles;


