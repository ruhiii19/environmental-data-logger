import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Button
} from 'react-native'

const movieURL = 'https://irflabs.in/gedl/edllogin.php?userId=abcd&pass=d1234'

const GetData = ({ navigation }) => {
  // managing state with 'useState'
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [multiIdNotEmpty, setMultiIdNotEmpty] = useState(false)

  // similar to 'componentDidMount', gets called once
  useEffect(() => {
    fetch(movieURL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json)
        checkMultiIdNotEmpty(json)
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => {
        setLoading(false)
      }) // change loading state
  }, [])

  const checkMultiIdNotEmpty = (json) => {
    const multiId = json.map((item) => item.DevId)
    if (multiId.length > 0) {
      setMultiIdNotEmpty(true)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text>JSON Data:</Text>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text>{JSON.stringify(item, null, 2)}</Text>
            )}
          />

          {multiIdNotEmpty && (
            <View>
              {data.map((item, index) => (
                <Button
                  key={index}
                  title={`DevId: ${item.DevId}`}
                  onPress={() =>
                    navigation.navigate('MultiUser', { name: 'MultiUser' })
                  }
                />
              ))}
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 48
  },
  movieText: {
    fontSize: 26,
    fontWeight: '200'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  description: {
    textAlign: 'center',
    marginBottom: 18,
    fontWeight: '200',
    color: 'green'
  }
})

export default GetData
