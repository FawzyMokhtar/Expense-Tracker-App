import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants';
import { CancelButton, IconButton, Input, PrimaryButton } from '../ui';

export function ExpenseForm({
  initialValues,
  allowDelete = false,
  onSave,
  onCancel,
  OnDelete,
}) {
  const [form, setForm] = useState({
    description: {
      value: initialValues?.description ?? '',
      isValid: true,
    },
    value: {
      value: initialValues?.value ?? '',
      isValid: true,
    },
  });

  const formIsValid = Object.values(form).every((input) => input.isValid);

  function inputHandler(field, enteredText) {
    setForm((currentValues) => ({
      ...currentValues,
      [field]: { value: enteredText, isValid: true },
    }));
  }

  function submitHandler() {
    const valueInput = +form.value.value;

    const descriptionIsValid = !!form.description.value.length;
    const valueIsValid = !(isNaN(valueInput) || valueInput <= 0);

    if (!descriptionIsValid || !valueIsValid) {
      setForm((currentForm) => ({
        description: {
          value: currentForm.description.value,
          isValid: descriptionIsValid,
        },
        value: {
          value: currentForm.value.value,
          isValid: valueIsValid,
        },
      }));

      return;
    }

    onSave({ description: form.description.value, value: valueInput });
  }

  return (
    <View style={styles.container}>
      <View>
        <Input
          label='Description'
          inputTextConfig={{
            maxLength: 50,
            placeholder: 'Enter expense description...',
            autoCorrect: false,
            value: form.description.value,
          }}
          isInvalid={!form.description.isValid}
          onChangeText={inputHandler.bind(this, 'description')}
        />
        <Input
          label='Value'
          inputTextConfig={{
            placeholder: 'Enter expense value...',
            keyboardType: 'decimal-pad',
            value: form.value.value,
          }}
          isInvalid={!form.value.isValid}
          onChangeText={inputHandler.bind(this, 'value')}
        />
      </View>
      {!formIsValid && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Please check the entered data..!</Text>
        </View>
      )}
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
  errorContainer: {
    marginBottom: 8,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.error500,
  },
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
