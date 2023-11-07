import React, { useState } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { LineChart, BarChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

const TempScreen = ({ navigation, route }) => {
  const { temperatureData, timeData } = route.params
  const reversedTemp = temperatureData.slice(0, 10).reverse() // Reversed copy of the data

  // Calculate the sum of all values in the reversedTemp array
  const sum = reversedTemp.reduce((acc, currentValue) => acc + currentValue, 0)

  // Calculate the daily, weekly, and monthly averages
  const dailyAverage = calculateAverage(reversedTemp)
  const weeklyData = calculateWeeklyAverage(temperatureData)
  const weeklyAverage = calculateAverage(weeklyData)
  const monthlyData = calculateMonthlyAverage(temperatureData)
  const monthlyAverage = calculateAverage(monthlyData)

  const [chartType, setChartType] = useState('daily')

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

  const weeklyChartData = {
    labels: Array.from({ length: weeklyData.length }, (_, i) =>
      (i + 1).toString()
    ),
    datasets: [
      {
        data: weeklyData,
        color: (opacity = 1) => `rgba(204, 204, 204, ${opacity})`,
        barPercentage: 0.9,
        label: 'Weekly'
      }
    ]
  }

  const monthlyChartData = {
    labels: Array.from({ length: monthlyData.length }, (_, i) =>
      (i + 1).toString()
    ),
    datasets: [
      {
        data: monthlyData,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        barPercentage: 0.9,
        label: 'Monthly'
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

  function calculateWeeklyAverage(data) {
    const weeklyAverages = []
    for (let i = 0; i < (7 * (24 * 60)) / 37 - 1; i += (24 * 60) / 37) {
      const weeklySlice = data.slice(i, i + (24 * 60) / 37)
      weeklyAverages.push(calculateAverage(weeklySlice))
    }
    return weeklyAverages
  }

  function calculateMonthlyAverage(data) {
    const monthlyAverages = []
    for (let i = 0; i < (30 * (24 * 60)) / 37 - 1; i += (7 * (24 * 60)) / 37) {
      const monthlySlice = data.slice(i, i + (7 * (24 * 60)) / 37)
      monthlyAverages.push(calculateAverage(monthlySlice))
    }
    return monthlyAverages
  }

  function calculateAverage(data) {
    if (data.length === 0) return 0
    const sum = data.reduce((acc, currentValue) => acc + currentValue, 0)
    return sum / data.length
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require('../../../assets/temperature.gif')}
      />
      <View style={styles.textContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.par}>Current</Text>
          <Text style={styles.curr}>
            {temperatureData[0]}
            <Text style={styles.unit}>°C</Text>
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.par}>Average</Text>
          <Text style={styles.curr}>
            {chartType === 'daily'
              ? dailyAverage.toFixed(1)
              : chartType === 'weekly'
              ? weeklyAverage.toFixed(1)
              : monthlyAverage.toFixed(1)}
            <Text style={styles.unit}>°C</Text>
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={chartType === 'daily' ? styles.buttonSelected : styles.button}
          onPress={() => setChartType('daily')}
        >
          <Text style={styles.buttonText}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={chartType === 'weekly' ? styles.buttonSelected : styles.button}
          onPress={() => setChartType('weekly')}
        >
          <Text style={styles.buttonText}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            chartType === 'monthly' ? styles.buttonSelected : styles.button
          }
          onPress={() => setChartType('monthly')}
        >
          <Text style={styles.buttonText}>Monthly</Text>
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
                data: reversedTemp,
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                strokeWidth: 2
              }
            ]
          }}
          width={Dimensions.get('window').width / 1.05}
          height={Dimensions.get('window').height / 3}
          yAxisSuffix="°C"
          yAxisInterval={1}
          chartConfig={chartConfig}
          bezier
        />
      ) : chartType === 'weekly' ? (
        <BarChart
          data={weeklyChartData}
          width={Dimensions.get('window').width / 1.05}
          height={Dimensions.get('window').height / 3}
          chartConfig={chartConfig}
        />
      ) : (
        <BarChart
          data={monthlyChartData}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width / 1.2,
    marginBottom: 10
  },

  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    marginLeft: 5
  },

  buttonSelected: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    marginLeft: 5
  },
  buttonText: {
    color: 'white'
  }
})

export default TempScreen
