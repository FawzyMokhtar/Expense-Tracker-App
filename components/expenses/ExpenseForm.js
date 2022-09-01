import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../../constants';
import { CancelButton, IconButton, Input, PrimaryButton } from '../ui';

export function ExpenseForm({
  value,
  allowDelete = false,
  onChange,
  onSave,
  onCancel,
  OnDelete,
}) {
  const [formValues, setFormValues] = useState({
    description: value?.description ?? '',
    value: value?.value ?? '',
  });

  function inputHandler(field, enteredText) {
    setFormValues((currentValues) => {
      const newValue = {
        ...currentValues,
        [field]: enteredText,
      };

      onChange(newValue);
      return newValue;
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <Input
          label='Description'
          inputTextConfig={{
            maxLength: 50,
            placeholder: 'Enter expense description...',
            autoCorrect: false,
            value: formValues.description,
          }}
          onChangeText={inputHandler.bind(this, 'description')}
        />
        <Input
          label='Value'
          inputTextConfig={{
            placeholder: 'Enter expense value...',
            keyboardType: 'decimal-pad',
            value: formValues.value,
          }}
          onChangeText={inputHandler.bind(this, 'value')}
        />
      </View>
      <View style={styles.actionsContainer}>
        <PrimaryButton onPress={onSave}>Save</PrimaryButton>
        <CancelButton onPress={onCancel}>Cancel</CancelButton>
      </View>
      {allowDelete ? (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash-can-outline'
            iconColor='red'
            onPress={OnDelete}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
  },
  inputsContainer: {},
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  deleteContainer: {
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: Colors.secondary500,
    marginTop: 16,
    paddingVertical: 8,
  },
});
