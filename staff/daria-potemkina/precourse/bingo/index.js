function bingo (){

    let card = [];
    let users = [];
    let names;
    let usedNum = [];
    let cardNumber = [];
    let flagLinea = false;
    let flagBingo = false;
    let gameContinue = true;
    let numberOfTurns = 0;
    let points = 100;
    
    function showCard (card){
            console.log(card[0].number, card[1].number, card[2].number, card[3].number, card[4].number);
            console.log(card[5].number, card[6].number, card[7].number, card[8].number, card[9].number);
            console.log(card[10].number, card[11].number, card[12].number, card[13].number, card[14].number);
            console.log(' ');
    }

    function randomNumber(){
        return Math.round((Math.random()*(99-1))+1);
    }

            
    function showRanking (user){
        if(user.length > 0){
            for (let i in user){
            console.log(user[i].name + ': ' + user[i].point + ' puntos.');
            }
        }else if(user.length === 0){
            console.log('No existen usuarios registrados.');
        }
    }
    
    function bingoGame(){

        function bingoUsers(){
            let userName = prompt('Introduzca su nombre y pulse Aceptar.');
            let numName = Number(userName);
            if(isNaN(numName)){
                alert('El juego tiene el siguiente asignación de puntos: \n - cada jugador parte de 100 puntos \n - cada turno resta 1 punto \n - si se abando el juego antes de terminar se le asignará 0 puntos.');
                names = userName;
            }else{
                let execute = true;
                while(execute){
                    alert('El nombre no puede ser un valor numérico! Vuelva a intentar!');
                    userName = prompt("Introduzca su nombre y pulse Aceptar.");
                    numName = Number(userName);
                    if(isNaN(numName)){
                        names = userName;
                        alert('El juego tiene el siguiente asignación de puntos: \n - cada jugador parte de 100 puntos \n - cada turno resta 1 punto \n - si se abando el juego antes de terminar se le asignará 0 puntos.');
                        execute = false;
                    }   
                }
            }
        }
    
        function bingoCard (){
        
            function generateBingoCard(){
                while(cardNumber.length < 15){
                    let bingoNumber = randomNumber();
                    if(cardNumber.indexOf(bingoNumber) === -1){
                        cardNumber.push(bingoNumber);
                    }
                }
            
                for(let i in cardNumber){
                    let line = new Object;
                    line.number = cardNumber[i];
                    line.matched = false;
                    card.push(line);
                }
                showCard(card);
            }
            
            generateBingoCard();
        
            let ifGenerateCard = confirm('Pulse Aceptar para seleccionar la carta o Cancelar generar otra.');
            while(ifGenerateCard === false){
                cardNumber.length = 0;
                card.length = 0;
                generateBingoCard();
                ifGenerateCard = confirm('Pulse Aceptar para seleccionar la carta o Cancelar generar otra.');
            }
        }

        function nextTurn (){
            let ifNextTurn = confirm("Empecemos?");
                while(ifNextTurn === true && flagBingo === false){
                    matchNum(card);
                    numberOfTurns++;
                    points--;
                    if(flagBingo === false){
                        ifNextTurn = confirm('¿Desee continuar con el juego?');
                    }
                }
                if(ifNextTurn === false){
                    points = 0;
                    console.log('Ha obtenido ' + points + '.');
                    console.log('El juego ha finalizado en ' + numberOfTurns + ' turnos.\n ');
                }
                if(flagBingo === true){
                    console.log('Ha obtenido ' + points + '.');
                    console.log('El juego ha finalizado en ' + numberOfTurns + ' turnos.\n ');
                }
            }
    
        function matchNum (card){
        
            let line1 = 0;
            let line2 = 0;
            let line3 = 0;
            let generate = true;
            let num;
        
            while (generate){
                num = randomNumber();
                if(usedNum.indexOf(num) === -1){
                    usedNum.push(num);
                    alert(num)
                    generate = false;
                }
            }
            for( let n in card){
                if (num === card[n].number){
                    alert('Hay una coincidencia: ' + num + '.');
                    card[n].number = 'X';
                    card[n].matched = true;
                    console.log('Número que se ha encontrado es ' + num + '.');
                    showCard(card);
                }
            }
            for (let m = 0; m<5; m++){
                if(card[m].matched === true){
                    line1++;
                }
                if(line1 === 5 && flagLinea === false){
                    alert('LINEA!');
                    flagLinea = true;
                }
            }
            for (let m = 5; m<10; m++){
                if(card[m].matched === true){
                    line2++;
                }
                if (line2 === 5 && flagLinea === false){
                    alert('LINEA!');
                    flagLinea = true;
                }
            }
            for(let m = 10; m<15; m++){
                if(card[m].matched === true){
                    line3++;
                }
                if(line3 === 5 && flagLinea === false){
                    alert('LINEA!');
                    flagLinea = true;
                }
            }   
            if (line1 === 5 && line2 === 5 && line3 === 5){
                alert('BINGO!');
                flagBingo = true;
                return;
            }
        
        }

        bingoUsers();  
        bingoCard();
        nextTurn();
        }

    while(gameContinue === true){
        let game = confirm('BINGO! \nPulse Aceptar para jugar y Cancelar para salir.');
            if(game === true){
                card.length = 0;
                usedNum.length = 0;
                cardNumber.length = 0;
                flagLinea = false;
                flagBingo = false;
                numberOfTurns = 0;
                points = 100;
                bingoGame();
                let newUsers = new Object;
                newUsers.name = names;
                newUsers.point = points;
                users.push(newUsers);
                showRanking (users);
            }else{
                alert('Gracias! Hasta pronto!');
                gameContinue = false;
            }
    
        }
}
    
bingo();