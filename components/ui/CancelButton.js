import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants';

export function CancelButton({ children, onPress }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.innerContainer, styles.pressed] // For IOS pressed
            : styles.innerContainer
        }
        android_ripple={{ color: Colors.secondary500 }}
        onPress={onPress}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 100,
    minHeight: 40,
    borderRadius: 4,
    backgroundColor: Colors.primary700,
    overflow: 'hidden',
  },
  innerContainer: {
    flex: 1,
    padding: 8,
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.5,
  },
});
