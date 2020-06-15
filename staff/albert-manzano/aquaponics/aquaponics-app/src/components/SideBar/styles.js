import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        position:"absolute",
        top:80,
        width: 270,
        height:780,
        backgroundColor: "rgba(196,196,196,0.6)",
        marginLeft: 122,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center"
    },

    textCharts:{
        position:"absolute",
        height: 20,
        width: 60,
        fontWeight: 'bold',
        bottom:60,
        
    },

    iconCharts:{
        position:"absolute",
        bottom:20,
        height: 40,
        width: 40,
    },

    textRegister: {
        position:"absolute",
        height: 20,
        width: 60,
        fontWeight: 'bold',
        bottom:60,
    },
    
    iconRegister:{
        position:"absolute",
        height: 40,
        width: 40,
        bottom:20,
    },

    textGreenhouse: {
    
        position:"absolute",
        height: 20,
        width: 100,
        fontWeight: 'bold',
        bottom:60,
    },

    iconGreenhouse:{
        position:"absolute",
        height: 40,
        width: 40,
        bottom:15
    },

    textForecast: {
        position:"absolute",
        height: 20,
        width: 60,
        fontWeight: 'bold',
        bottom:60,
    },

    iconForecast:{
        position:"absolute",
        height: 40,
        width: 40,
        bottom:20,
    },

    textCalendar: {
        position:"absolute",
        height: 20,
        width: 65,
        fontWeight: 'bold',
        bottom:60,
    },

    iconCalendar:{
        position:"absolute",
        height: 40,
        width: 40,
        bottom:20,
    },

    textLogout: {
        position:"absolute",
        height: 20,
        width: 60,
        fontWeight: 'bold',
        bottom:60,
    },

    iconLogout:{
        position:"absolute",
        height: 40,
        width: 40,
        bottom:20,
    }
})


export default styles;