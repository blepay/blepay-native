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
import { getStatusBarHeight } from "react-native-status-bar-height";

const createDomain = ({}) => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.headerTab}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <View>
            <Image
              source={require("../assets/images/arrow-left.png")}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={[
            styles.fSize700Bold,
            {
              fontSize: 20,
              color: "black",
            },
          ]}
        >
          Setting
        </Text>
      </View>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logoIcon}
      />
      <Text style={styles.blePayText}>blepay</Text>
      <Text style={styles.subText}>
      Choose your domain name plan
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegisterDomain')}>
        <Text style={styles.textInput}>{'Free .ble Domain '}</Text>
      </TouchableOpacity>
      <Text style={styles.textPoint}>All domains starts with _
        </Text>
      <Text style={styles.textPoint}>One phone number can register up to 10 wallets</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BluetoothMainScreen')}>
        <Text style={styles.textInput}>{'Premium .ble Domain'}</Text>
      </TouchableOpacity> 
      <Text style={styles.textPoint}>Coming Soon
        </Text>
      <Text style={styles.textPoint}>No phone number verification required
</Text>
<Text style={styles.textPoint}>Domain name start with any character except _
</Text>
<Text style={styles.textPoint}>Unlimited domains
</Text>
    </View>
  );
};

export default createDomain;

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
  textPoint: {
    color: '#94A3B8',
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
  container: {
    flex: 1,
    backgroundColor: "#FEFDF4",
    alignItems: "center",
  },
  input: {
    height: "50%",
    backgroundColor: "white",
    alignItems: "center",
    paddingLeft: 16,
    width: "50%",
  },
  fSize700Bold: {
    fontFamily: "Gluten_700Bold"
  },
  glutenFont: {
    fontFamily: "Gluten",
  },
  warningText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 12,
    color: "#BA1B1B",
    marginLeft: 8,
  },
  absoluteCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerTab: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    textAlign: "center",
    justifyContent: "center",
    marginTop: getStatusBarHeight() + 20,
  },
  box: {
    width: "90%",
    paddingTop: 40,
  },
  transferBtn: {
    width: 259,
    height: 49,
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#87c711",
    borderStyle: "solid",
    borderRadius: 22,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 23,
    position: "absolute",
    bottom: 52,
  },
  word: {},
  flexRow: {
    flexDirection: "row",
  },
  hideContainer: {
    display: "none",
  },
  swapHead: {
    backgroundColor: "#DAEFA9",
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 26,
    paddingRight: 26,
  },
  swapBottom: {
    backgroundColor: "white",
    height: 70,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: "#daefa9",
    borderStyle: "solid",
    justifyContent: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  swapContainer: {
    borderRadius: 20,
    backgroundColor: "white",
    marginBottom: 20,
  },
  font12Black: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 12,
    color: "#000000",
  },
  font12BlackThin: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 12,
    color: "#000000",
  },
  maxBtn: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#daefa9",
    borderStyle: "solid",    borderRadius: 20,
    paddingTop: "5%",
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingBottom: "5%",
  },
  token: {
    width: 24,
    height: 24,
    marginLeft: 8,
    marginRight: 8,
  },
  subtitle: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 10,
    color: "#999999",
  },
});
