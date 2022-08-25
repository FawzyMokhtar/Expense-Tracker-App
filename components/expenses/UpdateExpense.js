import { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, View } from 'react-native';

import { useDispatch } from 'react-redux';

import { Colors } from '../../constants';
import { CancelButton, IconButton, PrimaryButton } from '../ui';
import { ExpensesActions } from '../../store';

export function UpdateExpense({ visible, expense, onCancel }) {
  const [description, setDescription] = useState(expense.description);
  const [value, setValue] = useState(expense.value.toString());

  const dispatch = useDispatch();

  function descriptionInputHandler(inputText) {
    setDescription(inputText);
  }

  function valueInputHandler(inputText) {
    setValue(inputText);
  }

  function saveHandler() {
    if (!description?.length) {
      return Alert.alert(
        'Invalid Description',
        'Expense description must be between (1-50) characters',
        [{ text: 'Cancel', style: 'destructive' }]
      );
    }

    const valueInput = parseFloat(value);
    if (isNaN(valueInput) || valueInput <= 0) {
      return Alert.alert(
        'Invalid Value',
        'Expense value must be greater than zero',
        [{ text: 'Cancel', style: 'destructive' }]
      );
    }

    dispatch(
      ExpensesActions.update({ id: expense.id, description, value: valueInput })
    );

    onCancel();
  }

  function deleteHandler() {
    Alert.alert('Confirmation', 'Do you want do delete this expense?', [
      { text: 'Yes', style: 'default', onPress: () => confirmDelete() },
      { text: 'No', style: 'destructive' },
    ]);
  }

  function confirmDelete() {
    dispatch(ExpensesActions.delete({ id: expense.id }));
    onCancel();
  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Update Expense</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.formControlLabel}>Description</Text>
            <TextInput
              style={styles.formControl}
              maxLength={50}
              placeholder='Enter expense description...'
              autoCapitalize='none'
              autoCorrect={false}
              value={description}
              onChangeText={descriptionInputHandler}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formControlLabel}>Value</Text>
            <TextInput
              style={styles.formControl}
              placeholder='Enter expense value...'
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='decimal-pad'
              value={value}
              onChangeText={valueInputHandler}
            />
          </View>
          <View style={styles.actionsContainer}>
            <PrimaryButton onPress={saveHandler}>Save</PrimaryButton>
            <CancelButton onPress={onCancel}>Cancel</CancelButton>
          </View>
          <View style={styles.deleteContainer}>
            <IconButton
              icon='trash-can-outline'
              iconColor='red'
              onPress={deleteHandler}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary600,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: Colors.primary500,
    padding: 8,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    marginVertical: 16,
    padding: 16,
  },
  formGroup: {
    marginBottom: 24,
  },
  formControlLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 8,
  },
  formControl: {
    fontSize: 16,
    backgroundColor: Colors.secondary500,
    color: Colors.primary500,
    padding: 8,
    height: 48,
    borderRadius: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteContainer: {
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: Colors.secondary500,
    padding: 8,
    marginTop: 16,
  },
});