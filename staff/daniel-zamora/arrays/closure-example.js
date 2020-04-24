var locker = (function() {
    function keepSafe(secret, password) {
        var __password__ = password;
        var __secret__ = secret
        debugger;
        var countAttemps = 0;

        return { // new Object
            open: function(password) {
                if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
                
                if (password === __password__) {
                    countAttemps = 0;
                    return __secret__
                }
                else { countAttemps++
                    alert('wrong password')                  
                            if(countAttemps > 3){
                                throw new Error('Too many tries');
                            }
                        }
            },

            changePassword: function(password, newPassword) {
                if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
                if (typeof newPassword !== 'string') throw new TypeError(newPassword + ' is not a string')

                if (password === __password__) __password__ = newPassword
                else throw new Error('wrong password')
            },

            updateSecret: function(password, secret) {
                if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
                if (typeof secret !== 'string') throw new TypeError(secret + ' is not a string')

                if (password === __password__) __secret__ = secret
                else throw new Error('wrong password')
            }

        }
    }

    function locker(numOfBoxes) {
        var __boxes__ = [] // new Array

        return {
            contract: function(id, fullName, secret, password) {
                if (__boxes__.length < numOfBoxes) {
                    var box = {
                        id: id,
                        content: keepSafe(secret,password),
                        contractId: Date.now(),
                        fullName: fullName
                    }

                    __boxes__.push(box)

                   return box.contractId
                } else throw new Error('no boxes available')
            },

            retrieveBox: function(id, contractId) {
                var box = __boxes__.find(function(box) { return box.id === id && box.contractId === contractId })

                if (typeof box === 'undefined') throw new Error('no box for id ' + id + ' and contract id ' + contractId)

                return box.content             
            }
        }
    }

    return locker
})()

var coolLocker = locker(10)

var contractId = coolLocker.contract('256', 'Pepito Grillo', 'el secreto', '465')

var box = coolLocker.retrieveBox('256', contractId)

box.changePassword('123', '456')

box.updateSecret('456', 'mi super secreto')

console.log(box.open('456'))