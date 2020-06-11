import React from 'react';
import { StyleSheet, Text, View, Button,  Alert } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>  App.js to start working on your app!</Text>
      <Button title="Press me" onPress={() => Alert.alert('Simple Button pressed')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
