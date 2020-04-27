function keepSafe(secret){
    var secret = secret;
    var pass = '123';

    return {

        open: function(pass) {
            if (typeof pass !== "string" ) throw Error(pass + ' 🤡 is not an string');
            if (pass !== pass) throw Error(pass +" :clown: is not correct password");
            else return secret;
        },

        changeSecret: function (pass,secret) {
            if (typeof pass !== "string" ) throw Error(pass + ' 🤡 is not an string');
            if (pass !== pass) throw Error(pass +" 🤡 is not correct password");
            if (typeof secret !== "string" ) throw Error(pass + ' 🤡 is not an string');
            else secret = secret;
        },
    }
}


function lockers (numLock){
    var boxes = [];

    return {
        contract: function(id,name){
            if (boxes.length<numLock){
                var box = {
                    name: name,
                    id: id,
                    content: keepSafe(),
                    contractId: boxes.length,
                    startDate:Date.now()
                }

                boxes.push(box);
                return box.contractId
            } else throw new Error ("no boxes available")
        },

        getBox: function(id, contractId){
           var box = boxes.find(function(box){ return box.contractId === contractId && box.id === id})
           return box;
        },

        paymentCounter: function(id,contractId){
            if (boxes.length !== 0) {
                var box = boxes.find(function(box){ return box.contractId === contractId && box.id === id})
                    return 'You 💩 must pay ' + ((((Date.now() - box.startDate)/1000)/3600)*50000).toFixed(2) + ' $';
            }
        }
    }
}

var lock = lockers (10);
var lock = lockers (10)
lock.contract('111', 'alberto');
lock.contract('222', 'alejandro');
lock.getBox('111', 0);