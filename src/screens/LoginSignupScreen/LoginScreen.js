import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  KeyboardAvoidingView
} from 'react-native'
import React, { useState } from 'react'

const LoginScreen = ({ navigation }) => {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')

  const handleButtonPress = async () => {
    if (text1 === '' || text2 === '') {
      // Both fields are empty, show an alert
      Alert.alert('Email and Password are mandatory fields')
    } else {
      try {
        const data = await fetchUserData(text1, text2)

        if (data.error) {
          // An error occurred during login, show an alert
          Alert.alert(data.error, 'Please check your credentials and try again')
        } else {
          // Login was successful, navigate to the home screen
          navigation.navigate('Home', {
            email: text1,
            password: text2
          })
        }
      } catch (error) {
        console.error('Login error:', error.message)
        Alert.alert(
          'Login Failed',
          'Please check your credentials and try again'
        )
      }
    }
  }

  // Function to fetch user data from the API
  const fetchUserData = async (email, password) => {
    try {
      const response = await fetch(
        `https://irflabs.in/gedl/edllogin.php?userId=${email}&pass=${password}`,
        {
          method: 'GET' // or 'POST' depending on your API
          // You can add headers if necessary, e.g., headers: { 'Authorization': 'Bearer yourToken' }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  }
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        //behavior="padding" // Add this prop
      >
        <StatusBar />
        <View
          style={{
            paddingVertical: 12,
            width: '95%',
            alignSelf: 'center',
            marginBottom: 20
          }}
        >
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 25,
              fontWeight: 'bold'
            }}
          >
            Login
          </Text>
        </View>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
          value={text1}
          onChangeText={setText1}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
          value={text2}
          onChangeText={setText2}
          onSubmitEditing={handleButtonPress} // Add this prop
        />
        <TouchableOpacity
          style={[styles.login, { width: '95%' }]}
          onPress={handleButtonPress}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //backgroundColor: '#f0f1f7',
    backgroundColor: 'white',
    width: '100%'
  },
  input: {
    padding: 10,
    borderColor: '#656669',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 10,
    width: '95%',
    alignSelf: 'center'
  },
  login: {
    backgroundColor: '#262629',
    borderRadius: 25,
    alignSelf: 'center',
    padding: 10,
    elevation: 2
  },
  loginText: {
    fontSize: 17,
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  head: {
    paddingVertical: 12,
    width: '95%',
    alignSelf: 'center',
    fontSize: 19,
    fontWeight: 'bold'
  }
})

export default LoginScreen
