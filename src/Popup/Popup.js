import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Dimensions,
  Image,
} from "react-native";
import { useState, Component, useEffect } from "react";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
} from '@expo-google-fonts/montserrat';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const Popup = (props) => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium
  });

  const [modalVisible, setModalVisible] = useState(props.visible);

  const hideModal = () => {
    setTimeout(() => {
      props.hideNotify();
    }, 1000);
  };
  useEffect(() => {
    setModalVisible(props.visible);
    if (props.visible) hideModal();
  }, [props.visible]);
  return (
    <Modal transparent visible={modalVisible} style={{position: 'relative'}}>
      <View style={styles.containerStyle}>
        <Text style={styles.fSize16Black}>{props.content.text}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    position: "absolute",
    width: '32%',
    height: 50/390 * windowWidth,
    top: "45%",
    bottom: 0,
    alignSelf: 'center',
    textAlign: "center",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    borderRadius: 10/390 * windowWidth,
    paddingBottom: '1%',
    paddingTop: '1%',
  },
  fSize16Black: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 12/390 * windowWidth,
    color: "white",
    textAlign: 'center'
  },
});
