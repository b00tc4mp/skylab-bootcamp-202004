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
        fontWeight:"bold",
        alignSelf:"center",
        color: '#66cc00',
        width:'100%',
    },
    
    error: {
        fontWeight:"bold",
        alignSelf:"center",
        color: 'red',
      
    }
});
