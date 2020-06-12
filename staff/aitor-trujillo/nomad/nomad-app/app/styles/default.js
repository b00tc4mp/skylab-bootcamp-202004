import colors from "./colors";

import { Platform } from 'react-native';

// import colors from './colors'

export default {
    text: {
        color: '#1c1c1c',
        fontSize: 18,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir'
    }
}