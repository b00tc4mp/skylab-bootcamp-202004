import React, { useState } from "react";

import {
    View,
    Image,
    ImageBackground,
    ActivityIndicator,
    TouchableHighlight,
    Text,
} from "react-native";

import { Navbar, SideBar } from '../index';

import styles from './styles';

function Charts() {
    const [view, setView] = useState('temperature')

    const [displayed, setSide] = useState(false);

    const handleSide = () => setSide(!displayed);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../../assets/images/lettuce3.jpg")} style={styles.background}>
                <Navbar onDisplaySide={handleSide} />
                {displayed && <SideBar />}
                <View >
                    <View style={styles.canvas}>
                        {!view && <ActivityIndicator
                            style={styles.activityIndicator}
                        ></ActivityIndicator>
                        }</View>
                </View>
                <View style={styles.wrap}>
                    {view === "temperature" && (<Image
                        source={require("../../../assets/images/ph.png")}
                        style={styles.iconPh}
                    ></Image>)}
                    {view === "ph" && (<Image
                        source={require("../../../assets/images/temp.png")}
                        style={styles.iconTemp}
                        
                    ></Image>)}
                    <TouchableHighlight onPress={() => handleOnDaily()}>
                        <Text style={styles.daily}>daily</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => handleOnWeekly()}>
                        <Text style={styles.weekly}>weekly</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => handleOnMonthly()}>
                        <Text style={styles.monthly}>monthly</Text>
                    </TouchableHighlight>
                </View>
            </ImageBackground>
        </View>
    );
}

export default Charts
