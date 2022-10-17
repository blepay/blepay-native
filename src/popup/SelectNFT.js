import React from "react";
import { useState, Component, useEffect } from "react";

import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Text,
  Dimensions,
} from "react-native";
import {
  useFonts,
  ReadexPro_200ExtraLight,
  ReadexPro_300Light,
  ReadexPro_400Regular,
  ReadexPro_500Medium,
  ReadexPro_600SemiBold,
  ReadexPro_700Bold,
} from "@expo-google-fonts/readex-pro";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const SelectNft = (props) => {
  let [fontsLoaded] = useFonts({
    ReadexPro_200ExtraLight,
    ReadexPro_300Light,
    ReadexPro_400Regular,
    ReadexPro_500Medium,
    ReadexPro_600SemiBold,
    ReadexPro_700Bold,
  });

  const { setSelectedMonster } = props;
  const [selectedItem, setSelectedItem] = useState({});
  const [nftList, setnftList] = useState([]);

  React.useEffect(() => {
    setnftList([
      {
        type: "Doodles",
        id: "#9391",
      },
      {
        type: "Doodles",
        id: "#9392",
      },
      {
        type: "Doodles",
        id: "#9377",
      },
      {
        type: "Doodles",
        id: "#9222",
      },
      {
        type: "Doodles",
        id: "#7777",
      },
      {
        type: "Doodles",
        id: "#99",
      },
      {
        type: "Doodles",
        id: "#9",
      },
      {
        type: "Doodles",
        id: "#1",
      },
      {
        type: "Doodles",
        id: "#9671",
      },
    ]);
  }, []);

  const selectCurrentMonster = (item) => {
    console.log(item);
    setSelectedItem(item);
  };

  const confirmSelected = () => {
    setSelectedMonster(selectedItem);
  };

  const renderMonsterItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.breedBox,
          { overflow: "hidden" },
          selectedItem.id === item.id ? styles.selectedBorder : {},
        ]}
        onPress={() => {
          selectCurrentMonster(item);
        }}
      >
        <View style={[styles.widthHeight100]}>
          <Image
            source={require("../assets/images/nft.png")}
            style={{
              width: "100%",
              height: (80 / 390) * windowWidth,
            }}
          />
          <View style={[styles.monsterCardOperationBox]}>
            <Text style={styles.nftText}>{item.type}</Text>
            <Text style={styles.nftText}>{item.id}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[{ height: "100%" }]}>
      <View style={styles.monsterInfoBoxHeader}>
        <TouchableOpacity
          onPress={() => props.close()}
          style={[styles.rightAbsolute, { right: 0, zIndex: 100 }]}
        >
          <View>
            <Image
              source={require("../assets/images/close.png")}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.popupTitle}>Select NFT</Text>
      </View>
      <SafeAreaView style={[styles.levelBox]}>
        <FlatList
          numColumns={2}
          data={nftList}
          renderItem={renderMonsterItem}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          style={{
            flexGrow: 0,
          }}
        />
      </SafeAreaView>
      <View style={[styles.scrollBox]}>
        <TouchableOpacity
          style={[styles.button, styles.cancelBtn]}
          onPress={() => navigation.navigate("ImportWallet")}
        >
          <Text style={[styles.textInput, { color: "#58C0E1" }]}>
            {"Cancel "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => {
            confirmSelected();
            props.close();
          }}
        >
          <Text style={styles.textInput}>{"Confirm "}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  alignCenter: {
    alignItems: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  levelBox: {
    overflow: "scroll",
    marginLeft: "auto",
    marginRight: "auto",
    height: "68%",
    paddingBottom: "5%",
    width: "92%",
  },
  glutenFont: {
    fontFamily: "Gluten_400Regular",
  },
  subtitle: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 12,
    // lineHeight: "100%",
    marginBottom: 27,
    color: "#999999",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
  breedBox: {
    width: "46%",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#daefa9",
    height: (141 / 390) * windowWidth,
    marginBottom: 20,
    position: "relative",
  },
  fSize16Black: {
    fontFamily: "Gluten_500Medium",
    fontSize: (16 / 390) * windowWidth,
    color: "#000000",
  },
  scrollBox: {
    flexDirection: "row",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "space-between",
    alignItems: "center",
    height: (80 / 390) * windowWidth,
    borderStyle: "solid",
  },
  monsterCardOperationBox: {
    position: "absolute",
    left: 10,
    bottom: "2%",
    width: "100%",
    height: (42 / 390) * windowWidth,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  fSize12Black: {
    fontFamily: "Gluten_400Regular",
    fontSize: (12 / 390) * windowWidth,
    color: "#000000",
  },
  selectedBorder: {
    borderStyle: "solid",
    borderWidth: 4,
    borderColor: "#58C0E1",
  },
  MonsterCardInfoBox: {
    width: "90%",
    top: "50%",
    paddingBottom: "5%",
    borderRadius: (20 / 390) * windowWidth,
    transform: [{ translateY: -0.5 }],
    backgroundColor: "white",
    position: "absolute",
  },
  absoluteCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  hideContainer: {
    display: "none",
  },
  monsterInfoBoxHeader: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    width: "86%",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 18,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  rightAbsolute: {
    position: "absolute",
    right: "10%",
  },
  fSize16Black: {
    fontFamily: "Gluten_700Bold",
    fontSize: (16 / 390) * windowWidth,
    color: "#000000",
  },
  widthHeight100: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  transferBtn: {
    height: 42,
    width: "44%",
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#87c711",
    borderRadius: (20 / 390) * windowWidth,
    margin: 0,
  },
  textInput: {
    color: "white",
    fontSize: (14 / 390) * windowWidth,
    fontFamily: "ReadexPro_500Medium",
  },
  popupTitle: {
    fontFamily: "ReadexPro_400Regular",
    fontSize: 24,
  },
  nftText: {
    fontFamily: "ReadexPro_500Medium",
    fontSize: 10,
    color: "black",
  },
  cancelBtn: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    borderStyle: "solid",
  },
  button: {
    backgroundColor: "#58C0E1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 40,
    height: (40 / 390) * windowWidth,
    width: "48%",
    textAlign: "center",
    alignItems: "center",
  },
});
