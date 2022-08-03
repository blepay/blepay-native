import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  Button,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const BluetoothModule = ({}) => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logoIcon}
      />
      <Text style={styles.blePayText}>blepay</Text>
      <Text style={styles.subText}>
        Your go-to choice for offline crypto payment
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BluetoothMainScreen')}>
        <Text style={styles.textInput}>{'Create new wallet '}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BluetoothMainScreen')}>
        <Text style={styles.textInput}>{'Import existing wallet '}</Text>
      </TouchableOpacity> 
    </View>
  );
};

export default BluetoothModule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fbfc',
    justifyContent: 'center',
  },
  textInput: {
    color: 'white',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#58C0E1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 40,
    height: (40 / 390) * windowWidth,
    width: 200,
    marginHorizontal: 20,
    marginVertical: 10,
    textAlign: 'center',
    alignItems: 'center'
  },
  logoIcon: {
    width: 130,
    height: (104 / 390) * windowWidth,
  },
  blePayText: {
    fontSize: (39 / 390) * windowWidth,
    textAlign: 'center',
    color: '#2A245F',
  },
  subText: {
    fontSize: (14 / 390) * windowWidth,
    textAlign: 'center',
    color: '#2A245F',
    marginTop: 20,
    marginBottom: 20
  },
});
