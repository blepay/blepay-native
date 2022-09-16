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
import {
  useFonts,
  ReadexPro_200ExtraLight,
  ReadexPro_300Light,
  ReadexPro_400Regular,
  ReadexPro_500Medium,
  ReadexPro_600SemiBold,
  ReadexPro_700Bold,
} from '@expo-google-fonts/readex-pro';
import AppLoading from 'expo-app-loading';

const windowWidth = Dimensions.get('window').width;

const Home = ({}) => {
  let [fontsLoaded] = useFonts({
    ReadexPro_200ExtraLight,
    ReadexPro_300Light,
    ReadexPro_400Regular,
    ReadexPro_500Medium,
    ReadexPro_600SemiBold,
    ReadexPro_700Bold,
  });
  const navigation = useNavigation();
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
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
      <View style={styles.btnList}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateWallet')}>
        <Text style={styles.textInput}>{'Create new wallet '}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {marginTop: 36/390 * windowWidth}]}
        onPress={() => navigation.navigate('ImportWallet')}>
        <Text style={styles.textInput}>{'Import existing wallet '}</Text>
      </TouchableOpacity> 
      </View>
    </View>
  );
  }
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fbfc',
    justifyContent: 'center',
  },
  textInput: {
    color: 'white',
    fontSize: 14/390 * windowWidth,
    fontFamily: 'ReadexPro_400Regular'
  },
  button: {
    backgroundColor: '#58C0E1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 40,
    height: (40 / 390) * windowWidth,
    width: 200/390 * windowWidth,
    marginHorizontal: 20,
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: 'ReadexPro_400Regular',
    alignItems: 'center'
  },
  logoIcon: {
    width: 112/390 * windowWidth,
    height: (84 / 390) * windowWidth,
  },
  blePayText: {
    fontSize: (39 / 390) * windowWidth,
    textAlign: 'center',
    color: '#2A245F',
    fontFamily: 'ReadexPro_600SemiBold'
  },
  subText: {
    fontSize: (14 / 390) * windowWidth,
    textAlign: 'center',
    color: '#2A245F',
    marginTop: 20,
    marginBottom: 20,
    maxWidth: 158/390 * windowWidth
  },
  btnList:{
    marginTop:'20%'
  }
});
