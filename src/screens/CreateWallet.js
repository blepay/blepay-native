import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {generateMnemonic} from "../wallet/WalletHandler";
import {AS_CREATE_WALLET_WORDS, setData} from "../utils/StorageUtils";

export function CreateWalletScreen({navigation}) {

  const [mnemonic, setMnemonic] = useState([]);
  const [wordList, setWordList] = useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const mnemonic = await generateMnemonic();
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

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Create New Wallet</Text>
      </View>
      <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
      <Text style={styles.logoText}>blepay</Text>
      <Text style={styles.warning}>Don't risk losing your funds. Protect your wallet by saving your Secret Phrase in a
        place you trust.
        It's the only way to recover your wallet if you get locked out of the app or get a new device.</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  topBar: {
    width: '100%',
    height: 60,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  topBarTitle: {
    fontSize: 15,
    color: 'black'
  },
  logo: {
    width: 52,
    height: 41,
    marginTop: 40
  },
  logoText: {
    color: 'black'
  },
  warning: {
    fontSize: 12,
    color: '#BA1B1B',
    paddingHorizontal: 24,
    paddingVertical: 16,
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
    color: '#475569'
  },
  button: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 40,
    backgroundColor: '#58C0E1',
    color: 'white',
    marginTop: 28,
  }
});
