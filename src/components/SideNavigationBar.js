import {observer} from "mobx-react-lite";
import {Button, Heading, Text, View} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RootNavigation from "../RootNavigation";

function SideNavigationBar(props) {
    return (
        <View style={{width: "10%"}}>
            <Heading>Sidebar</Heading>
            <Button onPress={async () => {
                await AsyncStorage.removeItem("@cloud_key");
                RootNavigation.navigate("Login");
            }}>Log Out</Button>
        </View>
    )
}

export default observer(SideNavigationBar)