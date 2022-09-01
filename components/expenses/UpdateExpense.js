import { Alert, Modal, StyleSheet, Text, View } from 'react-native';

import { useDispatch } from 'react-redux';

import { ExpenseForm } from './ExpenseForm';
import { Colors } from '../../constants';
import { ExpensesActions } from '../../store';

export function UpdateExpense({ visible, expense, onCancel }) {
  const dispatch = useDispatch();
  const formInitialValues = {
    description: expense.description,
    value: expense.value.toFixed(2),
  };

  function saveHandler({ description, value }) {
    dispatch(
      ExpensesActions.update({
        id: expense.id,
        description,
        value,
      })
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
        <ExpenseForm
          initialValues={formInitialValues}
          allowDelete={true}
          onSave={saveHandler}
          onCancel={onCancel}
          OnDelete={deleteHandler}
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
