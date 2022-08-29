import 'react-native-get-random-values';
import * as bip39 from 'bip39';
import * as ed25519 from 'ed25519-hd-key';
import * as web3 from '@solana/web3.js';
import buffer from 'buffer';
import {AS_SEED, setData} from "../utils/StorageUtils";

global.Buffer = buffer.Buffer;

export const saveMnemonic = async (text) => {
  if (text.length == 0) {
    text = 'purpose distance release cotton theory fog tobacco humor hospital able quit escape';
  }
  if (!bip39.validateMnemonic(text)) {
    console.log('Invalid phrase.');
    return false;
  }
  const seed = bip39.mnemonicToSeedSync(text).toString('hex');
  const derivePath = `m/44'/501'/1'/0'`;
  const derivedSeed = ed25519.derivePath(derivePath, seed).key;
  const keypair = web3.Keypair.fromSeed(derivedSeed);
  console.log(keypair.publicKey.toBase58());

  await setData(AS_SEED, seed);
  return true;
}

export const generateMnemonic = async () => {
  return bip39.generateMnemonic();
}