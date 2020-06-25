import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingTop: 25,
    flexDirection: 'row',
    justifyContent: "space-between",
    backgroundColor: '#ff3300',
    alignItems: 'flex-end'
  },

  logo: {
    resizeMode: "contain",
    width: 55,
    height: 55,
  },

  hamburguer: {
    marginRight: 10,
    marginBottom: 3,
    width: 50,
    height: 50,
    justifyContent: 'flex-start',
  }
});

export default styles;