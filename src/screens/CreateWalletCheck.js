import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {AS_CREATE_WALLET_WORDS, getData} from "../utils/StorageUtils";
import {saveMnemonic} from "../wallet/WalletHandler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function CreateWalletCheckScreen({navigation}) {

  const [mnemonic, setMnemonic] = useState([]);
  const [buttonList, setButtonList] = useState([]);
  const [text, setText] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const mnemonic = await getData(AS_CREATE_WALLET_WORDS);
      const shuffle = shuffleArray(mnemonic.split(' '));
      const buttonList = wordsToButtons(shuffle);
      setMnemonic(mnemonic);
      setButtonList(buttonList);
    }

    fetchData();
  }, []);

  const confirm = async () => {
    if (text == mnemonic) {
      await saveMnemonic(text);
      navigation.navigate('Wallet');
    } else {
      setErrorVisible(true);
    }
  }

  const toggleBtn = (index) => {
    buttonList[index].selected = !buttonList[index].selected;
    setButtonList(buttonList);
    updateText(buttonList[index].selected, buttonList[index].word);
  }

  const updateText = (selected, word) => {
    const array = text.split(" ");
    if (selected) {
      array.push(word);
    } else {
      array.splice(array.indexOf(word), 1);
    }
    setText(arrayToString(array));
  };

  const arrayToString = (array) => {
    let str = "";
    for (let i = 0; i < array.length; i++) {
      str += array[i] + " ";
    }
    return str.trim();
  };

  const wordsToButtons = (wordList) => {
    const buttonList = [];
    for (let i = 0; i < wordList.length; i++) {
      const button = {
        word: wordList[i],
        selected: false
      }
      buttonList.push(button);
    }
    return buttonList;
  }

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Create New Wallet</Text>
      </View>
      <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
      <Text style={styles.logoText}>blepay</Text>
      <Text style={styles.warning}>Please choose Secret Phrase in order and make sure your Secret Phrase was correct
        written, once forgotten, it cannot be recovered.</Text>
      <Text style={styles.textArea}>{text}</Text>
      <View style={styles.wordList}>
        {buttonList.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => toggleBtn(index)}>
              <Text style={item.selected ? styles.wordListButtonSelected : styles.wordListButton}>{item.word}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={errorVisible ? styles.error : styles.errorHide}>Error. Please try again.</Text>
      <TouchableOpacity onPress={confirm}>
        <Text style={styles.button}>Confirm</Text>
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
  textArea: {
    width: 342,
    height: 130,
    borderWidth: 1,
    borderColor: '#94A3B8',
    marginTop: 10,
    paddingHorizontal: 40,
    paddingVertical: 20,
    color: '#475569'
  },
  wordList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 28,
    marginLeft: 30
  },
  wordListButton: {
    marginBottom: 15 / 390 * windowWidth,
    marginRight: 12,
    backgroundColor: '#EFF6FF',
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  wordListButtonSelected: {
    marginBottom: 15 / 390 * windowWidth,
    marginRight: 12,
    backgroundColor: '#DFE1E3',
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  error: {
    backgroundColor: '#DC2626',
    fontSize: 12,
    color: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 36
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
