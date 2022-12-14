import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
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
import { TrxProgressPopup } from "../popup/TxProgressPopup";
import { ModalBox } from "../popup/Modal";
import { SelectNft } from "../popup/SelectNFT";
const windowWidth = Dimensions.get("window").width;
const selectOptList = [
  {
    key: 0,
    word: "USDC",
  },
  {
    key: 1,
    word: "BNB",
  },
  {
    key: 2,
    word: "ETH",
  },
];
const TokenRoute = (props) => {
  const selectDropDownOpt = (opt) => {
    setDropDownSelectOpt(opt);
    setDropDownVisible(false);
  };
  const [dropdownVisible, setDropDownVisible] = useState(false);
  const [dropdownSelectOpt, setDropDownSelectOpt] = useState(selectOptList[0]);
  return (
    <View style={styles.tokenPageBox}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="0.00" />
        <TouchableOpacity
          style={styles.selectTokenBar}
          onPress={() => setDropDownVisible(!dropdownVisible)}
        >
          <Image
            source={require("../assets/images/solana.png")}
            style={{
              width: 24,
              height: 24,
            }}
          />
          <Text style={styles.selectTokenText}> {dropdownSelectOpt.word}</Text>
          <Image
            source={require("../assets/images/arrow-down.png")}
            style={[
              { width: 13, height: 7, marginLeft: 10 },
              dropdownVisible ? { transform: [{ rotate: "180deg" }] } : {},
            ]}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.buyBtn,
          styles.marketFilterItem,
          {
            width: 115,
            height: (120 / 390) * windowWidth,
            marginTop: 8,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-around",
            right: 0,
            position: "absolute",
          },
          !dropdownVisible ? styles.hideContainer : {},
        ]}
        onPress={() => setFilterVisiable(true)}
      >
        <Text
          style={[
            styles.fSize12Black,
            { textAlign: "center", width: "80%" },
            dropdownSelectOpt.key === selectOptList[0].key
              ? styles.selectedOpt
              : {},
          ]}
          onPress={() => {
            selectDropDownOpt(selectOptList[0]);
          }}
        >
          {selectOptList[0].word}
        </Text>
        <Text
          style={[
            styles.fSize12Black,
            { textAlign: "center", width: "80%" },
            dropdownSelectOpt.key === selectOptList[1].key
              ? styles.selectedOpt
              : {},
          ]}
          onPress={() => {
            selectDropDownOpt(selectOptList[1]);
          }}
        >
          {selectOptList[1].word}
        </Text>
        <Text
          style={[
            styles.fSize12Black,
            { textAlign: "center", width: "80%" },
            dropdownSelectOpt.key === selectOptList[2].key
              ? styles.selectedOpt
              : {},
          ]}
          onPress={() => {
            selectDropDownOpt(selectOptList[2]);
          }}
        >
          {selectOptList[2].word}
        </Text>
      </TouchableOpacity>
      <View style={styles.balanceBox}>
        <Text style={styles.balanceText}>Balance: 120</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.balanceText}>Recepient</Text>
        <View style={styles.addrTextBox}>
          <Text style={styles.addrText}>_cryptowoo.ble</Text>
        </View>
        <View>
          <Text style={styles.realAddrText}>
            HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH
          </Text>
        </View>
      </View>
      <View style={styles.btnList}>
        <TouchableOpacity
          style={[styles.button, styles.cancelBtn]}
          onPress={() => navigation.navigate("ImportWallet")}
        >
          <Text style={[styles.textInput, { color: "#58C0E1" }]}>
            {"Cancel "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { marginTop: (36 / 390) * windowWidth }]}
          onPress={() => {}}
        >
          <Text style={styles.textInput}>{"Confirm "}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const NftRoute = () => {
  const [isShowSpousePopup, SetSpouseSelectPopup] = useState(false);
  const [selectedNft, SetSelectNft] = useState({
    id: "#78",
    type: "Doodles",
  });
  const hideSpousePopup = () => {
    SetSpouseSelectPopup(false);
    // SetBreedPopup(true);
  };
  const showSpousePopup = () => {
    SetSpouseSelectPopup(true);
    // SetBreedPopup(true);
  };
  const setSelectedMonster = (item) => {
    console.log("has selected", item);
    SetSelectNft(item);
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <ModalBox visible={isShowSpousePopup}>
        <SelectNft
          close={hideSpousePopup}
          setSelectedMonster={setSelectedMonster}
        />
      </ModalBox>
      <Image
        source={require("../assets/images/nft-big.png")}
        style={styles.nftCover}
      />
      <TouchableOpacity style={styles.inputContainer} onPress={showSpousePopup}>
        <Image
          source={require("../assets/images/nft.png")}
          style={styles.nftSmallIcon}
        />
        <View style={styles.selectTokenBar}>
          <Text style={styles.selectTokenText}>
            {selectedNft.type} {selectedNft.id}
          </Text>
          <Image
            source={require("../assets/images/arrow-down.png")}
            style={{
              width: 13,
              height: 7,
            }}
          />
        </View>
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.balanceText}>Recepient</Text>
        <View style={[styles.addrTextBox, { marginTop: 10, marginBottom: 10 }]}>
          <Text style={styles.addrText}>_cryptowoo.ble</Text>
        </View>
        <View>
          <Text style={styles.realAddrText}>
            HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH
          </Text>
        </View>
      </View>
      <View style={[styles.btnList, { bottom: "3%" }]}>
        <TouchableOpacity style={[styles.button, styles.cancelBtn]}>
          <Text style={[styles.textInput, { color: "#58C0E1" }]}>
            {"Cancel "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { marginTop: (36 / 390) * windowWidth }]}
        >
          <Text style={styles.textInput}>{"Confirm "}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const renderScene = SceneMap({
  token: TokenRoute,
  nft: NftRoute,
});

