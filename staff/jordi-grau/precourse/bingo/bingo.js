
function  bingo(){
    var name ;
   function askName(){
       do {
           name = prompt('Escriu el teu nom: ');
       }
       while(!name);
   }   
   askName()
   function game (){ 
   var randomNums = [];
   var cardNums = [];
   var bomboCard = [];
   var matchedNums = [];
   var counter = 100;
   var line = false;
   var jackpot = false;
   var confirmTurn = true;
   var newMatch = false;
   
   //**GENERAR CARTRO **
   
   //genera numeros aleatoris
   function randomizer (){
       return Math.floor(Math.random() * 99) +1 ;
   }
   
   // comprobar que els numeros generats no estiguin repetits
   function genNum (){
       var num = randomizer()
       if (randomNums.indexOf(num) == -1){
           randomNums.push(num)
           return num ;
       }
       else {return randomizer()}
   }
   
   // generar instancies amb les propietats de numero(aleatori i no repetit) + matched
   function NewCard (){
       this.number = genNum(),
       this.matched = false
   }
   function newCardNums (){
       for (var i = 0; cardNums.length < 15; i++){
           cardNums.push(new NewCard())
       }
   }
   newCardNums()
   
    //console.log(cardNums)
   
   // mostra l'estat actual del cartro
   function logCard(){ 
   console.log('El teu cartro es: '+ '\nLINIA 1: '  + cardNums[0].number + ',' + cardNums[1].number + ',' + cardNums[2].number + ',' + cardNums[3].number  + ',' + cardNums[4].number);
   console.log('LINIA 2: '  + cardNums[5].number + ',' + cardNums[6].number + ',' + cardNums[7].number + ',' + cardNums[8].number  + ',' + cardNums[9].number);
   console.log('LINIA 3: '  + cardNums[10].number + ',' + cardNums[11].number + ',' + cardNums[12].number + ',' + cardNums[13].number  + ',' + cardNums[14].number);
   }
   logCard()
   
   // GENERAR NUMEROS DEL BOMBO(aleatoris i no repetits)
   function bomboNums (){
           for (var i = 0; bomboCard.length < 99  ; i++){
           var bomboNum = randomizer() ;
           if(bomboCard.indexOf(bomboNum) == -1){
               bomboCard.push(bomboNum)
           }
       }
   }
   bomboNums()
   
     
   // ** TIRADA **
   
   
   //confirmar si vol continuar amb el bingo
   function askTurn (){    
            confirmTurn = confirm("Vols contiunar amb el joc?");
   }
   
   // Comparar numeros , els canvia en el catro per una 'X', i canvia l'estat de matched a true
   
   function checkNums(){
           for (var i = 0; matchedNums.length < 15 ; i++){
               if (confirmTurn == false){
                   console.log('Gracies ' + name + '  per jugar al bingo, fins aviat');
                   break;
               }
   
               console.log("Ha sortit el numero : " + bomboCard[i]);
               counter --; 
               askTurn() 
                if (confirmTurn == true){
                   for (var j = 0 ; j < 15 ; j++){
                
                       if(bomboCard[i] == cardNums[j].number ){
                         cardNums[j].number = 'X';
                        cardNums[j].matched = true;
                        matchedNums.push(cardNums[j].number)
                       randomNums[j] = 'X';
                       }
                   }
               }  
               logCard()
               checkCard()           
       }   
   }
    
   checkNums() 
   
   //trobar linia i bingo
   function checkCard (){
       if(confirmTurn == true){ 
           if (line == false){
            checkLine();
           }
           else if (line == true) {
            checkBingo()
               if (jackpot== false){ 
               } 
               else if (jackpot == true){
              newGame();
               } 
           }   
           else if (confirmTurn == false){
            console.log('Fins aviat...')
           }
       }
   }
   //Comprobacio linea
    
   
   function checkLine(){
       if (cardNums[0].number == 'X' &&
       cardNums[1].number == 'X' &&
       cardNums[2].number == 'X' &&
       cardNums[3].number == 'X' &&
       cardNums[4].number == 'X'){
           console.log('LINEA 1 !!!!');
           line = true;
       }
       else if  (cardNums[5].number == 'X' &&
       cardNums[6].number == 'X' &&
       cardNums[7].number == 'X' &&
       cardNums[8].number == 'X' &&
       cardNums[9].number == 'X'){
           console.log('LINEA 2 !!!!');
           line = true;
       }
   
       else if  (cardNums[10].number == 'X' &&
       cardNums[11].number == 'X' &&
       cardNums[12].number == 'X' &&
       cardNums[13].number == 'X' &&
       cardNums[14].number == 'X'){
           console.log('LINEA 3 !!!!');
           line = true;
       }
   }
   
   //comprobacio bingo
   function checkBingo(){
       if ( cardNums[0].number == 'X' &&
            cardNums[1].number == 'X' &&
            cardNums[2].number == 'X' &&
            cardNums[3].number == 'X' &&
            cardNums[4].number == 'X' &&
            cardNums[5].number == 'X' &&
            cardNums[6].number == 'X' &&
            cardNums[7].number == 'X' &&
            cardNums[8].number == 'X' &&
            cardNums[9].number == 'X' &&
            cardNums[10].number== 'X' &&
            cardNums[11].number == 'X' &&
            cardNums[12].number == 'X' &&
            cardNums[13].number == 'X' &&
            cardNums[14].number == 'X' ){
            jackpot = true;
            console.log( "BIIINGOOOOO!!!!");
           alert("BINGOOOOOOO!!!!!")
           alert('Felicitats '+ name +' .Has aconseguit ' + counter + ' Punts.')       
       }    
   }   
   }
   game()
   function askMatch(){
       newMatch = confirm('Vols jugar una altre partida?')
   }
   function newGame (){
       askMatch()
       if (newMatch == true){
           game();       
       }
       else if (newMatch == false){
           console.log('Gracies ' + name + '  per jugar al bingo, fins aviat...');
       }
   }
   }
   
   bingo()