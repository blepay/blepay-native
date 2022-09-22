import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function ModalBox({ visible, containerStyle, children, close }) {
  const [showDialog, setShowDialog] = React.useState(visible);
  console.log("show", showDialog);
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
        <TouchableHighlight
          style={containerStyle ? containerStyle : styles.dialogContainer}
        >
          <View style={{ height: "100%" }}>{children}</View>
        </TouchableHighlight>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  dialogBackground: {
    flex: 1,
    backgroundColor: "rgba(18, 31, 0, 0.75)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  dialogContainer: {
    // pointerEvents: "none",r
    backgroundColor: "white",
    width: 0.9 * windowWidth,
    height: (612 / 844) * windowHeight,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    zIndex: 10000,
  },
});
