import React, { } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BluetoothMainScreen from "../screens/MainScreen";
import { navigationRef } from "./NavigationService";
import BluetoothModule from "../screens/Home";
import Wallet from "../screens/Wallet";


const Stack = createStackNavigator();

function AppContainer() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Wallet" component={Wallet} />
                {/* <Stack.Screen name="BluetoothModule" component={BluetoothModule} />
                <Stack.Screen name="BluetoothMainScreen" component={BluetoothMainScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppContainer;
