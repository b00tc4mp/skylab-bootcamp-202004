import React from 'react';
import { StyleSheet} from 'react-native';

import {
    Text
} from 'react-native';

function Feedback({ message, level }) {
    return (<>
        {level=== "success" && <Text style={styles.success}>{message}</Text>}
        {level=== "error" && <Text style={styles.error}>{message}</Text>}
    </>)
}

export default Feedback

const styles = StyleSheet.create({
    success: {
        color: '#66cc00'
    },
    error: {
        color: 'red'
    }
});
