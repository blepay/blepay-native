import React, { } from 'react';
import {
  View, StyleSheet, StatusBar, LogBox, TouchableHighlight
} from 'react-native';
import AppContainer from './src/navigator/AppNavigator';
import 'react-native-gesture-handler';



LogBox.ignoreAllLogs(true)
export default function RNApp() {

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#f7fbfc"} barStyle='dark-content' />
      <AppContainer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fbfc",
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: "black",
    marginVertical: 20,
    marginHorizontal: 10
  }
})