import { StatusBar } from 'expo-status-bar';
import {Text, Platform} from 'react-native';
import {Heading, KeyboardAvoidingView, NativeBaseProvider, View} from "native-base";
import Login from "./src/screens/Login";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {observer} from "mobx-react-lite";

import MainScreen from "./src/screens/main/MainScreen";
import { navigationRef } from './src/RootNavigation';
import HeaderBarContents from "./src/components/HeaderBarContents";
import SideNavigationBar from "./src/components/SideNavigationBar";
import AppState from "./src/AppState";
import FatalErrorScreen from "./src/screens/FatalErrorScreen";

const Stack = createNativeStackNavigator();

const PortalDefaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white',
    },
};

function App() {
    return (
        <NavigationContainer theme={PortalDefaultTheme} ref={navigationRef}>
            <NativeBaseProvider>
                {AppState.errorState.fatal ? <FatalErrorScreen /> : <View flexDirection={"row"} height={"100%"}>
                    {AppState.loggedIn ? <SideNavigationBar /> : null}
                    <Stack.Navigator>
                        <Stack.Screen name="Login" component={Login} options={{ title: "Sineware Cloud Services" }} />
                        <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'Sineware Cloud Services', headerRight: () => <HeaderBarContents /> }} />
                    </Stack.Navigator>
                </View>}

                <Text style={{position: "absolute", bottom: 35, left: 10, color: "red"}}>SINEWARE INTERNAL BUILD - NOT FOR PRODUCTION USE</Text>
                <Text style={{position: "absolute", bottom: 15, left: 10, color: "red"}}>Running on platform: "{Platform.OS}"</Text>
                <StatusBar style="auto" />
            </NativeBaseProvider>
        </NavigationContainer>
    );
}
export default observer(App);