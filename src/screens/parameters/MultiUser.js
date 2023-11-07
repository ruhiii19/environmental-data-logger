import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  SafeAreaView,
  Alert
} from 'react-native'
import { Feather } from '@expo/vector-icons'
// get data from this URL!

const MultiUser = ({ navigation, route }) => {
  // managing state with 'useState'
  /* const { DevId } = route.params

  const URL = `https://irflabs.in/gedl/get10.php?DevId=${DevId}&user=abcd&pass=d1234`
  const [isLoading, setLoading] = useState(true)

  const [data, setData] = useState([])

  // similar to 'componentDidMount', gets called once
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json)
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => {
        setLoading(false)
      }) // change loading state
  }, []) */
  const { DevId, email, password } = route.params

  const URL = `https://irflabs.in/gedl/get10.php?DevId=${DevId}&user=${email}&pass=${password}&R=80`
  const [isLoading, setLoading] = useState(true)

  const [data, setData] = useState([])

  // similar to 'componentDidMount', gets called once
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json)
        if (json.error === 'No records found') {
          // If "No records found" error is returned, show an alert
          Alert.alert(
            'No Records Found',
            'There are no records for this device.',
            [
              {
                text: 'OK',
                onPress: () => {
                  // Navigate back to the home screen
                  navigation.navigate('Home', {
                    email: email,
                    password: password
                  })
                }
              }
            ]
          )
        }
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => {
        setLoading(false)
      }) // change loading state
  }, [])

  const batteryData = []
  const temperatureData = []
  const humidityData = []
  const rainData = []
  const soilMoistureData = []
  const timeData = []

  /* data.forEach((item) => {
    batteryData.push(item.Batt)
    temperatureData.push(item.Temp)
    humidityData.push(item.Hum)
    rainData.push(item.Rain)
    soilMoistureData.push(item.SoilM)
    timeData.push(item.TimeS)
  }) */
  if (!isLoading && data.error !== 'No records found') {
    // Execute the loop only if it's not an error page
    data.forEach((item) => {
      batteryData.push(item.Batt)
      temperatureData.push(item.Temp)
      humidityData.push(item.Hum)
      rainData.push(item.Rain)
      soilMoistureData.push(item.SoilM)
      timeData.push(item.TimeS)
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <ImageBackground
            style={styles.battery}
            source={require('../../../assets/battery/battery-full.png')}
          >
            <Text style={styles.batteryText}>{batteryData[0]}%</Text>
          </ImageBackground>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.tempButton]}
              onPress={() =>
                navigation.navigate('Temp', {
                  name: 'Temp',
                  temperatureData: temperatureData,
                  timeData: timeData
                })
              }
            >
              <View style={styles.iconContainer}>
                <Feather name={'thermometer'} size={24} color="white" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Temp</Text>
                <Text style={styles.value}>{temperatureData[0]}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.rainButton]}
              onPress={() =>
                navigation.navigate('Rain', {
                  name: 'Rain',
                  rainData: rainData,
                  timeData: timeData
                })
              }
            >
              <View style={styles.iconContainer}>
                <Feather name={'cloud-rain'} size={24} color="white" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Rain</Text>
                <Text style={styles.value}>{rainData[0]}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.humButton]}
              onPress={() =>
                navigation.navigate('Humidity', {
                  name: 'Humidity',
                  humidityData: humidityData,
                  timeData: timeData
                })
              }
            >
              <View style={styles.iconContainer}>
                <Feather name={'droplet'} size={24} color="white" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Humidity</Text>
                <Text style={styles.value}>{humidityData[0]}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.soilMButton]}
              onPress={() =>
                navigation.navigate('Soil Moisture', {
                  name: 'Soil Moisture',
                  soilMoistureData: soilMoistureData,
                  timeData: timeData
                })
              }
            >
              <View style={styles.iconContainer}>
                <Feather name={'align-center'} size={24} color="white" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Soil</Text>
                <Text style={styles.title}>Moisture</Text>
                <Text style={styles.value}>{soilMoistureData[0]}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
    padding: 1
  },
  batteryContainer: {
    alignSelf: 'flex-end',
    backgroundColor: 'white'
  },
  battery: {
    height: 541 / 11,
    width: 541 / 11,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center'
  },
  batteryText: {
    fontSize: 541 / 45,
    color: 'white',
    alignContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row', // Horizontal arrangement
    justifyContent: 'center', // Center items horizontally
    alignItems: 'center', // Center items vertically
    //backgroundColor: '#f0f1f7'
    backgroundColor: 'white'
  },
  imageLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginHorizontal: 10, // Adjust spacing between buttons
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    shadowColor: 'black',
    padding: 10
  },
  iconContainer: {
    marginRight: 10,
    alignItems: 'center'
  },
  textContainer: {
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
  value: {
    color: 'white',
    fontSize: 14
  },
  tempButton: {
    backgroundColor: '#f70707'
  },
  rainButton: {
    backgroundColor: '#13b8eb'
  },
  humButton: {
    backgroundColor: '#a6b1ed'
  },
  soilMButton: {
    backgroundColor: '#2ce69b'
  }
})

export default MultiUser
