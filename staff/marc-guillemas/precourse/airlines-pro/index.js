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



function signIn() {
  var userid = prompt("Type your user ID: (admin / user)");
  while (userid != "admin" && userid != "user") {
      alert("Please type admin or user as a ID!");
      userid = prompt("Type your user ID: (admin / user)");
  }
  alert("Welcome to SkylabAirlines site "+userid+"!");
  console.log("Welcome to SkylabAirlines site "+userid+"!");
  return userid;
}

function showFlights() {
  var average = 0;
  var scalecont = 0;
  for (var i = 0; i < flights.length; i++) {
      if (flights[i].scale === true) {
          console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and it's done with scale");
          scalecont++;
      } else if(flights[i].scale === false){
          console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and does not scale");
      }
      
      average += flights[i].cost;
  }
  
  average = average / flights.length;
  average = Math.floor(average * 100) / 100;
  console.log("\nThe average cost of flights is " + average + "€");
  console.log("\nThere are " + scalecont + " flights with scale");
  
  console.log("\nDestination of the last 5 flights:\n");
  for (var i = flights.length-5; i < flights.length; i++) {
      console.log(flights[i].to);
  }
}

function toBool(scale) {
  if(scale === "true"){
      return true;
  }else if(scale === "false"){
      return false;
  }
}

function addFligths() {
  var contmax = 0;
  
  var newflight = flights.length;
  
  
  flights[newflight] = {};
  
  flights[newflight].id = newflight;
  var addto = prompt("Type the flight destination:");
  while (!isNaN(addto)) {
      alert("Type only alphabetic characters for the flight destination!");
      addfrom = prompt("Type the flight origin:");
  }
  flights[newflight].to = addto;
  var addfrom = prompt("Type the flight origin:");
  while (!isNaN(addfrom)) {
      alert("Type only alphabetic characters for the flight origin!");
      addfrom = prompt("Type the flight origin:");
  }
  flights[newflight].from = addfrom;
  
  var addcost = parseFloat(prompt("Type the flight cost:"));
  while (isNaN(addcost)) {
      alert("Please type the flight cost in only numbers!");
      addcost = parseFloat(prompt("Type the flight cost:"));
  }
  flights[newflight].cost = addcost;
  
  var addscale = prompt("Are there any stopover at this flight? true/false").toLocaleLowerCase();
  
  while(addscale != "true" && addscale != "false"){
      alert("Please type true or false!");
      addscale = prompt("Are there any stopover at this flight? true/false").toLocaleLowerCase();
  }
  
  addscale = toBool(addscale);
  flights[newflight].scale = addscale;
  
  alert("The ID of the new added flight is " + newflight);
  
  contmax++;
  showFlights();
  
  
}   

function removeFlights() {
  var rmID = parseFloat(prompt("Type the flight id you want to remove:"));
  
  if(!flights[rmID]){
      alert("This flight ID is not assigned at any flight, please type a valid ID");
  }else{
      flights.splice(rmID,1);
      alert("The flight with the ID number " + rmID + " has been removed succesfully!");
      showFlights();
  }
}

function adminPrivileges() {
  var privileges = prompt("What do you want to do? add/remove/exit");
  while (privileges != "add" && privileges != "remove" && privileges != "exit") {
      alert("Please write one of those options!");
      privileges = prompt("What do you want to do? add/remove/exit");
  }
 
  if(privileges === "add"){
    
      if(flights.length === 15){
          alert("You can not add more than five flights! Please remove one or type exit");
          privileges = prompt("Do you want to remove a flight or you want to exit? remove/exit");
          while (privileges != "exit" && privileges != "remove") {
              alert("Please type remove or exit!");
              privileges = prompt("Do you want to remove a flight or you want to exit? remove/exit");
          }
      }
  }
  
  if(privileges === "add"){
      addFligths();
  }else if(privileges === "remove"){
      removeFlights();
  }else if(privileges === "exit"){
      showFlights();
     
  }
}   

//Compara els id's dels vols filtrats per rang de preu amb el id del vol a comprar.

function compareID(arr,id) {
  for(var i = 0; i < arr.length; i++){
      if(id === arr[i]){
          return true;
      }
  }
  return false;
}

