/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListScreen from './screens/List.screen'

const Stack = createNativeStackNavigator()

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ListScreen}
          options={{ title: 'Welcome' }}
        />
        {/*<Stack.Screen name="Profile" component={ProfileScreen} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
