import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  TouchableWithoutFeedback,
  FlatList,
  Button,
  useWindowDimensions,
  Dimensions,
  Image,
  StatusBar,
} from "react-native";
const windowWidth = Dimensions.get("window").width;


const nftList = [
  {
    name: "Doodles",
    id: "#9391",
  },
  {
    name: "Doodles",
    id: "#9391",
  },
  {
    name: "Doodles",
    id: "#9391",
  },
  {
    name: "Doodles",
    id: "#9391",
  },
  {
    name: "Doodles",
    id: "#9391",
  },
  {
    name: "Doodles",
    id: "#9391",
  },
];

const renderNftItem = (item) => {
  return (
    <View style={{ width: "30%" }}>
      <Image
        source={require("../assets/images/nft.png")}
        style={{
          width: 89,
          height: 89,
        }}
      />
      <View>
        <Text>Doodles</Text>
      </View>
      <View>
        <Text>#9391</Text>
      </View>
    </View>
  );
};

const TokenRoute = () => (
  <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
    <View
      style={[
        styles.spaceBetween,
        { width: "80%", paddingTop: 15, paddingBottom: 15 },
      ]}
    >
      <View
        style={[styles.spaceBetween, { width: "20%", alignItems: "center" }]}
      >
        <Image
          source={require("../assets/images/solana.png")}
          style={{
            width: 24,
            height: 24,
          }}
        />
        <Text>SOL</Text>
      </View>
      <Text>120.4</Text>
    </View>
    <View
      style={[
        styles.spaceBetween,
        { width: "80%", paddingTop: 15, paddingBottom: 15 },
      ]}
    >
      <View
        style={[styles.spaceBetween, { width: "20%", alignItems: "center" }]}
      >
        <Image
          source={require("../assets/images/solana.png")}
          style={{
            width: 24,
            height: 24,
          }}
        />
        <Text>SOL</Text>
      </View>
      <Text>120.4</Text>
    </View>
    <View
      style={[
        styles.spaceBetween,
        { width: "80%", paddingTop: 15, paddingBottom: 15 },
      ]}
    >
      <View
        style={[styles.spaceBetween, { width: "20%", alignItems: "center" }]}
      >
        <Image
          source={require("../assets/images/solana.png")}
          style={{
            width: 24,
            height: 24,
          }}
        />
        <Text>SOL</Text>
      </View>
      <Text>120.4</Text>
    </View>
    <View
      style={[
        styles.spaceBetween,
        { width: "80%", paddingTop: 15, paddingBottom: 15 },
      ]}
    >
      <View
        style={[styles.spaceBetween, { width: "20%", alignItems: "center" }]}
      >
        <Image
          source={require("../assets/images/solana.png")}
          style={{
            width: 24,
            height: 24,
          }}
        />
        <Text>SOL</Text>
      </View>
      <Text>120.4</Text>
    </View>
  </View>
);

const NftRoute = () => (
  <View style={{ flex: 1 }}>
    <FlatList
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-around", paddingTop: '5%' }}
      style={{
        flexGrow: 0,
        height: "100%",
      }}
      data={nftList}
      renderItem={renderNftItem}
      keyExtractor={(item) => item.id}
    />
  </View>
);

