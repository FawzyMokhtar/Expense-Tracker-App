import { StyleSheet } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

import { store } from './store';

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <Provider store={store}></Provider>
    </>
  );
}

const styles = StyleSheet.create({});
