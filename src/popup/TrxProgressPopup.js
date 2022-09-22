import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Image,
} from "react-native";

export function TrxProgressPopup({ visible, containerStyle, close, content }) {


  const [showDialog, setShowDialog] = React.useState(visible);
  React.useEffect(() => {
    setShowDialog(visible);
  }, [visible]);


  return (
    <Modal transparent visible={showDialog} statusBarTranslucent>
      <TouchableOpacity
        onPress={() => {
          close && close();
        }}
        style={styles.dialogBackground}
      >
        <View style={containerStyle ? containerStyle : styles.dialogContainer}>
            <Image
            source={require("../assets/images/loading.gif")}
            style={{
                width: 68,
                height: 68,
            }}
            />
            <Text>Processing transaction...</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  dialogBackground: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogContainer: {
    // pointerEvents: "none",
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    zIndex: 10000,
    justifyContent: 'center',
    alignItems: 'center'
  },
  font12BlackThin: {
    fontFamily: "Montserrat_300Light",
    fontSize: 12,
    // lineHeight: 24,
    color: "#000000",
  },
  textDeco: {
    backgroundColor: '#DAEFA9',
    width: '100%',
    position: 'absolute',
    height: 8,
    bottom: 0
  },
  titleBox: {
    position: 'relative',
    minWidth: 144,
    marginLeft: 'auto',
    overflow: 'hidden',
    marginRight: 'auto'
  },
  fSize16Black: {
    fontFamily: "Gluten_700Bold",
    fontSize: 16,
    color: "#000000",
  },
});
