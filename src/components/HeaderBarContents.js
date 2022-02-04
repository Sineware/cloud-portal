import {observer} from "mobx-react-lite";
import {Heading, Spinner, Text, View} from "native-base";

import AppState from "../AppState";

function HeaderBarContents(props) {
    if(AppState.loadingState.loading) {
        return (
            <View flexDirection={"row"} paddingRight={5}>
                <Heading color="error.500" fontSize="md" marginRight={2}>
                    {AppState.errorState.msg}
                </Heading>
                {AppState.errorState.msg !== "" && <Heading color={"black"} fontSize={"md"} marginRight={2}> | </Heading>}
                <Spinner />
                <Heading color="primary.500" fontSize="md" marginLeft={2}>
                    {AppState.loadingState.msg}
                </Heading>
            </View>
        );
    }
    return (
        <View flexDirection={"row"} paddingRight={5}>
            <Heading color="error.500" fontSize="md" marginLeft={2}>
                {AppState.errorState.msg}
            </Heading>
        </View>
    );
}

export default observer(HeaderBarContents);