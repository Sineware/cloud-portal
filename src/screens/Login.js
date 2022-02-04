import {Text, useWindowDimensions, View} from "react-native";
import {Box, Button, Heading, HStack, Image, Input, Link, Spinner, Stack} from "native-base";
import {useEffect, useState} from "react";
import { observer } from "mobx-react-lite";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {loginUserAPI} from "../api/AuthAPI";
import AppState from "../AppState";
import {connectWSGateway} from "../api/APICore";

async function loginUser(username, password) {
    AppState.setErrorState("");
    AppState.setLoadingState(true, "Authenticating...");
    console.log("Logging in ", username, password);
    try {
        let res = await loginUserAPI(username, password);
        if(res.success) {
            AppState.cloudKey = res.accesskey;
            AppState.loggedIn = true;
            await AsyncStorage.setItem("@cloud_key", res.accesskey);
            await connectWSGateway();
        } else {
            AppState.setErrorState(res.error);
        }
    } catch (e) {
        AppState.setErrorState(e.message);
    }

}

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { height, width } = useWindowDimensions();

    useEffect(() => {
       AppState.setLoadingState(true, "Checking for login details");
       console.log("Checking for login details");
       // Auto login if cloud key is stored
       async function checkStoredCloudKey() {
           try {
               const value = await AsyncStorage.getItem('@cloud_key')
               if(value !== null) {
                   console.log(value)
                   AppState.cloudKey = value;
                   AppState.loggedIn = true;
                   await connectWSGateway();
               } else {
                   AppState.setLoadingState(false);
               }
           } catch(e) {
                AppState.setErrorState(e.message)
           }
       }
       checkStoredCloudKey();
    }, []);

    return (
        <Box flex={1} alignItems="center" justifyContent="center">
            <View style={{flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center'}}>
                <View style={{padding: 10}}>
                    <Image source={require("../img/landing_graphic.png")}  style={{ width: width < 800 ? 125 : 250, height: width < 800 ? 250 : 500 }} alt={"Sineware Cloud-chan"}/>
                    <Text>Art by kenoi.art</Text>
                </View>
                <View style={{flexGrow: 1, padding: 10}}>
                    <Text style={{fontSize: 34}}>{width < 800 ? "Login" : "Sineware Cloud Services Portal"}</Text>
                    <Stack mb="2.5" mt="1.5" direction="column" space={3}>
                        <Text style={{color: "red"}}>{AppState.errorState.msg}</Text>
                        <Input  placeholder='Username'  leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                                onChangeText={setUsername}
                        />
                        <Input placeholder="Password" secureTextEntry={true} leftIcon={{ type: 'font-awesome', name: 'lock' }}
                               onChangeText={setPassword}/>
                        {AppState.loadingState.loading ? <HStack space={2} justifyContent="center">
                            <Spinner />
                            <Heading color="primary.500" fontSize="md">
                                {AppState.loadingState.msg}
                            </Heading>
                        </HStack> : <Button onPress={() => loginUser(username, password)}>Login</Button>}
                        <Link>Register for Sineware Cloud Services</Link>
                        <Link>Set an Alternative Server</Link>
                    </Stack>
                </View>
            </View>
        </Box>
    );
}

export default observer(Login);