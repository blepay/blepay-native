import React, { } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BluetoothMainScreen from "../screens/MainScreen";
import { navigationRef } from "./NavigationService";
import BluetoothModule from "../screens/Home";
import Wallet from "../screens/Wallet";
import {ImportWalletScreen} from "../screens/ImportWallet";
import {CreateWalletScreen} from "../screens/CreateWallet";
import {CreateWalletCheckScreen} from "../screens/CreateWalletCheck";
import DomainHome from "../screens/DomainHome";
import RegisterDomain from "../screens/RegisterDomain";
import SendToken from "../screens/SendToken";

const Stack = createStackNavigator();

function AppContainer() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="SendToken" component={SendToken} />
                <Stack.Screen name="BluetoothModule" component={BluetoothModule} />
                <Stack.Screen name="BluetoothMainScreen" component={BluetoothMainScreen} />
                <Stack.Screen name="Wallet" component={Wallet} />
                <Stack.Screen name="ImportWallet" component={ImportWalletScreen} />
                <Stack.Screen name="CreateWallet" component={CreateWalletScreen} />
                <Stack.Screen name="CreateWalletCheck" component={CreateWalletCheckScreen} />
                <Stack.Screen name="DomainHome" component={DomainHome} />
                <Stack.Screen name="RegisterDomain" component={RegisterDomain} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppContainer;
