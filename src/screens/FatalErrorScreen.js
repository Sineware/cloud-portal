import AppState from "../AppState";
import {Heading, View} from "native-base";
import {observer} from "mobx-react-lite";
function FatalErrorScreen(props) {
    return (
        <View flex={1} alignItems={"center"} justifyContent={"center"}>
            <Heading>An unrecoverable error occurred: {AppState.errorState.msg}.</Heading>
            <Heading>Please restart the app.</Heading>
        </View>

    )
}

export default observer(FatalErrorScreen);