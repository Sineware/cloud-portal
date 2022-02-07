import {Text} from "native-base";

export default function DeviceListItem({item}) {
    // {"id":"1","displayname":"Example Server","orgid":"6827145651349157888","type":"server"}
    return (
        <Text>{item.displayname}</Text>
    )
}