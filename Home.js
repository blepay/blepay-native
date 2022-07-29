import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, View} from 'react-native';
import React from "react";

export function HomeScreen({navigation}) {

  const hello = () => {
    console.log('hello');
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <Button title='hello' onPress={() => hello()}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
