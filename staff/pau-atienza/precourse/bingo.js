function bingo(){
    //Pedimos nombre y guardamos
    var playerName = prompt('Introduzca su nombre');
    /*Mostramos el sistema de puntos.
    Si se completa la ta tarjeta en 15 turnos, damos 500.
    Por cada turno adicional, se restan 6 puntos hasta llegar a 0 (tardar 99 o 100 turnos dan 0 puntos)
    */
    alert('El bingo sigue el siguiente sistema de puntos\nsegún el número de turnos que tome completar\nla tarjeta:\n15 turnos = 500 puntos\n15 + x turnos = 500 - 6x puntos.');
    //Definimos un array con las máximas puntuaciones asociadas a cada jugador
    var scoreboard = [];

    //Función para cheqear scoreboard y añadir la nueva puntuación.
    function updateScoreboard(playerName, points, scoreboard){
        scoreboard.push({name: playerName, points: points});

        scoreboard.sort(function(a, b){
            return b.points - a.points
        });
        scoreboardString = 'Récords de puntos:'
        for (i = 0; i < scoreboard.length; i++){
            scoreboardString += `\nJugador ${i + 1}: ${scoreboard[i].name}, ${scoreboard[i].points} puntos`
        };
        alert(scoreboardString);
    };
    //Definimos funciones
    //Primero para generar la tarjeta
    function generateCard(){
        //Generamos una tarjeta de 15 números, asumiendo que no opuede haber dos números iguales en ella y solamente puede haber del 0 al 99
        var bingoCard = {};
        //Array conlos números ya utilizados
        var usedNumbers = [];
        //el loop genera 15 distintas posiciones
        for (var i = 0; i <= 14; i++){
            do{
                var coincidence = false
                //Número aleatorio del 1 al 99
                bingoCard[i] = {number: (Math.round(Math.random()*98)+ 1), matched: false};
                //Check de coincidencias entre el array de números utilizados y el nuevo número
                for(var c=0; c < usedNumbers.length; c++){
                    if (bingoCard[i].number == usedNumbers[c]){coincidence = true};
                };
                //Si hay coincidencias, generamos otro número aleatorio hasta que no haya coincidencias
            } while (coincidence == true);
            usedNumbers.push(bingoCard[i].number);
        };
        return bingoCard;
    };
    //Segundo, para mostrar el estado de la tarjeta con un confirm para aceptarla
    function confirmCard(){
        console.log(`Tu tarjeta (0: Ha salido. X: No ha salido.):\n
        Línea 1: ${
            bingoCard[0].number + (bingoCard[0].matched === true ? '(0)' : '(X)') + ', ' + 
            bingoCard[1].number + (bingoCard[1].matched === true ? '(0)' : '(X)') + ', ' + 
            bingoCard[2].number + (bingoCard[2].matched === true ? '(0)' : '(X)') + ', ' + 
            bingoCard[3].number + (bingoCard[3].matched === true ? '(0)' : '(X)') + ', ' + 
            bingoCard[4].number + (bingoCard[4].matched === true ? '(0)' : '(X)')}\n
        Línea 2: ${
            bingoCard[5].number + (bingoCard[5].matched === true ? '(0)' : '(X)') + ', ' + 
            bingoCard[6].number + (bingoCard[6].matched === true ? '(0)' : '(X)') + ', ' + 
            bingoCard[7].number + (bingoCard[7].matched === true ? '(0)' : '(X)') + ', ' + 
            bingoCard[8].number + (bingoCard[8].matched === true ? '(0)' : '(X)') + ', ' + 
            bingoCard[9].number + (bingoCard[9].matched === true ? '(0)' : '(X)')}\n
        Línea 3: ${
            bingoCard[10].number + (bingoCard[10].matched === true ? '(0)' : '(X)') + ', ' + 
            bingoCard[11].number + (bingoCard[11].matched === true ? '(0)' : '(X)') + ', ' + 
            bingoCard[12].number + (bingoCard[12].matched === true ? '(0)' : '(X)') + ', ' + 
            bingoCard[13].number + (bingoCard[13].matched === true ? '(0)' : '(X)') + ', ' + 
            bingoCard[14].number + (bingoCard[14].matched === true ? '(0)' : '(X)') }`);
        return confirm(`Quieres jugar con esta tarjeta?`);
    };
    //Para mostrar el estado de la tarjeta con un confirm para jugar otro turno
    function confirmExtraTurn(){
        return confirm('Quieres jugar otro turno?');
    };

    //Tercera, para generar un nuevo número random
    function newRandomNumber(newNumber, usedNumbers){
        do{
            //Utilizaos la misma fórmula de antes para generar el número del turno y chequear que no esté repetido
            var coincidence = false
            newNumber = Math.round(Math.random() * 98) + 1;
            for( i=0; i < usedNumbers.length; i++){
                if (newNumber === usedNumbers[i]){
                    coincidence = true
                };
            };
        } while (coincidence === true);

        usedNumbers.push(newNumber);
        alert(`El nuevo número es el ${newNumber}`);
        return newNumber;
    };
    //Cuarta, para hacer los checks de coincidencias, líneas y bingo
    function cardCheck(newNumber, bingoCard){
        //recorremos la tarjeta para encontrar coincidencias con el nuevo número
        for (i = 0; i<Object.keys(bingoCard).length; i++){
            if (newNumber === bingoCard[i].number){
                bingoCard[i].matched = true;
                alert('Qué bien! El número está en la tarjeta!');
                console.log(`Tu tarjeta (0: Ha salido. X: No ha salido.):\n
                    Línea 1: ${
                        bingoCard[0].number + (bingoCard[0].matched === true ? '(0)' : '(X)') + ', ' + 
                        bingoCard[1].number + (bingoCard[1].matched === true ? '(0)' : '(X)') + ', ' + 
                        bingoCard[2].number + (bingoCard[2].matched === true ? '(0)' : '(X)') + ', ' + 
                        bingoCard[3].number + (bingoCard[3].matched === true ? '(0)' : '(X)') + ', ' + 
                        bingoCard[4].number + (bingoCard[4].matched === true ? '(0)' : '(X)')}\n
                    Línea 2: ${
                        bingoCard[5].number + (bingoCard[5].matched === true ? '(0)' : '(X)') + ', ' + 
                        bingoCard[6].number + (bingoCard[6].matched === true ? '(0)' : '(X)') + ', ' + 
                        bingoCard[7].number + (bingoCard[7].matched === true ? '(0)' : '(X)') + ', ' + 
                        bingoCard[8].number + (bingoCard[8].matched === true ? '(0)' : '(X)') + ', ' + 
                        bingoCard[9].number + (bingoCard[9].matched === true ? '(0)' : '(X)')}\n
                    Línea 3: ${
                        bingoCard[10].number + (bingoCard[10].matched === true ? '(0)' : '(X)') + ', ' + 
                        bingoCard[11].number + (bingoCard[11].matched === true ? '(0)' : '(X)') + ', ' + 
                        bingoCard[12].number + (bingoCard[12].matched === true ? '(0)' : '(X)') + ', ' + 
                        bingoCard[13].number + (bingoCard[13].matched === true ? '(0)' : '(X)') + ', ' + 
                        bingoCard[14].number + (bingoCard[14].matched === true ? '(0)' : '(X)') }`);
            };
        };
    };
    //Hacemos check de líneas y de bingo
    function checkLine1(newNumber, bingoCard, line1){
        if (bingoCard[0].matched === true && bingoCard[1].matched === true && bingoCard[2].matched === true && bingoCard[3].matched === true && bingoCard[4].matched === true && line1 === false){
            return true;
        }
        else if (line1 === true){
            return true;
        }
        else{
            return false
        };
    };
    function checkLine2(newNumber, bingoCard, line2){
        if (bingoCard[5].matched === true && bingoCard[6].matched === true && bingoCard[7].matched === true && bingoCard[8].matched === true && bingoCard[9].matched === true && line2 === false){
            return true;
        }
        else if (line2 === true){
            return true;
        }
        else{
            return false
        };
    };
    function checkLine3(newNumber, bingoCard, line3){
        if (bingoCard[10].matched === true && bingoCard[11].matched === true && bingoCard[12].matched === true && bingoCard[13].matched === true && bingoCard[14].matched === true && line3 === false){
            return true;
        }
        else if (line3 === true){
            return true;
        }
        else{
            return false
        };
    };
    function checkFirstLine(){
        if(firstLine === false && (line1 === true || line2 === true || line3 === true)){
            alert('LÍNEA! Felicidades, has completado una línea');
            return true;
        }
        else if(firstLine === true){
            return true;
        }
        else{
            return false;
        };
    };
    function checkBingo(bingo){
        if(line1 === true && line2 === true && line3 === true){
            alert('BINGO! Felicidades, has completado el cartón!');
            return true;
        }
        else if (bingo === true){
            return true;
        }
        else{
            return false
        };
    }; 





    //Empezamos el código
    do{
        do{
            //Generamos la tarjeta con la función.
            var bingoCard = generateCard();
            //Mostramos la tarjeta y preguntamos si el usuario quiere jugar con ella
            var play = confirmCard();
        } while(play === false);
        //Si la mantienen, entramos en el ciclo de turnos
        if (play === true){
            //Definimos el turno y el nuevo número del turno y reseteamos el array de números utilizados
            var turn = 1;
            var usedNumbers = [];
            var newNumber;
            //Definimos variables que nos dirán si la línea está completa y si se ha cantado línea
            var line1 = false;
            var line2 = false;
            var line3 = false;
            var firstLine = false;
            var bingo = false;
            //empezamos elciclo de turnos
            do{
                //Nueno número aleatorio
                newNumber = newRandomNumber(newNumber, usedNumbers);
                //Check de la tarjeta
                cardCheck(newNumber, bingoCard);

                line1 = checkLine1(newNumber, bingoCard, line1);
                line2 = checkLine2(newNumber, bingoCard, line2);
                line3 = checkLine3(newNumber, bingoCard, line3);
                firstLine = checkFirstLine();
                bingo = checkBingo(bingo);

                //Si no hay bingo, actualizamos turno, mostramos la tarjeta actualizada y preguntamos si se quiere jugar otro turno
                if (bingo === false){
                    turn += 1
                    var anotherTurn = confirmExtraTurn();
                };
                //El ciclo de turnos se repite mientras el jugador quiera jugar otro turno y no haya bingo
            } while(anotherTurn === true && bingo === false)
            //Si el jugador no quiere jugar, damos las gracias y cerramos.
            if (anotherTurn === false){
                alert('Gracias por jugar, esperamos verte pronto.')
                return;
            };
            //Si ha habido bingo, mostramos puntos y el scoreboard actualizado, y preguntamos si quiere jugar otra vez.
            points = 500 - 6*(turn - 15);
            if(points < 0){ points = 0};
            alert(`Has tardado ${turn} turnos (${points} puntos)!`);
            updateScoreboard(playerName, points, scoreboard);
            var newGame = confirm('Quieres jugar otra partida?');
        };
    } while (newGame === true);
    //Si no quiere jugar otra vez, bye bye!
    alert('Gracias por jugar, esperamos verte pronto.')
    return;
};