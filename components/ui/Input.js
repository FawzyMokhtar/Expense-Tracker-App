import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '../../constants';

export function Input({ label, inputTextConfig, onChangeText }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        {...inputTextConfig}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 8,
  },
  input: {
    fontSize: 16,
    backgroundColor: Colors.secondary500,
    color: Colors.primary500,
    padding: 8,
    height: 48,
    borderRadius: 4,
  },
});
