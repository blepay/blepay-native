import 'react-native-get-random-values'
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto";
import * as ed25519 from "ed25519-hd-key";
import * as web3 from "@solana/web3.js";
import {
    Connection,
    Keypair,
    PublicKey,
    sendAndConfirmTransaction,
    Transaction,
    TransactionInstruction
} from "@solana/web3.js";
import buffer from 'buffer';
import big from 'big-integer';
global.Buffer = buffer.Buffer;
global.BigInt = big;

export const getAddress = async () => {
    const keypair = await getKeypair();
    if (keypair) {
        console.log(keypair.publicKey.toBase58());
        return keypair.publicKey.toBase58();
    } else {
        return '';
    }
}

export const getConnection = () => {
    return new Connection(
        "https://black-morning-sunset.solana-devnet.quiknode.pro/baf6fac0c1c8492ac37973018aadad67d18aa388/",
        'confirmed',
    );
}

export const getKeypair = async () => {
    const seed = await AsyncStorage.getItem("as_seed");
    if (seed == null || seed == "null") {
        return;
    }
    const derivePath = `m/44'/501'/1'/0'`;
    const derivedSeed = ed25519.derivePath(derivePath, seed).key;
    const keypair = web3.Keypair.fromSeed(derivedSeed);
    console.log(keypair.publicKey.toBase58())
    return keypair;
}

export const walletTransfer = async (target, lamports) => {
    const from = await getKeypair();
    const connection = getConnection();
    const to = new web3.PublicKey("b5UaxDW8kVs8WhGEZFEsGXKaU4cyAG5xPMXHgv3QoNS");
    const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: 1000000000,
        })
    );
    const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [from]
    );
    console.log(signature);
}

export const createRawTransaction = async () => {
    const from = await getKeypair();
    const connection = getConnection();
    const to = new web3.PublicKey("b5UaxDW8kVs8WhGEZFEsGXKaU4cyAG5xPMXHgv3QoNS");
    const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: 1000000000,
        })
    );

    const opts = {
        preflightCommitment: 'recent',
        commitment: 'recent',
    }
    transaction.recentBlockhash = (
        await connection.getRecentBlockhash(opts.preflightCommitment)
    ).blockhash;
    await transaction.sign(...[from]);
    const rawTx = transaction.serialize();
    return rawTx;
}

export const SYSTEM_PROGRAM_ID = new PublicKey("11111111111111111111111111111111");
export const SYSVAR_RENT_ID = new PublicKey("SysvarRent111111111111111111111111111111111");
export const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
export const METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

export const EMPTY_ID = new PublicKey("11111111111111111111111111111111");
export const TRANSFER_PROGRAM_ID = new PublicKey("Bct22i2NbLxUDc3hyia8awUGuYTQzoPrZTdTAkuEjN1M");
export const STEP_MONSTER_PROGRAM_ID = new PublicKey("5HS5v5SE1nKoBZB6FzswSUQU6rhpWPw8fPLKaBBc2hnW");
export const MARKET_PROGRAM_ID = new PublicKey("AUfHBuwEew4ahTVFiZfmKCqQZk9gN7LPWZo9x1xYR6XF");
export const FEE_RECEIVER_ID = new PublicKey("9fqyyKVAGw9JDB5KAYgGg8Y21zLcDYzRyBLScvVuVA6P");
export const CHARGE_ADDRESS_ID = new PublicKey("9fqyyKVAGw9JDB5KAYgGg8Y21zLcDYzRyBLScvVuVA6P");