import AsyncStorage from "@react-native-async-storage/async-storage";

export const AS_SEED = 'as_seed';
export const AS_CREATE_WALLET_WORDS = 'as_create_wallet_words';

export const setData = async (key, value) => {
  await AsyncStorage.setItem(key, value);
}

export const getData = async (key) => {
  return await AsyncStorage.getItem(key);
}
