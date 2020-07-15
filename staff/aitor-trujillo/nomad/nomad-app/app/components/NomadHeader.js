import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";


export default (props) => {
    const {
        onPress,
        subTitle,
        title,
        imageSource,
    } = props;
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.titleStyle}>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>
            </View>
            <TouchableOpacity style={styles.avatarContainerStyle} onPress={onPress}>
                <Image style={styles.avatar} source={imageSource} {...props} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: "#EFEFF4",
        backgroundColor: "transparent",
        paddingBottom: 8,
        flexDirection: "row",
        marginHorizontal: 16,
        borderBottomWidth: 1,
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    avatar: {
        height: 43,
        width: 43,
        borderRadius: 43 / 2
    },
    avatarContainerStyle: {
        alignSelf: "center",
        justifyContent: "center"
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 18,
        color: "#8E8E93",
    },
    titleStyle: {
        fontSize: 40,
        fontWeight: "bold",
        lineHeight: 41,
    }
})


