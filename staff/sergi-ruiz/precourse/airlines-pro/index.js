function convertBool(string) {
    if (string.toLowerCase() == 'true') {
        return true;
    } else if (string.toLowerCase() == 'false') {
        return false;
    }
}

function samePrice(price) {
    let priceList = [];
    for (let i = 0; i < flights.length; i++) {
        if (flights[i].cost == price) {
            priceList.push(flights[i]);
        }
    }
    console.log(priceList);
    return priceList;
}

function morePrice(price) {
    let priceList = [];
    for (let i = 0; i < flights.length; i++) {
        if (flights[i].cost > price) {
            priceList.push(flights[i]);
        }
    }
    console.log(priceList);
    return priceList;
}

function lessPrice(price) {
    let priceList = [];
    for (let i = 0; i < flights.length; i++) {
        if (flights[i].cost < price) {
            priceList.push(flights[i]);
        }
    }
    console.log(priceList);
    return priceList;
}

var flights = [
    { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];



var login = prompt("Are you ADMIN or USER?");
login = login.toLowerCase();
if (login == "admin") {
    var exit = false;
    while (exit == false) {
        var selection = prompt("Select: 1. CREATE FLIGHT, 2.REMOVE FLIGHT, 3.EXIT");
        switch (selection) {
            case "1":
                if (flights.length < 15) {
                    var correct = false;
                    while (correct == false) {
                        destination = prompt("Destination?");
                        if (isNaN(destination) == true) {
                            correct = true;
                        } else {
                            console.log("Please, insert a destination");
                        }
                    }
                    correct = false;
                    while (correct == false) {
                        origin = prompt("Origin?");
                        if (isNaN(origin) == true) {
                            correct = true;
                        } else {
                            console.log("Please, insert a origin");

                        }
                    }
                    correct = false;
                    while (correct == false) {
                        price = parseInt(prompt("Cost in €?"));
                        if (isNaN(price) == false) {
                            correct = true;
                        }
                    }
                    scales = (prompt("Scales? true/false"));
                    scales = convertBool(scales);
                    var newFlight = { id: flights.length, to: destination, from: origin, cost: price, scale: scales };
                    flights[flights.length] = newFlight;
                    console.log(flights);
                } else {
                    alert("Error: Max Flights reached");
                }
                break;
            case "2":
                let idRemove = prompt("Please, insert the ID of the flight to remove");
                let i = 0;
                var found = false;
                while (found != true) {
                    if (flights[i].id == idRemove) {
                        flights.splice(i, 1);
                        found = true;

                        for (i; i < flights.length; i++) {
                            flights[i].id--;
                        }
                    }
                    i++;
                    if (i == flights.length) {
                        alert("Error: flight ID not found");
                    }
                }
                break;
            case "3":
                exit = true;
                break;
            default:
                break;
        }
    }
} else if (login === "user") {
    var selection = prompt("Flight finder by price, select: 1.MORE PRICE 2.SAME PRICE 3.LESS PRICE");
    var price = parseInt(prompt("price in euros?"));
    switch (selection) {
        case "1":
            morePrice(price);
            break;
        case "2":
            samePrice(price);
            break;
        case "3":
            lessPrice(price);
            break;
        default:
            break;
    }
    prompt("Insert ID to buy");
    alert("Thank you for the purchase, see you next time");
}
