import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '../../constants';

export function IconButton({ text, icon, iconColor, onPress }) {
  return (
    <View style={[styles.container, !text ? styles.containerOnIconOnly : null]}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.innerContainer, styles.pressed] // For IOS pressed
            : styles.innerContainer
        }
        android_ripple={{ color: Colors.secondary500 }}
        onPress={onPress}
      >
        {text ? <Text style={styles.text}>{text}</Text> : null}
        <MaterialCommunityIcons name={icon} color={iconColor} size={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 100,
    minHeight: 40,
    borderRadius: 4,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  containerOnIconOnly: {
    minWidth: 40,
    minHeight: 40,
    borderRadius: 20,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginLeft: 4,
  },
  pressed: {
    opacity: 0.5,
  },
});
