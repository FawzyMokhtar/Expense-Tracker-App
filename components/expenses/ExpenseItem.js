import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import moment from 'moment';
import NumberFormat from 'react-number-format';

import { Colors } from '../../constants';
import { UpdateExpense } from './UpdateExpense';

function toDateString(date) {
  return moment(date).format('YYYY-MM-DD');
}

export function ExpenseItem({ expense }) {
  const [updateModalVisibility, setUpdateModalVisibility] = useState(false);

  function toggleUpdateModal() {
    setUpdateModalVisibility(!updateModalVisibility);
  }

  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.innerContainer, styles.pressed] // For IOS pressed
              : styles.innerContainer
          }
          android_ripple={{ color: Colors.secondary500 }}
          onPress={toggleUpdateModal}
        >
          <View style={styles.leftDetailContainer}>
            <Text style={styles.descriptionText}>{expense.description}</Text>
            <Text style={styles.dateText}>
              {toDateString(expense.createdAt)}
            </Text>
          </View>
          <View style={styles.rightDetailContainer}>
            <NumberFormat
              value={expense.value}
              displayType='text'
              prefix='$'
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              renderText={(value) => (
                <Text style={styles.valueText}>{value}</Text>
              )}
            />
          </View>
        </Pressable>
      </View>
      {updateModalVisibility ? (
        <UpdateExpense
          visible={updateModalVisibility}
          expense={expense}
          onCancel={toggleUpdateModal}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary500,
    minHeight: 72,
    marginBottom: 16,
    borderRadius: 4,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    overflow: Platform.select({ android: 'hidden' }),
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    overflow: 'hidden',
  },
  leftDetailContainer: {
    alignItems: 'flex-start',
  },
  rightDetailContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
    borderRadius: 4,
    padding: 4,
  },
  descriptionText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
  },
  dateText: {
    color: 'white',
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary500,
  },
  pressed: {
    opacity: 0.5,
  },
});
