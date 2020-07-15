                //Skylab Airlines
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



                // Skylab Airlines

                function hello() {
                    var name = prompt("Por favor indica tu nombre.", "Invitado");
                    if (name == "") {
                        alert("Debe Introducir un nombre para continuar o siga como invitado");
                        hello();
                    } else if (name) {
                        alert("Bienvenido " + name);
                        checkFlights();
                        scales();
                        averageCost();
                        lastDestinations();
                        profile();
                    } else {
                        return alert("Esperamos que vuelva");
                    }
                }


                function checkFlights() {
                    for (var i = 0; i < flights.length; i++) {
                        if (flights[i].scale == false) {
                            console.log("El Vuelo con salida desde " + flights[i].from + " con destino " +
                                flights[i].to + " tiene un coste de " + flights[i].cost + "€\n" +
                                "este vuelo no realiza ninguna escala")
                        }
                        if (flights[i].scale == true) {
                            console.log("El Vuelo con salida desde " + flights[i].from + " con destino " +
                                flights[i].to + " tiene un coste de " + flights[i].cost + "€\n" +
                                "este vuelo tiene escalas");
                        }
                    }
                }

                function averageCost() {
                    var totalCost = 0;
                    for (var i = 0; i < flights.length; i++)
                        totalCost += flights[i].cost;
                    var average = totalCost / flights.length;
                    return console.log("El coste medio es de: " + average.toFixed(2));
                }

                function scales() {
                    var flightsWithScales = 0;
                    for (var i = 0; i < flights.length; i++) {
                        if (flights[i].scale == true) {
                            flightsWithScales++;
                        }
                    }
                    return console.log("Existen " + flightsWithScales + " con escalas.");
                }

                function lastDestinations() {
                    console.log("Los ultimos vuelos disponibles son con destino:")
                    for (var i = flights.length - 5; i < flights.length; i++)
                        console.log(flights[i].to);

                }

                function skylabAirline() {
                    hello();

                }

                // Skylab Airlines Pro

                // solicitar al usuario autenticación

                function profile() {
                    var keepAskingProfile = true;
                    while (keepAskingProfile) {
                        var choseProfile = prompt('Que desea hacer ahora?\n- Indique User o Admin para continuar\n- Presione cancelar para abandonar');
                        if (choseProfile != null) {
                            switch (choseProfile.trim().toLowerCase()) {
                                case "user":
                                    user();
                                    keepAskingProfile = false;
                                    break;
                                case "admin":
                                    admin();
                                    keepAskingProfile = false;
                                    break;
                                default:
                                    alert('Por favor use solo "User" o "Admin" para continuar, o presiona cancelar para salir');
                                    break;
                                    profile();
                            }
                        } else {
                            alert("Gracias por usar Skylab Airlines, esperamos verlo pronto");
                            keepAskingProfile = false;
                        }
                    }
                }
                // Done

                // funcion como usuario


                function user() {
                    var searchPrice = prompt('Por favor indique el precio aproximado que desea invertir en sus proximas vacaciones.');
                    if (isNaN(searchPrice) || searchPrice == "") {
                        alert('Por favor indica algun precio o presiona Cancelar, para salir.');
                        user();
                    } else if (searchPrice !== null) {
                        var finalParseNumber = parseInt(searchPrice.trim(), 10);
                        alert('Por favor elige si quieres precios, menores, mayores o iguales al precio indicado');
                        var priceChoise = prompt('indica: \n1. Precios menores.\n2. Precios iguales.\n3. Precios mayores.')

                        if (priceChoise == 1) {
                            lessThan();
                            var less = lessThan(finalParseNumber);
                            printFlightsArray(less);
                            buyFlight(less);
                        } else if (priceChoise == 2) {
                            equalThan();
                            var equals = equalThan(finalParseNumber);
                            printFlightsArray(equals);
                            buyFlight(equals);
                        } else if (priceChoise == 3) {
                            greaterThan();
                            var greaters = greaterThan(finalParseNumber);
                            printFlightsArray(greaters);
                            buyFlight(greaters);
                        } else {
                            alert('Por favor indica una de las anteriores opciones o presiona Cancelar, para salir.');
                            user();
                        }
                    } else {
                        alert('Gracias por usar Skylab Airlines. Hasta pronto')
                    }
                }


                function lessThan(finalParseNumber) {

                    var flightResults = [];
                    for (var i = 0; i < flights.length; i++) {
                        var cost = flights[i].cost;
                        if (cost <= finalParseNumber)
                            flightResults.push(flights[i]);
                    }
                    return flightResults;

                }


                function equalThan(finalParseNumber) {
                    var flightResults = [];
                    for (var i = 0; i < flights.length; i++) {
                        var cost = flights[i].cost;
                        if (cost == finalParseNumber)
                            flightResults.push(flights[i]);

                    }
                    return flightResults;
                }

                function greaterThan(finalParseNumber) {
                    var flightResults = [];
                    for (var i = 0; i < flights.length; i++) {
                        var cost = flights[i].cost;
                        if (cost >= finalParseNumber)
                            flightResults.push(flights[i]);

                    }
                    return flightResults;
                }

                function printFlightsArray(arr) {
                    var finalFlightResults = [];
                    if (arr == null) {
                        alert('Gracias por su visita. Hasta pronto');
                    } else if (arr == "") {
                        alert('No hemos encontrado resultados.');
                        user();
                    } else if (arr) {
                        console.log("Esto es lo que hemos encontrado para ti:\n");
                        for (var i = 0; i < arr.length; i++) {
                            finalFlightResults.push(arr[i]);
                            console.log(arr[i]);

                        }

                    }
                    // meter la funcion de comprar en los 
                }

                function buyFlight(matchFlights) {
                    var idSelection = prompt('Por favor indica el "ID" para comprar ese billete o presione Cancelar para salir');
                    if (idSelection === null) {
                        alert('Gracias por su tiempo, esperamos verlo pronto');
                    }
                    else if (idSelection == ""){
                        alert('No ha indicado ningua opcion');
                        buyFlight(matchFlights);
                    }
                    else {
                        var choice = parseInt(idSelection.trim());
                    if (isNaN(choice)) {
                        alert('No ha indicado ningun numero');
                        buyFlight(matchFlights);
                    } else if (choice) {
                        var selectFlight = matchFlights.indexOf(matchFlights.find(x => x.id === choice));
                        if (selectFlight != -1) {
                            alert("Usted ha comprado la opcion:\n" + "Salida desde " + flights[choice].from + " con destino " +
                                flights[choice].to + " tiene un coste de " + flights[choice].cost + "€\n" +
                                "este vuelo no realiza ninguna escala");
                            alert("Gracias por su compra, vuelva pronto.")
                        } else if (choice) {
                            alert('El numero seleecionado no pertenece a ningun vuelo.')
                            buyFlight(matchFlights);

                        }
                    }
                }
            }

             // funcion como administrador
                function admin() {
                    var newFlight = prompt("Que desea hacer? Crear nuevo vuelo o Eliminar uno existente\n escriba 'Crear' o 'Eliminar' ")
                    switch (newFlight.toLowerCase()) {
                        case "crear":
                            createFlight();
                            break;
                        case "eliminar":
                            deleteFlight();
                            break;
                        case null:
                            alert('Gracias por usar skylab Airlines');
                            // hacer que null te despida de este menu
                            break;
                        default:
                            alert('Por favor escribe "Crear" o "Eliminar" o presiona Cancelar para finalizar.');
                            admin();
                            break;

                    }
                }

                function validateNull(parameter) {
                    var emptyNull = true;
                    if (parameter === null || parameter == "") {
                        emptyNull = false;
                    }
                    return emptyNull;


                }
                //Preguntar por que la validacion de numeros no funciona.
                function createFlight() {
                    if (flights.length < 16) {
                        var idnew = flights.length;

                        var keepAskingOrigin = true;
                        while (keepAskingOrigin) {
                            var fromNew = prompt('Por favor indique el origen:');
                            if (fromNew === null) {
                                return alert('Gracias por usar Skylab Ailines');
                                keepAskingOrigin = false;
                            }
                            var isValidfrom = fromNew.match("^[A-Za-z ]+$"); //regex101
                            if (!isValidfrom) {
                                alert('Debe ingresar solo letras y espacios');
                            } else if (fromNew == "") {
                                alert('Debe ingresar datos o cancele para salir.');
                            } else {
                                var fromBoolean = validateNull(fromNew);
                                keepAskingOrigin = false;
                            }
                        }

                        var keepAskingDest = true;
                        while (keepAskingDest) {
                            var toNew = prompt('Por favor indique el destino:');
                            if (fromNew === null) {
                                return alert('Gracias por usar Skylab Ailines');
                                keepAskingDest = false;
                            }
                            var isValidto = toNew.match("^[A-Za-z ]+$"); //regex101
                            if (!isValidto) {
                                alert('Debe ingresar solo letras y espacios');
                            } else if (fromNew == "") {
                                alert('Debe ingresar datos o cancele para salir.');
                            } else {
                                var fromBoolean = validateNull(fromNew);
                                keepAskingDest = false;
                            }
                        }

                        var toBoolean = validateNull(toNew);
                        var costBoolean = validateNull(costNew);
                        var keepAskingCost = true
                        while (keepAskingCost) {
                            var costNew = prompt('Por favor indique el precio del vuelo:');
                            if (costNew === null) {
                                return alert('Gracias por usar Skylab Ailines');
                                keepAskingCost = false;
                            } else if (isNaN(costNew)) {
                                alert('Debe ingresar solo numeros');
                                costBoolean = false;
                            } else if (costNew == "") {
                                alert('Por favor ingrese el coste del vuelo');
                            } else {
                                keepAskingCost = false;
                            }
                        }

                        flights.push({ id: idnew, to: toNew, from: fromNew, cost: costNew, scale: scaleCheck(scaleOrNOt) });
                        alert('Se ha creado el vuelo desde ' + fromNew + ' destino ' + toNew + ' con un coste de ' + costNew);
                        console.log(flights);
                        whatNow();

                    } else {
                        alert('No es posible crear mas vuelos, por favor elimine uno o mas vuelos, antes de crear de nuevo.');
                    }
                }


                var scaleOrNOt;

                function scaleCheck() {
                    var scaleOrNOt = confirm('Desea que su vuelo tenga escala.\nPresione "Aceptar" para que tenga escala\nPresion "Cancelar" para que NO la tenga.');
                    switch (scaleOrNOt) {
                        case false:
                            alert('su vuelo NO tendra escala');
                            break;
                        case true:
                            alert('Su vuelo tendra escala');
                            break;
                    }
                    return scaleOrNOt;

                }


                function whatNow() {
                    var createMoreflights = prompt('Por favor indique una de las siguientes opciones:\n1. Volver al menu Admin.\n2. Volver a elegir usuario.\nDelo contrario, presione "Cancelar" para finalizar');
                    if (isNaN(createMoreflights) || createMoreflights == "") {
                        alert('Por favor indica alguna opcion o presiona Cancelar, para salir.');
                        whatNow();
                    } else if (createMoreflights !== null) {
                        if (createMoreflights == 1) {
                            admin();
                        } else if (createMoreflights == 2) {
                            profile();
                        }
                    } else {
                        alert('Gracias por su tiempo. Hasta pronto');
                    }
                }

                function deleteFlight() {
                    console.log(flights);
                    arguments = prompt('Por favor indique el ID a eliminar.');
                    var deletedflight;
                    for (var i = 0; i < flights.length; i++) {
                        if (arguments == flights[i].id) {
                            alert("Se ha eliminado el vuelo: " + arguments + ' con origen ' + flights[i].from + ' con destino ' + flights[i].to);
                            deletedflight = flights[i];
                            flights.splice(i, 1);
                        }
                    }
                    console.log('Asi queda el listado de vuelos:')
                    console.log(flights);
                    whatNow();
                }
                skylabAirline();