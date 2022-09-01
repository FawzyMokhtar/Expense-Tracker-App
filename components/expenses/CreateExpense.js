import { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';

import { useDispatch } from 'react-redux';

import { ExpenseForm } from './ExpenseForm';
import { Colors } from '../../constants';
import { ExpensesActions } from '../../store';

export function CreateExpense({ visible, onCancel }) {
  const [formValue, setFormValue] = useState({ description: '', value: '' });

  const dispatch = useDispatch();

  function formValueHandler(value) {
    setFormValue(value);
  }

  function saveHandler() {
    if (!formValue.description.length) {
      return Alert.alert(
        'Invalid Description',
        'Expense description must be between (1-50) characters',
        [{ text: 'Cancel', style: 'destructive' }]
      );
    }

    const valueInput = parseFloat(formValue.value);
    if (isNaN(valueInput) || valueInput <= 0) {
      return Alert.alert(
        'Invalid Value',
        'Expense value must be greater than zero',
        [{ text: 'Cancel', style: 'destructive' }]
      );
    }

    dispatch(
      ExpensesActions.create({
        description: formValue.description,
        value: valueInput,
      })
    );
    setDescription('');
    setValue('');

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
          <Text style={styles.headerText}>Add Expense</Text>
        </View>
        <ExpenseForm
          value={formValue}
          onChange={formValueHandler}
          onSave={saveHandler}
          onCancel={onCancel}
        />
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
});
