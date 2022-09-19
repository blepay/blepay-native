// import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
// 
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import {
  Gluten_400Regular,
  Gluten_500Medium,
  Gluten_700Bold,
} from "@expo-google-fonts/gluten";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

let phrase = [];

export default function RegisterDomain({ navigation }) {
  //   let [fontsLoaded] = useFonts({
  //     Gluten_400Regular,
  //     Gluten_500Medium,
  //     Gluten_700Bold,
  //     Montserrat_400Regular,
  //     Montserrat_500Medium
  //   });

  const [notityText, setNotifyText] = useState(
    "Password mismatch, Please try again"
  );
  const [buttonList, setButtonList] = useState([]);
  const [pwdList, setPwdList] = useState([]);
  const [confirmPwdList, setConfirmPwdList] = useState([]);
  const [isPwdSet, SetPwd] = useState(true);
  const [PwdSetStep, SetPwdSetStep] = useState(1);
  const [notifyVisible, setNotifyVisible] = useState(false);

  const setNotificationVisible = () => {
    if (notifyVisible) return;
    setNotifyVisible(true);
  };

  const hideNotificationVisible = () => {
    setNotifyVisible(false);
  };

  const operationPwdList = async (item) => {
    if (item === "back" && pwdList.length == 0) return;
    if (item === "back") {
      if (isPwdSet) {
        pwdList.pop();
        setPwdList([...pwdList]);
        return;
      } else {
        if (PwdSetStep === 1) {
          pwdList.pop();
          setPwdList([...pwdList]);
          return;
        } else if (PwdSetStep === 2) {
          confirmPwdList.pop();
          setConfirmPwdList([...confirmPwdList]);
          return;
        }
      }
    }
    if (PwdSetStep === 2) {
      setConfirmPwdList([...confirmPwdList, item]);
    } else {
      setPwdList([...pwdList, item]);
    }
  };

  if (false) {
    return <View></View>;
  } else
    return (
      <View style={styles.container}>
        <Notification
        hideNotify={hideNotificationVisible}
        visible={notifyVisible}
        content={{
          text: notityText,
        }}
      ></Notification>
        {/* <StatusBar style="auto" /> */}
        <View style={[styles.box, styles.absoluteCenter]}>
          <SetPwdProgress step={PwdSetStep} />
        </View>
      </View>
    );
}

const SetPwdProgress = (props) => {
  useEffect(() => {}, [props.step]);
  return (
    <View
      style={[
        { width: "100%", marginTop: (10 / 390) * windowWidth },
        styles.absoluteCenter,
      ]}
    >
      <View style={styles.stepBar}>
        <View
          style={
            props.step === 2
              ? { backgroundColor: "#87C711", width: "50%", height: "100%" }
              : { width: "50%", height: "100%" }
          }
        ></View>
        <View style={{ width: "50%", height: "100%" }}></View>
      </View>
      <View style={{ marginBottom: (50 / 390) * windowWidth }}>
        {props.step === 1 ? (
          <View style={styles.absoluteCenter}>
            <Text style={styles.font24B}>Register your blepay domain name</Text>

            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logoIcon}
            />
            <Text style={styles.blePayText}>blepay</Text>
            <View style={styles.inputContainer}>
            <Text style={styles.prefix}>_</Text>
              <TextInput style={styles.input} placeholder="domainname" />
              <Text style={styles.closeButtonParent}>.ble</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.font24B}>Confirm your passcode</Text>
        )}
      </View>
      <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegisterDomain')}>
        <Text style={styles.textInput}>{'Confirm'}</Text>
      </TouchableOpacity>    
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegisterDomain')}>
        <Text style={styles.textInput}>{'Cancel'}</Text>
      </TouchableOpacity> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFDF4",
    alignItems: "center",
  },
  pwdBtn: {
    width: 64,
    height: (64 / 390) * windowWidth,
    borderRadius: (32 / 390) * windowWidth,
  },
  pwdRow: {
    width: "100%",
    justifyContent: "space-around",
    marginBottom: (20 / 390) * windowWidth,
  },
  hideContainer: {
    display: "none",
  },
  input: {
    height: "50%",
    backgroundColor: "white",
    alignItems: "center",
    paddingLeft: 16,
    width: "50%",
  },
  stepBar: {
    backgroundColor: "#DAEFA9",
    height: 1,
    marginBottom: (50 / 390) * windowWidth,
    width: "90%",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#dde6c6",
    borderRadius: 8,
    width: 69,
    height: (28 / 390) * windowWidth,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat_500Medium",
    fontSize: (12 / 390) * windowWidth,
    color: "#000000",
  },
  font24B: {
    fontFamily: "Montserrat_400Regular",
    fontSize: (20 / 390) * windowWidth,
    color: "#000000",
  },
  font12B: {
    fontFamily: "Montserrat_400Regular",
    fontSize: (12 / 390) * windowWidth,
    color: "#000000",
  },
  widthheight100: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  glutenFont: {
    fontFamily: "Gluten_400Regular",
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
  flexRow: {
    flexDirection: "row",
  },
  hideContainer: {
    display: "none",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  fSize700Bold: {
    fontFamily: "Gluten_700Bold",
  },
  font24White: {
    textAlign: "center",
    fontFamily: "Gluten_700Bold",
    fontSize: (24 / 390) * windowWidth,
    color: "#ffffff",
  },
  logoIcon: {
    width: (44 / 390) * windowWidth,
    height: (33 / 390) * windowWidth,
  },
  input: {
    // borderColor: "gray",
    // width: "100%",
    // borderWidth: 1,
    // borderRadius: 10,
    // padding: 10,
  },
  inputContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 10,
    width: 0.8 * windowWidth,
  },
  closeButtonParent: {
    position: "absolute",
    right: "10%",
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
  prefix: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: 'black',
    // position: 'absolute',
    // left: '10%'
  }
});