function userPrivileges() {
  
  var pricesearch = parseFloat(prompt("Type the price you want to search up to, down to or equals to:"));
  
  while (isNaN(pricesearch)) {
      alert("Type only numbers please");
      pricesearch = parseFloat(prompt("Type the price you want to search up to, down to or equals to:"));
  }

  var search = prompt("Indicate if you want to search by upper price, lower price or equal price: \n Type upper, lower or equals");

  while (search != "lower" && search != "upper" && search != "equals") {
      alert("Choose one of those three options please");
      search = prompt("Indicate if you want to search by upper price, lower price or equal price: \n Type upper, lower or equals");
  }
  var arr = [];
  for (var i = 0; i < flights.length; i++) {
      if (search === "upper") {
          if (flights[i].cost > pricesearch && flights[i].scale === true) {
              console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and it's done with scale");
              
              arr.push(flights[i].id);
          } else if (flights[i].cost > pricesearch && flights[i].scale === false) {
              console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and does not scale");
             
              arr.push(flights[i].id);
          }
          
      } else if (search === "lower") {
          if (flights[i].cost < pricesearch && flights[i].scale === true) {
              console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and it's done with scale");
             
              arr.push(flights[i].id);
          } else if (flights[i].cost < pricesearch && flights[i].scale === false) {
              console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and does not scale");
              
              arr.push(flights[i].id);
          }
          
      } else if (search === "equals") {
          if (flights[i].cost === pricesearch && flights[i].scale === true) {
              console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and it's done with scale");
              
              arr.push(flights[i].id);
          } else if (flights[i].cost === pricesearch && flights[i].scale === false) {
              console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and does not scale");
              
              arr.push(flights[i].id);
          }
      } 
  }
  
  while(arr.length === 0){
    alert("There are no matches with the values has been entered. Please start again.");
    var pricesearch = parseFloat(prompt("Type the price you want to search up to, down to or equals to:"));
  
  while (isNaN(pricesearch)) {
      alert("Type only numbers please");
      pricesearch = parseFloat(prompt("Type the price you want to search up to, down to or equals to:"));
  }

  var search = prompt("Indicate if you want to search by upper price, lower price or equal price: \n Type upper, lower or equals");

  while (search != "lower" && search != "upper" && search != "equals") {
      alert("Choose one of those three options please");
      search = prompt("Indicate if you want to search by upper price, lower price or equal price: \n Type upper, lower or equals");
  }
  var arr = [];
  for (var i = 0; i < flights.length; i++) {
      if (search === "upper") {
          if (flights[i].cost > pricesearch && flights[i].scale === true) {
              console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and it's done with scale");
              
              arr.push(flights[i].id);
          } else if (flights[i].cost > pricesearch && flights[i].scale === false) {
              console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and does not scale");
             
              arr.push(flights[i].id);
          }
          
      } else if (search === "lower") {
          if (flights[i].cost < pricesearch && flights[i].scale === true) {
              console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and it's done with scale");
             
              arr.push(flights[i].id);
          } else if (flights[i].cost < pricesearch && flights[i].scale === false) {
              console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and does not scale");
              
              arr.push(flights[i].id);
          }
          
      } else if (search === "equals") {
          if (flights[i].cost === pricesearch && flights[i].scale === true) {
              console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and it's done with scale");
              
              arr.push(flights[i].id);
          } else if (flights[i].cost === pricesearch && flights[i].scale === false) {
              console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and does not scale");
              
              arr.push(flights[i].id);
          }
      } 
  }

  }
  var ticket = parseFloat(prompt("Type the flight id to buy a ticket:"));
  var compare = compareID(arr,ticket);
  
  while (isNaN(ticket) || flights[ticket] === undefined || compare != true) {
      alert("Type a valid ID! Remember, you only can choose a filtered ID flight");
      console.log("\n");
      for (let i = 0; i < flights.length; i++) {
          if (search === "upper") {
              if (flights[i].cost > pricesearch && flights[i].scale === true) {
                  console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and it's done with scale");
                  
              } else if (flights[i].cost > pricesearch && flights[i].scale === false) {
                  console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and does not scale");
              }
          } else if (search === "lower") {
              if (flights[i].cost < pricesearch && flights[i].scale === true) {
                  console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and it's done with scale");
                  
              } else if (flights[i].cost < pricesearch && flights[i].scale === false) {
                  console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and does not scale");
              }
          } else if (search === "equals") {
              if (flights[i].cost === pricesearch && flights[i].scale === true) {
                  console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and it's done with scale");
                  
              } else if (flights[i].cost === pricesearch && flights[i].scale === false) {
                  console.log("(ID: " + flights[i].id + ") -> Flight with origin " + flights[i].from + ", and destination: " + flights[i].to + " it has a cost " + flights[i].cost + "€ and does not scale");
              }
          } 
      }
      ticket = parseFloat(prompt("Type the flight id to buy a ticket:"));
      compare = compareID(arr,ticket);
  }
  console.log("User bought a flight ticket with the ID: "+ticket)
  alert("Thank you for your purchase, Come back soon");
}


function skylabAirlines() {
  var exit = false;
  while (!exit) {
      
      var usrid = signIn();
      var changeusr;
      changeusr = false;

      if(usrid){
          showFlights();
      }
      
      
      if(usrid === "admin"){
         
          while (!changeusr) {
              adminPrivileges();
              changeusr = confirm(usrid+", Do you want to log out?");
          }
          
      }else if(usrid === "user"){
          while (!changeusr) {
              userPrivileges();
              changeusr = confirm(usrid+", Do you want to log out?");
          }
          
          
      }
      exit = confirm(" Do you want to exit to SkylabAirlines?");
  }

  alert("Skylab Airlines wish you a good flight!");
  
}
skylabAirlines();
