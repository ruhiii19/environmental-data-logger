import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native'
import { Feather } from '@expo/vector-icons'

const HomeScreen = ({ navigation, route }) => {
  const { email, password } = route.params
  const URL = `https://irflabs.in/gedl/edllogin.php?userId=${email}&pass=${password}`
  const [isLoading, setLoading] = useState(true)

  const [data, setData] = useState([])
  const [hasDevId, setHasDevId] = useState(false)

  // similar to 'componentDidMount', gets called once
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json)
        // Check if the response contains an array of devices with DevId
        if (Array.isArray(json) && json.some((item) => item.DevId)) {
          setHasDevId(true)
        }
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => {
        setLoading(false)
      }) // change loading state
  }, [])

  // Also get call asynchronous function
  const batteryData = []
  const temperatureData = []
  const humidityData = []
  const rainData = []
  const soilMoistureData = []
  const timeData = []
  const devId = []
  const location = []
  // Loop through the jsonData array and extract and store data in respective arrays
  if (hasDevId) {
    data.forEach((item) => {
      devId.push(item.DevId)
      location.push(item.location)
    })
  } else {
    data.forEach((item) => {
      batteryData.push(item.Batt)
      temperatureData.push(item.Temp)
      humidityData.push(item.Hum)
      rainData.push(item.Rain)
      soilMoistureData.push(item.SoilM)
      timeData.push(item.TimeS)
    })
  }
  console.log(temperatureData)
  console.log(humidityData)
  console.log(devId)
  console.log(location)
  const image = { uri: '' }
  return (
    <SafeAreaView style={styles.multiButton}>
      {isLoading ? (
        <ActivityIndicator />
      ) : hasDevId ? (
        <View style={styles.IdOptionsContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.icon}
              source={require('../../assets/HomePage.gif')}
            />
          </View>
          {data.map((item, index) => (
            <TouchableOpacity
              style={styles.squircleButton}
              key={index}
              onPress={() =>
                navigation.navigate('MultiUser', {
                  name: 'MultiUser',
                  DevId: item.DevId,
                  email: email,
                  password: password
                })
              }
            >
              <Text style={styles.buttonText}>
                ID: {item.DevId} {'\n'}
                Loc: {item.location}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.container}>
          <ImageBackground
            style={styles.battery}
            source={require('../../assets/battery/battery-full.png')}
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
  IdOptionsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  imageContainer: {
    alignSelf: 'center'
  },
  icon: {
    height: 640 / 3.5,
    width: 640 / 3.5,
    marginTop: 20,

    marginBottom: Dimensions.get('window').height / 16
    //padding: 50
  },
  squircleButton: {
    //backgroundColor: 'white',
    backgroundColor: '#262629',
    //backgroundColor: '#383c40',
    borderRadius: 20, // Adjust the border radius as needed
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10
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
  buttonText: {
    color: 'white',
    textAlign: 'center'
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
  },
  multiButton: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-around'
  }
})
export default HomeScreen
