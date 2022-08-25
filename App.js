import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { store } from './store';
import { Colors } from './constants';
import { RecentExpenses, AllExpenses } from './screens';
import { HeaderRight } from './components';

const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <Provider store={store}>
        <NavigationContainer>
          <Tabs.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.primary500,
              },
              headerTintColor: 'white',
              headerRight: ({ tintColor }) => (
                <HeaderRight tintColor={tintColor} />
              ),
              tabBarStyle: {
                backgroundColor: Colors.primary500,
              },
              tabBarLabelStyle: {
                fontSize: 16,
                fontWeight: 'bold',
              },
              tabBarInactiveTintColor: 'white',
              tabBarActiveTintColor: Colors.accent500,
            }}
            sceneContainerStyle={{
              backgroundColor: Colors.primary600,
            }}
          >
            <Tabs.Screen
              name='recent-expenses'
              component={RecentExpenses}
              options={{
                tabBarLabel: 'Recent',
                title: 'Recent Expenses',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name='timer-sand-complete'
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name='all-expenses'
              component={AllExpenses}
              options={{
                title: 'All Expenses',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name='calendar-month-outline'
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
          </Tabs.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