const _renderTabBar = (props) => {
  const inputRange = props.navigationState.routes.map((x, i) => i);
  return (
    <View style={styles.tabBar}>
      {props.navigationState.routes.map((route, i) => {
        console.log(route, i == props.navigationState.index);
        return (
          <TouchableOpacity
            style={[
              styles.tabItem,
              props.navigationState.index === i
                ? styles.activeTypeTab
                : styles.unactiveTypeTab,
            ]}
          >
            <Text
              style={
                props.navigationState.index === i
                  ? { color: "white", position: "absolute" }
                  : { color: "#58C0E1", position: "absolute" }
              }
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const initialLayout = { width: Dimensions.get("window").width };

import { TabView, SceneMap } from "react-native-tab-view";

const SendToken = (props) => {
  let [fontsLoaded] = useFonts({
    ReadexPro_200ExtraLight,
    ReadexPro_300Light,
    ReadexPro_400Regular,
    ReadexPro_500Medium,
    ReadexPro_600SemiBold,
    ReadexPro_700Bold,
  });
  const [index, setIndex] = React.useState(0);
  const [isShowTrxPopup, setTrxPopupVisible] = React.useState(false);
  const navigation = useNavigation();

  const enterImportWallet = () => {
    navigation.push("ImportWallet");
  };

  return (
    <View style={styles.tabContainer}>
      <TrxProgressPopup
        visible={isShowTrxPopup}
        content={{
          title: "Spending Account",
          content:
            "Users need Solana in this account to make any purchase on the Marketplace",
        }}
      ></TrxProgressPopup>
      <WalletTab index={index} setIndex={setIndex} />
    </View>
  );
};

const WalletTab = (props) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "token", title: "Send Token" },
    { key: "nft", title: "Send Nft" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={_renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.walletTab}
    />
  );
};

export default SendToken;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  spaceBetween: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addr: {
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 32,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: 130,
    height: 27,
    flexDirection: "row",
  },
  wallet: {
    position: "absolute",
    right: "10%",
    width: 200,
    height: 80,
    backgroundColor: "blue",
  },
  walletTab: {
    width: "80%",
  },
  tabBar: {
    flexDirection: "row",
    height: (40 / 390) * windowWidth,
    borderRadius: (40 / 390) * windowWidth,
    overflow: "hidden",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  absoluteCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  widthHeight100: {
    width: "100%",
    height: "100%",
  },
  spaceAround: {
    justifyContent: "space-around",
  },
  flexRow: {
    flexDirection: "row",
  },
  textInput: {
    color: "white",
    fontSize: (14 / 390) * windowWidth,
    fontFamily: "ReadexPro_500Medium",
  },
  token: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  tab: {
    borderRadius: 20,
  },
  inputContainer: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 10,
    width: 0.8 * windowWidth,
    height: (60 / 390) * windowWidth,
    marginTop: (20 / 390) * windowWidth,
    marginBottom: (20 / 390) * windowWidth,
  },
  selectTokenBar: {
    position: "absolute",
    right: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "30%",
  },
  button: {
    backgroundColor: "#58C0E1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 40,
    height: (40 / 390) * windowWidth,
    width: "48%",
    marginTop: (36 / 390) * windowWidth,
    textAlign: "center",
    alignItems: "center",
  },
  balanceText: {
    color: "#94A3B8",
    textAlign: "left",
    fontFamily: "ReadexPro_400Regular",
  },
  addrText: {
    color: "#000000",
    fontFamily: "ReadexPro_500Medium",
  },
  addrTextBox: {
    width: (133 / 390) * windowWidth,
    height: (32 / 390) * windowWidth,
    backgroundColor: "#EFF6FF",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: (20 / 390) * windowWidth,
    borderColor: "#58C0E1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: (20 / 390) * windowWidth,
    marginTop: (22 / 390) * windowWidth,
  },
  realAddrText: {
    width: (268 / 390) * windowWidth,
    letterSpacing: 0.5,
    color: "#94A3B8",
    fontFamily: "ReadexPro_500Medium",
  },
  input: {
    height: "50%",
    backgroundColor: "white",
    alignItems: "center",
    paddingLeft: 16,
    width: "50%",
  },
  selectTokenText: {
    color: "#000000",
    fontFamily: "ReadexPro_500Medium",
  },
  btnList: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 0.8 * windowWidth,
    position: "absolute",
    bottom: "10%",
  },
  activeTypeTab: {
    backgroundColor: "#58C0E1",
    color: "white",
  },
  unactiveTypeTab: {
    borderWidth: 1,
    borderColor: "#94A3B8",
    borderStyle: "solid",
    overflow: "hidden",
    backgroundColor: "white",
  },
  balanceBox: {
    textAlign: "left",
    width: "100%",
    marginBottom: (36 / 390) * windowWidth,
  },
  tokenPageBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-30%",
  },
  cancelBtn: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    borderStyle: "solid",
  },
  nftCover: {
    width: "100%",
    marginTop: (20 / 390) * windowWidth,
    height: (288 / 390) * windowWidth,
    borderRadius: 20,
  },
  nftSmallIcon: {
    borderRadius: (10 / 390) * windowWidth,
    width: (48 / 390) * windowWidth,
    height: (48 / 390) * windowWidth,
    marginLeft: 10,
  },
  tabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    paddingTop: getStatusBarHeight(),
  },
  buyBtn: {
    backgroundColor: "white",
    borderRadius: (20 / 390) * windowWidth,
    fontFamily: "Gluten_700Bold",
    textAlign: "center",
    height: (25 / 390) * windowWidth,
    width: 115,
  },
  marketFilterItem: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#87c711",
    margin: 0,
    width: "23.9%",
    height: (28 / 390) * windowWidth,
  },
  hideContainer: {
    display: "none",
  },
});
