/**
 * Sample BLE React Native BletoothMainScreen
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import RNBluetoothClassic, { BluetoothEventType, BluetoothDevice } from 'react-native-bluetooth-classic';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  NativeModules,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  RefreshControl,
  Image,
  Modal,
  ActivityIndicator,
  ToastAndroid,
  TextInput,
  Dimensions
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get("window").height;

const DevicesLocationlist = [
    {
        left: '30%',
        bottom: 40,
        width: 162,
        height: 83,
        borderRadius: 41,
        position: 'absolute'
    },
    {
        left: '60%',
        position: 'absolute',
        bottom: 150,
        width: 120,
        height: 59,
        borderRadius: 29,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#58C0E1'
    },
    {
        left: '20%',
        bottom: 150,
        width: 91,
        height: 43,
        borderRadius: 29,
        position: 'absolute',
    },
    {
        left: '45%',
        bottom: 250,
        width: 104,
        height: 43,
        borderRadius: 29,
        position: 'absolute',
    },
    {
        left: '20%',
        bottom: 350,
        width: 108,
        height: 43,
        borderRadius: 29,
        position: 'absolute',
    },
]

import {useNavigation} from '@react-navigation/native';

const BletoothMainScreen = props => {
  let disconnectSubscription;
  let readInterval;
  let readSubscription;
  const [isScanning, setIsScanning] = useState(false);
  const [polling, setPolling] = useState(false);
  const [list, setList] = useState([]);
  const [device, setDevice] = useState({});
  const [data, setData] = useState([]);
  const [isBluetoothStarted, setBluetoothtoggle] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();
  // let d = await RNBluetoothClassic.accept();

  useEffect(() => {
      checkForBluetoothPermission();
      try {
        const getList = async () => {
          return await RNBluetoothClassic.startDiscovery();
        }
        getList().then(res => { 
          setList(res);
        }) 
    } catch (err) {
        // Error if Bluetooth is not enabled
        // Or there are any issues requesting paired devices
    }
  }, [])


  useEffect(() => {
    initializeRead();
  }, [])

  const initializeRead = async () => {
    let subscription = await BluetoothDevice
    .onBluetoothEnabled((event) => this.onStateChanged(event));
    await subscription.onDataReceived((event) => {
      console.log(event);
      onReceivedData(event);
    });
    // disconnectSubscription = RNBluetoothClassic.onDeviceDisconnected(() => disconnect(true));
    // if (polling) {
    //   readInterval = setInterval(() => performRead(), 5000);
    // } else {
    //   readSubscription = await RNBluetoothClassic.onDataReceived(data =>
    //     onReceivedData(data)
    //   );
    // }
  }

  const performRead = async () => {
    try {
      console.log('Polling for available messages');
      let available = await device.available();
      console.log(`There is data available [${available}], attempting read`);

      if (available > 0) {
        for (let i = 0; i < available; i++) {
          console.log(`reading ${i}th time`);
          let data = await device.read();
          console.log(`Read data ${data}`);
          console.log(data);
          this.onReceivedData({ data });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const onReceivedData = async (event) => {
    console.log('received', event)
    event.timestamp = new Date();
    addData({
      ...event,
      timestamp: new Date(),
      type: 'receive',
    });
  }

  const addData = async (message) => {
    setData([message, ...data])
  }

  const disconnect = async (disconnected) => {
    try {
      if (!disconnected) {
        disconnected = await this.props.device.disconnect();
      }

      addData({
        data: 'Disconnected',
        timestamp: new Date(),
        type: 'info',
      });

      this.setState({ connection: !disconnected });
    } catch (error) {
      this.addData({
        data: `Disconnect failed: ${error.message}`,
        timestamp: new Date(),
        type: 'error',
      });
    }

    // Clear the reads, so that they don't get duplicated
    uninitializeRead();
  }

  /**
   */ /* Enable the Bluetooth Permission
   */
  const enableBluetoothInDevice = () => {
  };
  /**
   * //* Start the bluetooth scanning
   */
  const startScan = () => {
  };


  /**
   * //* Check the Bluetooth Permission For Android and  request if required.
   */
  const checkForBluetoothPermission = () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      let finalPermission =
        Platform.Version >= 29
          ? PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          : PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION;
      PermissionsAndroid.check(finalPermission).then(result => {
        if (result) {
          //* Enable the Bluetooth capability
          enableBluetoothInDevice();
        } else {
          PermissionsAndroid.request(finalPermission).then(result => {
            if (result) {
              //* Enable the Bluetooth capability
              enableBluetoothInDevice();
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    } else {
      console.log('IOS');
      enableBluetoothInDevice();
    }
  };

  const onPressDeviceBubble = async (device) => {
    connection = await device.connect();
    console.log('connection', connection)
    sendDataToDevice(device)
  };

  /**
   * Rename the blub name
   * Here we have to pass 19 byte array with ascii value of string as per Hardware/Peripheral Requirement.
   */
  const sendDataToDevice = async (device) => {
    console.log('click device', device)
    let result = await RNBluetoothClassic.writeToDevice(
      device.address,
      'A1_BlePay_0x72d39aaf15299BE7F1541D0587584499040570a2'
    );
    console.log('result', result)
  };

  // console.log('list ------>', list);
  
  return (
    <View style={styles.container}>
      <View
        style={styles.contentContainerStyle}>
        {list.map((device, idx) => (
              <TouchableOpacity 
              onPress={() => onPressDeviceBubble(device)}
              style={[styles.deviceBubble, 
                DevicesLocationlist[idx]
              ]} key={device.id}
              >
                <Text style={[styles.deviceName, idx === 1 ? styles.notSetDomainText : '']}>{device.name || device.id}</Text>
              </TouchableOpacity>
            ))}
      </View>
      <View style={styles.scamWrapView}>
      <View style={styles.walletInfo}>
        <Text style={styles.walletAddrName}>ironman.ble</Text>
        <TouchableOpacity
          style={[styles.switchAddrBtn, styles.normalBorderStyle]}
        >
          <Text style={styles.font16black}>HSxD...DtBp</Text>
          <Image
            style={{ width: 18, height: 14, marginLeft: 10 }}
            source={require("../assets/images/switch.png")}
          />
        </TouchableOpacity>
        <View style={styles.btnBox}>
          <TouchableOpacity style={[styles.width48, styles.normalBorderStyle]}>
            <Text style={styles.font16black}>15 NFTS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.width48, styles.normalBorderStyle]}>
            <Text style={styles.font16black}>120 SOl</Text>
          </TouchableOpacity>
        </View>
      </View>
        {/* <TouchableOpacity style={styles.startScanView} onPress={startScan}>
          <Image source={images.refreshIcon} style={styles.refreshIcon} />
          <Text style={styles.refreshText}>{'Refresh'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleHelpModal(true)}
          style={styles.startScanView}>
          <Image source={images.helpIcon} style={styles.refreshIcon} />
          <Text style={styles.refreshText}>{'Help'}</Text>
        </TouchableOpacity> */}
      </View>

      <View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 30,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  outerViewModalStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    // marginHorizontal: 10
    paddingBottom: 20,
  },
  emptyMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  scanningText: {
    color: 'black',
    fontSize: 16,
  },
  noBlubText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  pleaseMakeText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  touubleShootHelp: {
    color: 'blue',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 30,
    textAlign: 'center',
  },
  descText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 14,
  },
  troubleShotHelp: {
    color: 'blue',
    fontWeight: '600',
    fontSize: 16,
    marginVertical: 15,
    textAlign: 'center',
  },
  textInput: {
    color: 'white',
    fontSize: 14,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bulbWrapView: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingBottom: 5,
  },
  smartBlubIcon: {
    height: 30,
    width: 30,
  },
  bulbText: {
    color: 'black',
    marginLeft: 20,
  },
  activityindicator: {
    position: 'absolute',
    right: '30%',
  },
  ranameView: {
    backgroundColor: 'blue',
    padding: 5,
  },
  renameText: {
    fontSize: 14,
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  contentContainerStyle: {
    zIndex:1,
    elevation:1,
    backgroundColor: 'white',
    position: 'relative',
    height: windowHeight - 220,
    borderColor: 'transparent'
  },
  notSetDomainText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#475569'
  },
  scamWrapView: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderTopStartRadius: 40,
    // borderTopEndRadius: 40,
    elevation: 30,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: (20 / 390) * windowWidth,
    borderColor: "#58C0E1",
  },
  startScanView: {
    alignItems: 'center',
    width: '50%',
  },
  refreshIcon: {
    height: 30,
    width: 30,
  },
  refreshText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  renameTextInput: {
    borderWidth: 1,
    color: 'black',
    margin: 10,
    height: 50,
  },
  bulbView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletInfo: {
    position: "absolute",
    textAlign: "center",
    zIndex: 100,
    elevation: 10,
    height: (220 / 390) * windowWidth,
    bottom: 0,
    backgroundColor: "white",
    width: windowWidth,
    // borderTopStartRadius: 20,
    // borderTopEndRadius: 20,
    paddingTop: (32 / 390) * windowWidth,
    paddingLeft: 24,
    paddingRight: 24,
  },
  walletAddrName: {
    fontSize: (24 / 390) * windowWidth,
    textAlign: "center",
    color: "#2A245F",
    fontFamily: "ReadexPro_700Bold",
    marginBottom: (30 / 390) * windowWidth,
  },
  font16black: {
    fontSize: (16 / 390) * windowWidth,
    textAlign: "center",
    color: "#2A245F",
    fontFamily: "ReadexPro_700Bold",
  },
  switchAddrBtn: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  normalBorderStyle: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: (20 / 390) * windowWidth,
    borderColor: "#58C0E1",
    height: (40 / 390) * windowWidth,
  },
  width48: {
    width: "48%",
    justifyContent: "center",
  },
  btnBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: (20 / 390) * windowWidth,
  },
  deviceBubble: {
    backgroundColor: '#58C0E1',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  deviceName: {
    color: 'white'
  }
});

export default BletoothMainScreen;
