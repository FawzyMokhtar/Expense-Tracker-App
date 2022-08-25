import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '../../constants';
import { CreateExpense } from '../expenses';

export function HeaderRight({ tintColor }) {
  const [createModalVisibility, setCreateModalVisibility] = useState(false);

  function toggleCreateModal() {
    setCreateModalVisibility(!createModalVisibility);
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconOuterContainer}>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.iconInnerContainer, styles.pressed] // For IOS pressed
              : styles.iconInnerContainer
          }
          android_ripple={{ color: Colors.secondary500 }}
          onPress={toggleCreateModal}
        >
          <MaterialCommunityIcons name='plus' size={24} color={tintColor} />
        </Pressable>
      </View>
      <CreateExpense
        visible={createModalVisibility}
        onCancel={toggleCreateModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    width: '100%',
    paddingHorizontal: 16,
  },
  iconOuterContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  iconInnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
