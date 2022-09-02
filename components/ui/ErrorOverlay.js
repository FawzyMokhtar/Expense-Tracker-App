import { Text, StyleSheet, View } from 'react-native';

import { Colors } from '../../constants';
import { PrimaryButton } from './PrimaryButton';

export function ErrorOverlay({ message, onDismiss }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred..!</Text>
      <Text style={styles.text}>{message}</Text>
      <PrimaryButton onPress={onDismiss}>Okay</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.primary700,
  },
  text: {
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
