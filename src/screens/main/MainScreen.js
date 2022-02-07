import {Heading, Text, View} from "native-base";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {FlatList} from "react-native";

import {gateway, requestGateway} from "../../api/APICore";
import AppState from "../../AppState";
import DeviceListItem from "./components/DeviceListItem";

function MainScreen(props) {
    const [deviceList, setDeviceList] = useState([]);
    useEffect(() => {
        if(AppState.orgID !== "") {
            AppState.setLoadingState(true, "Getting device list...");
            requestGateway("get-devices", {orgID: AppState.orgID});
        }
    }, [AppState.orgID]);
    // todo remove event listener on cleanup
    gateway.addEventListener("message", (event) => {
       let msg = JSON.parse(event.data);
       if(msg.action === "get-devices-ack") {
            setDeviceList(msg.payload);
            AppState.setLoadingState(false);
       }
    });

    if(AppState.orgID === "")
        return (
            <View flex={1} alignItems={"center"} justifyContent={"center"}>
                <Heading>No organization selected.</Heading>
            </View>
        );
    if(deviceList.length === 0 && !AppState.loadingState)
        return (
            <View flex={1} alignItems={"center"} justifyContent={"center"}>
                <Heading>No devices in this organization!</Heading>
            </View>
        );
    return (
        <View>
            <Heading>Devices</Heading>
            <FlatList
                data={deviceList}
                keyExtractor={item => item.id}
             renderItem={DeviceListItem}/>
        </View>
    )
}
export default observer(MainScreen)