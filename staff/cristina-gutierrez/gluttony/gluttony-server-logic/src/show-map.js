const { default: MapView } = require("react-native-maps");

let map;

function initMap() {
map = new google.maps.Map(document.getElementById(MapView), {
    center: {lat: 43.5293101, lng: -5.6773233},
    zoom: 13
});
}