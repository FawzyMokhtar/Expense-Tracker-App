import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Colors } from '../../constants';
import { CancelButton, IconButton, Input, PrimaryButton } from '../ui';

export function ExpenseForm({
  initialValues,
  allowDelete = false,
  onSave,
  onCancel,
  OnDelete,
}) {
  const [formValues, setFormValues] = useState({
    description: initialValues?.description ?? '',
    value: initialValues?.value ?? '',
  });

  function inputHandler(field, enteredText) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: enteredText,
    }));
  }

  function submitHandler() {
    if (!formValues.description.length) {
      return Alert.alert(
        'Invalid Description',
        'Expense description must be between (1-50) characters',
        [{ text: 'Cancel', style: 'destructive' }]
      );
    }

    const valueInput = parseFloat(formValues.value);
    if (isNaN(valueInput) || valueInput <= 0) {
      return Alert.alert(
        'Invalid Value',
        'Expense value must be greater than zero',
        [{ text: 'Cancel', style: 'destructive' }]
      );
    }

    onSave({ description: formValues.description, value: valueInput });
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
        <PrimaryButton onPress={submitHandler}>Save</PrimaryButton>
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
