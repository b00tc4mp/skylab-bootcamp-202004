import React from "react";
import {
    View,
    Text,
    Image
} from "react-native";

const Store = (props) => {
    return (
        <View>
            <Image source={{uri: props.store.thumbnail}} style = {{height: 50, width: 50, margin: 5 }} />
            <Text>{props.store.name}</Text>
            <Text>{props.store.type}</Text>
        </View>
    )
}

export default Store