import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import TempScreen from './src/screens/parameters/TempScreen'
import RainScreen from './src/screens/parameters/RainScreen'
import LoginScreen from './src/screens/LoginSignupScreen/LoginScreen'
import HumidityScreen from './src/screens/parameters/HumidityScreen'
import SoilMoistureScreen from './src/screens/parameters/SoilMoistureScreen'
import MultiUser from './src/screens/parameters/MultiUser'

const Stack = createNativeStackNavigator()

const App = () => {
  //const
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Temp" component={TempScreen} />
        <Stack.Screen name="Rain" component={RainScreen} />
        <Stack.Screen name="Humidity" component={HumidityScreen} />
        <Stack.Screen name="Soil Moisture" component={SoilMoistureScreen} />
        <Stack.Screen name="MultiUser" component={MultiUser} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