const ActivitesRoute = () => (
  <View style={{ flex: 1 }}>
    <View style={styles.recordsBox}>
      <TouchableWithoutFeedback style={[styles.normalRecords]}>
        <View style={styles.recordsItemBox}>
          <View style={styles.flexRow}>
            <Image
              source={require("../assets/images/trx-success.png")}
              style={{
                width: 30,
                height: 30,
                marginRight: 11,
              }}
            />
            <View>
              <Text style={styles.fSize12gray}>516HV4W......Tj94Uqi</Text>
              <Text style={styles.fSize12Green}>Success</Text>
            </View>
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <Text style={styles.fSize10gray}>07/15/2022 14:51</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback style={[styles.normalRecords]}>
        <View style={styles.recordsItemBox}>
          <View style={styles.flexRow}>
            <Image
              source={require("../assets/images/trx-failed.png")}
              style={{
                width: 30,
                height: 30,
                marginRight: 11,
              }}
            />
            <View>
              <Text style={styles.fSize12gray}>516HV4W......Tj94Uqi</Text>
              <Text style={[styles.fSize12Green, { color: "#999" }]}>
                Failed
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <Text style={styles.fSize10gray}>07/15/2022 14:51</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback style={[styles.normalRecords]}>
        <View style={styles.recordsItemBox}>
          <View style={styles.flexRow}>
            <Image
              source={require("../assets/images/trx-pending.png")}
              style={{
                width: 30,
                height: 30,
                marginRight: 11,
              }}
            />
            <View>
              <Text style={styles.fSize12gray}>516HV4W......Tj94Uqi</Text>
              <Text style={[styles.fSize12Green, { color: "#FFB629" }]}>
                Pending
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <Text style={styles.fSize10gray}>07/15/2022 14:51</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  </View>
);

const renderScene = SceneMap({
  token: TokenRoute,
  nft: NftRoute,
  activities: ActivitesRoute,
});

