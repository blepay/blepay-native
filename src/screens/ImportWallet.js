import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {saveMnemonic} from "../wallet/WalletHandler";

export function ImportWalletScreen({navigation}) {

  const [text, onChangeText] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  const goBack = () => {
    navigation.goBack();
  }

  const confirm = async () => {
    const save = await saveMnemonic(text);
    if (save) {
      navigation.navigate('Wallet');
    }else {
      setErrorVisible(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.topBarBack} onPress={goBack}>
          <Image style={styles.topBarBackImg} source={require('../assets/images/icon_back.png')}/>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Import Existing Wallet</Text>
      </View>
      <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
      <Text style={styles.logoText}>blepay</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={'Enter the seed phrase word and seperate with space'}
      />
      <Text style={errorVisible ? styles.error : styles.errorHide}>Error. Please try again.</Text>
      <TouchableOpacity onPress={confirm}>
        <Text style={styles.button}>Import Wallet</Text>
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
  topBarBack: {
    position: "absolute",
    left: 20
  },
  topBarBackImg: {
    width: 12,
    height: 20,
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
  input: {
    width: 342,
    height: 168,
    backgroundColor: '#F8FAFC',
    borderBottomColor: '#CBD5E1',
    borderBottomWidth: 2,
    marginTop: 56,
    fontSize: 14,
    paddingHorizontal: 43,
    paddingVertical: 24,
  },
  error: {
    backgroundColor: '#DC2626',
    fontSize: 12,
    color: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 45
  },
  errorHide: {
    backgroundColor: '#DC2626',
    fontSize: 12,
    color: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 36,
    opacity: 0
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
