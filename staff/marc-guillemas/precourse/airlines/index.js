var flights = [
    { id: 0, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: 1, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: 2, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: 3, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: 4, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: 5, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: 6, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: 7, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: 8, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    { id: 9, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];

var id = prompt("Insert your ID:");


console.log("Welcome "+id+"! \n");

var average = 0;
var scalecont = 0;
for(var i = 0; i < flights.length; i++){
  if(flights[i].scale === true){
    console.log("Flight with origin "+flights[i].from+", and destination: "+flights[i].to+" it has a cost "+flights[i].cost+"€ and it's done with scale");
    scalecont++;
  }else {
    console.log("Flight with origin "+flights[i].from+", and destination: "+flights[i].to+" it has a cost "+flights[i].cost+"€ and does not scale");
  }

  average += flights[i].cost;
}

average = average / flights.length;
average = Math.floor(average * 100) / 100;
console.log("\nThe average cost of flights is "+average+"€");
console.log("\nThere are "+scalecont+" flights with scale");

console.log("\nDestination of the last 5 flights:\n");
for(let i = 6; i < flights.length; i++){
  console.log(flights[i].to);
}

