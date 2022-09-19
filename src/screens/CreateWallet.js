import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions} from "react-native";
import React, {useState} from "react";
import {generateMnemonic} from "../wallet/WalletHandler";

import {AS_CREATE_WALLET_WORDS, setData} from "../utils/StorageUtils";
import {
  useFonts,
  ReadexPro_200ExtraLight,
  ReadexPro_300Light,
  ReadexPro_400Regular,
  ReadexPro_500Medium,
  ReadexPro_600SemiBold,
  ReadexPro_700Bold,
} from '@expo-google-fonts/readex-pro';
const windowWidth = Dimensions.get('window').width;


export function CreateWalletScreen({navigation}) {
  let [fontsLoaded] = useFonts({
    ReadexPro_200ExtraLight,
    ReadexPro_300Light,
    ReadexPro_400Regular,
    ReadexPro_500Medium,
    ReadexPro_600SemiBold,
    ReadexPro_700Bold,
  });
  const [mnemonic, setMnemonic] = useState([]);
  const [wordList, setWordList] = useState([]);

  React.useEffect(() => {
    console.log('work')
    async function fetchData() {
      const mnemonic = "dfdsf dffd fdsfdsfs fdf fd fdfd fdfdsf bcb nmnmn rwerr wewwe ewwr" || await generateMnemonic();
      console.log('mmm', mnemonic)
      const wordList = mnemonic.split(' ');
      setMnemonic(mnemonic);
      setWordList(wordList);
    }

    fetchData();
  }, []);

  const confirm = async () => {
    await setData(AS_CREATE_WALLET_WORDS, mnemonic);
    navigation.push('CreateWalletCheck');
  }
  if (!fontsLoaded) {
    return <View></View>;
  } else {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Create New Wallet</Text>
      </View>
      <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
      <Text style={styles.logoText}>blepay</Text>
      <Text style={styles.warning}>Don't risk losing your funds. Protect your wallet by saving your Secret Phrase in a place you trust.</Text>
      <Text style={[styles.warning, styles.subWarning]}>It's the only way to recover your wallet if you get locked out of the app or get a new device.</Text>
      <FlatList style={styles.list} data={wordList} renderItem={({index, item}) => (
        <View style={styles.listItem}>
          <Text style={styles.listItemKey}>{index + 1}</Text>
          <Text style={styles.listItemValue}>{item}</Text>
        </View>
      )}/>
      <TouchableOpacity onPress={confirm}>
        <Text style={styles.button}>I have write it down</Text>
      </TouchableOpacity>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  topBar: {
    width: '100%',
    height: 60,
    // marginTop: 30/390 * windowWidth,
    alignItems: "center",
    justifyContent: "center"
  },
  topBarTitle: {
    fontSize: 15/390 * windowWidth,
    fontFamily: 'ReadexPro_600SemiBold',
    color: 'black'
  },
  logo: {
    width: 52,
    height: 41,
    // marginTop: 40/390 * windowWidth
  },
  logoText: {
    color: '#2A245F',
    marginBottom: 18/390 * windowWidth,
    fontFamily: 'ReadexPro_400Regular'
  },
  warning: {
    fontSize: 12/390 * windowWidth,
    color: '#BA1B1B',
    fontFamily: 'ReadexPro_500Medium',
    width: 342/390 * windowWidth,
    textAlign: 'left',
    // paddingHorizontal: 24,
    // paddingVertical: 16,
  },
  subWarning: {
    fontFamily: 'ReadexPro_700Bold',
    marginBottom: 20/390 * windowWidth
  },
  list: {
    maxHeight: 350
  },
  listItem: {
    height: 28,
    fontSize: 14,
    display: 'flex',
    flexDirection: 'row'
  },
  listItemKey: {
    width: 35,
    color: '#94A3B8'
  },
  listItemValue: {
    color: '#475569',
    fontFamily: 'ReadexPro_400Regular'
  },
  button: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 40,
    backgroundColor: '#58C0E1',
    color: 'white',
    marginTop: 28,
    fontFamily: 'ReadexPro_500Medium'
  }
});
