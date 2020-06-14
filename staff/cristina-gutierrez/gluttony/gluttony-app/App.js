import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from './src/Modal';

export default function App() {
  return (
    <Modal />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
