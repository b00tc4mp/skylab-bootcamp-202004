"use strict"

describe("updateactivity", () => {
    let testUsername="pepitogrilloskylab"

    beforeEach((done) => { 
        let authoritationProblem=false;
        window.Trello.authorize({
            type: 'popup',
            name: 'Task Talk',
            scope: {
                read: 'true',
                write: 'true'
            },
            expiration: 'never',
            success: () => {
                expect(authoritationProblem).to.equal(false)
                 done()
                },
            error: () => {
                authoritationProblem = true
                expect(authoritationProblem).to.equal(false)
                done()
            }
        })
    })

    it("should change name, description and/or idList of an specified activity", (done) => {
        Trello.post("boards/", {name: "updateactivity", defaultLists: false}, (board) => {
            Trello.post("lists", { name: "updateList", idBoard: board.id }, (list) => {
                Trello.post("cards/",{name: "updateCard", idList: list.id}, (card) => {
                    expect(card.name).to.equal("updateCard")
                    expect(card.idList).to.equal(list.id)
                    expect(card.desc).to.equal("")

                    updateactivity(card.id,{
                        name:"updatedCard", 
                        desc:"Description of the card", 
                        idList: list.id
                    },
                    (updated) => {
                        expect(updated.id).to.equal(card.id)
                        expect(updated.name).to.equal("updatedCard")
                        expect(updated.desc).to.equal("Description of the card")
                        expect(updated.idList).to.equal(list.id)
                        done()
                    },() => {
                        expect(true).to.equal(false)
                        done()
                    })
                },() => {
                    expect(true).to.equal(false)
                    done()
                })
            },() => {
                expect(true).to.equal(false)
                done()
            })
        },() => {
            expect(true).to.equal(false)
            done()
        })
    })

    it("should throw an error when called with the wrong type of parameters", () => {
        expect(function() {
            updateactivity(undefined, {name: "name", desc: "desc", idList: "idList"}, () => {}, () => {})
        }).to.throw(TypeError, undefined +" is not a string")
       
        expect(function(){
            updateactivity(123, {name: "name", desc: "desc", idList: "idList"},() => {}, () => {})
        }).to.throw(TypeError, 123 +" is not a string")
       
        expect(function(){
            updateactivity("id",{name: undefined, desc: "desc", idList: "idList"},() => {},() => {})
        }).to.throw(TypeError, undefined +" is not a string")
       
        expect(function(){
            updateactivity("id",{name: 123, desc: "desc", idList: "idList"},() => {},() => {})
        }).to.throw(TypeError, 123 +" is not a string")
       
        expect(function(){
            updateactivity("id",{name: "name", desc: undefined, idList: "idList"},() => {},() => {})
        }).to.throw(TypeError, undefined +" is not a string")
       
        expect(function(){
            updateactivity("id", {name: "name", desc: 123, idList: "idList"},() => {},() => {})
        }).to.throw(TypeError, 123 +" is not a string")
       
        expect(function(){
            updateactivity("id", {name: "name", desc: "desc", idList: undefined},() => {},() => {})
        }).to.throw(TypeError, undefined +" is not a string")
       
        expect(function(){
            updateactivity("id", {name: "name", desc: "desc", idList: 123},() => {},() => {})
        }).to.throw(TypeError, 123 +" is not a string")
       
        expect(function(){
            updateactivity("id", {name: "name", desc: "desc", idList: "idList"},undefined,() => {})
        }).to.throw(TypeError, undefined +" is not a function")
       
        expect(function(){
            updateactivity("id", {name: "name", desc: "desc", idList: "idList"},"notafunction", () => {})
        }).to.throw(TypeError, "notafunction" +" is not a function")
       
        expect(function(){
            updateactivity("id", {name: "name", desc: "desc", idList: "idList"}, () => {},undefined)
        }).to.throw(TypeError, undefined +" is not a function")
       
        expect(function(){
            updateactivity("id", {name: "name", desc: "desc", idList: "idList"}, () => {},"notafunction")
        }).to.throw(TypeError, "notafunction" +" is not a function")
    })

    it("should call onFailure when given an unexistent id",(done) => {
        updateactivity("12345678901234567890123456789012", {
            name:"name", 
            desc:"description",
            idList:"123465"
        }, () => {
            expect(true).to.equal(false)
            done()
        },(error) => {
            expect(error.status).to.equal(400)
            expect(error.statusText).to.equal("error")
            expect(error.responseText).to.equal('{"message":"invalid id","error":"BAD_REQUEST_ERROR"}')
            done()
        })
    })

    afterEach((done) => {
        function recursive(index, groups) {
            if (index >= 0) {
                Trello.delete("boards/" + groups[index], () => {
                    index--

                    if (index >= 0) {
                        recursive(index,groups)
                    
                    } else {
                        done()
                    }
                },() => {
                    done()
                })
            } else {
                done()
            }
        }

        Trello.get("members/" + testUsername, (user) => {
            if (user.idBoards.length > 0){
                recursive(user.idBoards.length-1,user.idBoards)

            } else {
                done()
            }
        },() => {
            done()
        })
    })
})