const _renderTabBar = (props) => {
  const inputRange = props.navigationState.routes.map((x, i) => i);
  return (
    <View style={styles.tabBar}>
      {props.navigationState.routes.map((route, i) => {
        const opacity = props.position.interpolate({
          inputRange,
          outputRange: inputRange.map((inputIndex) =>
            inputIndex === i ? 1 : 0.5
          ),
        });

        return (
          <TouchableOpacity
            style={styles.tabItem}
            >
            <Animated.Text style={{ opacity, color: "#58C0E1" }}>
              {route.title}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const initialLayout = { width: Dimensions.get("window").width };

import { TabView, SceneMap } from "react-native-tab-view";

const Wallet = (props) => {
  const [index, setIndex] = React.useState(0);
  const navigation = useNavigation();

  const enterImportWallet = () => {
    navigation.push("ImportWallet");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View style={styles.walletTop}>
        <View
          style={{
            textAlign: "center",
            position: "relative",
            justifyContent: "center",
          }}
        >
          <Text style={styles.deviceTitle}>Ironman.ble</Text>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 20,
            }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../assets/images/close.png")}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.addr, styles.absoluteCenter]}>
          <Text style={[{ fontSize: (14 / 390) * windowWidth }]}>
            Hx000...abc
          </Text>
          <Image
            source={require("../assets/images/patse.png")}
            style={{
              width: 16,
              height: 16,
              marginLeft: 10,
            }}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.tokenBalance}>120 SOL</Text>
          <Text style={styles.tokenBalanceToDollar}>$50.3</Text>
        </View>
        <View
          style={[
            styles.flexRow,
            {
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: 56,
            },
          ]}
        >
          <View>
            <TouchableOpacity style={[styles.operationIcon]} onPress={enterImportWallet}>
              <Image
                source={require("../assets/images/receive.png")}
                style={{
                  width: 16,
                  height: 16,
                }}
              />
            </TouchableOpacity>
            <Text
              style={[styles.glutenFont, { minWidth: 56, textAlign: "center" }]}
            >
              Receive
            </Text>
          </View>
          <View>
            <TouchableOpacity style={[styles.operationIcon]}>
              <Image
                source={require("../assets/images/send.png")}
                style={{
                  width: 16,
                  height: 16,
                }}
              />
            </TouchableOpacity>
            <Text
              style={[styles.glutenFont, { minWidth: 56, textAlign: "center" }]}
            >
              Send
            </Text>
          </View>
        </View>
      </View>
      <WalletTab 
      index={index}
      setIndex={setIndex}
      />
    </View>
  );
};

const WalletTab = (props) => {
  const {index, setIndex} = props;
  const [routes] = React.useState([
    { key: "token", title: "Token" },
    { key: "nft", title: "Nft" },
    { key: "activities", title: "Activities" },
  ]);
  

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={_renderTabBar}
      initialLayout={initialLayout}
      style={styles.walletTab}
    />
  );
};

export default Wallet;

const styles = StyleSheet.create({
  recordsItemBox: {
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 15,
    marginTop: 15,
  },
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
  tokenList: {
    borderRadius: (20 / 390) * windowWidth,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#daef79",
  },
  recordsBox: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  scene: {
    flex: 1,
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
  borderBottomLine: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#DAEFA9",
  },
  wallet: {
    position: "absolute",
    right: "10%",
    width: 200,
    height: 80,
    backgroundColor: "blue",
  },
  deviceTitle: {
    fontSize: 24,
    color: "#475569",
    textAlign: "center",
  },
  walletTab: {
    height: 300,
    width: "100%",
  },
  normalRecords: {
    width: "80%",
    flexDirection: "row",
    height: (68 / 390) * windowWidth,
    paddingBottom: (16 / 390) * windowWidth,
    paddingTop: (16 / 390) * windowWidth,
    paddingLeft: (16 / 390) * windowWidth,
    paddingRight: (16 / 390) * windowWidth,
    marginBottom: (40 / 390) * windowWidth,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: (20 / 390) * windowWidth,
  },
  fSize12Green: {
    fontSize: (12 / 390) * windowWidth,
    color: "#87C711",
  },
  fSize10gray: {
    fontSize: (10 / 390) * windowWidth,
    color: "#999",
  },
  operationIcon: {
    backgroundColor: "#58C0E1",
    borderRadius: 16,
    width: 56,
    height: 56,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  tokenBalance: {
    fontSize: 24,
    textAlign: "center",
  },
  tokenBalanceToDollar: {
    fontSize: 12,
    textAlign: "center",
  },
  activeTab: {
    borderWidth: 2,
    borderColor: "#87c711",
    borderStyle: "solid",
    borderRadius: 22,
  },
  walletTop: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 32,
    width: "100%",
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    marginTop: getStatusBarHeight() + 30,
  },
  tabBar: {
    flexDirection: "row",
    height: 48,
    backgroundColor: "#F5FBFE",
  },
  headerTab: {
    position: "absolute",
    zIndex: 10,
    top: getStatusBarHeight() + 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  receiveContainer: {
    width: "100%",
    bottom: 0,
    height: "27%",
    backgroundColor: "white",
    position: "absolute",
    paddingTop: 42,
  },
  tabIcon: {
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  absoluteCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnList: {
    width: 238,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    height: 45,
  },
  fSize16Black: {
    fontFamily: "Gluten_700Bold",
    fontSize: 16,
    color: "#000000",
  },
  spendingContainer: {
    backgroundColor: "#FEFDF1",
    width: "100%",
    height: "100%",
    paddingBottom: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: getStatusBarHeight() + 60 + 33,
  },
  walletContainer: {
    backgroundColor: "#e5e5e5",
    height: "100%",
  },
  hideContainer: {
    display: "none",
  },
  transferBtn: {
    width: 259,
    height: (49 / 390) * windowWidth,
    borderRadius: (22 / 390) * windowWidth,
    marginTop: (40 / 390) * windowWidth,
    marginLeft: "auto",
    marginRight: "auto",
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
  token: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  tokenBorder: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
  },
  marginLeftRightAuto: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  fontSize32: {
    fontFamily: "Gluten_700Bold",
    fontSize: (32 / 390) * windowWidth,
    textAlign: "center",
    color: "#000000",
  },
  black16: {
    fontFamily: "Gluten_700Bold",
    fontSize: (16 / 390) * windowWidth,
    textAlign: "center",
    color: "#000000",
  },
  modalBtn: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#87c711",
    borderRadius: 22,
    height: 42,
    width: "85%",
  },
  tab: {
    borderRadius: 20,
  },
  initialWalletPopup: {
    backgroundColor: "white",
    height: (212 / 390) * windowWidth,
    borderRadius: (20 / 390) * windowWidth,
    paddingTop: "5%",
    paddingRight: "2%",
  },
});
