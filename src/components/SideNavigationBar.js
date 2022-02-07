import {observer} from "mobx-react-lite";
import {Button, CheckIcon, Divider, Heading, Select, Text, View} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RootNavigation from "../RootNavigation";
import AppState from "../AppState";
import {useEffect, useState} from "react";
import {gateway, requestGateway} from "../api/APICore";

function SideNavigationBar(props) {
    let [org, setOrg] = useState("");
    useEffect(() => {
        requestGateway("get-self", {});
    }, [])
    useEffect(() => {
        AppState.orgID = org;
    }, [org]);
    if(!AppState.loggedIn) return null;
    return (
        <View style={{width: 250, paddingTop: 10, paddingLeft: 5, paddingRight: 5, marginRight: 5, borderStyle: "solid", borderRightWidth: 2, borderColor: "lightgray"}}>
            <Divider my={2} />
            <Heading>{AppState.userDetails.displayname}</Heading>
            <Text>@{AppState.userDetails.username}</Text>
            <Button onPress={async () => {
                await AsyncStorage.removeItem("@cloud_key");
                gateway.close();
                AppState.loggedIn = false;
                RootNavigation.reset("Login");
            }}>Log Out</Button>
            <Divider my={2} />
            {AppState.userDetails.organizations ? <Select selectedValue={org} accessibilityLabel="Select Organization" placeholder="Select Organization" onValueChange={setOrg} _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />
            }}>
                {AppState.userDetails.organizations.map(o => <Select.Item label={o.name} value={o.id} key={o.id} />)}
            </Select> : null}
            <Divider my={2} />
        </View>
    )
}

export default observer(SideNavigationBar)