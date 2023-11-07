import React, { useState } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { LineChart, BarChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

const RainScreen = ({ navigation, route }) => {
  const { rainData, timeData } = route.params
  const reversedRain = rainData.slice(0, 10).reverse() // Reversed copy of the data

  // Calculate the sum of all values in the reversedRain array
  const sum = reversedRain.reduce((acc, currentValue) => acc + currentValue, 0)

  // Calculate the average
  const average = sum / reversedRain.length

  const [chartType, setChartType] = useState('daily')

  const weeklyData = calculateWeeklyAverage(rainData)

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(51, 204, 204, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    }
  }

  const chartData = {
    labels: Array.from({ length: weeklyData.length }, (_, i) =>
      (i + 1).toString()
    ),
    datasets: [
      {
        data: weeklyData,
        color: (opacity = 1) => `rgba(204, 204, 204, ${opacity})`,
        barPercentage: 0.9
      }
    ]
  }

  function extractTimeFromTimestamp(timestamp) {
    const parts = timestamp.split(' ')
    if (parts.length >= 4) {
      const timeParts = parts[3].split(':')
      if (timeParts.length >= 2) {
        return `${timeParts[0]}:${timeParts[1]}`
      }
    }
    return 'Invalid Timestamp'
  }

  function extractDateFromTimestamp(timestamp) {
    const parts = timestamp.split(' ')
    if (parts.length >= 3) {
      return `${parts[0]} ${parts[1]}`
    }
    return 'Invalid Timestamp' // Handle the case where the timestamp format is not as expected
  }
  /* const data = {
    labels: [
      [extractTimeFromTimestamp(timeData[9])],
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      [extractTimeFromTimestamp(timeData[0])]
    ],
    datasets: [
      {
        data: reversedRain,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2
      }
    ]
  } */

  function calculateWeeklyAverage(data) {
    const weeklyAverages = []
    for (let i = 0; i < (7 * (24 * 60)) / 37 - 1; i += (24 * 60) / 37) {
      const weeklySlice = data.slice(i, i + (24 * 60) / 37)
      weeklyAverages.push(calculateAverage(weeklySlice))
    }
    return weeklyAverages
  }

  function calculateAverage(data) {
    if (data.length === 0) return 0
    const sum = data.reduce((acc, currentValue) => acc + currentValue, 0)
    return sum / data.length
  }

  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={require('../../../assets/rain.gif')} />
      <View style={styles.textContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.par}>Current</Text>
          <Text style={styles.curr}>
            {rainData[0]}
            <Text style={styles.unit}>mm</Text>
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.par}>Average</Text>
          <Text style={styles.curr}>
            {average.toFixed(1)}
            <Text style={styles.unit}>mm</Text>
          </Text>
        </View>
      </View>

      {/* <LineChart
        data={data}
        width={Dimensions.get('window').width / 1.05}
        height={Dimensions.get('window').height / 3}
        yAxisSuffix=" mm"
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(51, 204, 204, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        bezier
      /> */}

      <View style={styles.chartContainer}>
        <TouchableOpacity
          style={chartType === 'daily' ? styles.buttonSelected : styles.button}
          onPress={() => setChartType('daily')}
        >
          <Text style={styles.buttonText}>Daily Chart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={chartType === 'weekly' ? styles.buttonSelected : styles.button}
          onPress={() => setChartType('weekly')}
        >
          <Text style={styles.buttonText}>Weekly Chart</Text>
        </TouchableOpacity>
      </View>
      {chartType === 'daily' ? (
        <LineChart
          data={{
            labels: [
              [extractTimeFromTimestamp(timeData[9])],
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              [extractTimeFromTimestamp(timeData[0])]
            ],
            datasets: [
              {
                data: reversedRain,
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                strokeWidth: 2
              }
            ]
          }}
          width={Dimensions.get('window').width / 1.05}
          height={Dimensions.get('window').height / 3}
          yAxisSuffix=" %"
          yAxisInterval={1}
          chartConfig={chartConfig}
          bezier
        />
      ) : (
        <BarChart
          data={chartData}
          width={Dimensions.get('window').width / 1.05}
          height={Dimensions.get('window').height / 3}
          chartConfig={chartConfig}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  icon: {
    height: 640 / 3.5,
    width: 640 / 3.5,
    marginBottom: Dimensions.get('window').height / 16
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center'
  },
  par: {
    fontSize: Dimensions.get('window').height / 23,
    fontFamily: 'sans-serif-thin'
  },
  curr: {
    fontSize: Dimensions.get('window').height / 16,
    fontFamily: 'sans-serif-light',
    marginBottom: Dimensions.get('window').height / 9
  },
  unit: {
    fontSize: Dimensions.get('window').height / 23,
    fontFamily: 'sans-serif-thin'
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  button: {
    width: Dimensions.get('window').width / 2.5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  buttonSelected: {
    width: Dimensions.get('window').width / 2.5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  buttonText: {
    color: 'white'
  }
})

export default RainScreen
