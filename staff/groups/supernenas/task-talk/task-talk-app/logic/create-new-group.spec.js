"use strict"

describe("createNewGroup", () => {
    let testUsername = "pepitogrilloskylab"
    
    beforeEach(() => {
        expect(localStorage.trello_token).to.not.be.undefined
        Trello.setToken(localStorage.trello_token)
    })

    it("should create a new group without lists or cards and with only one user", (done) => {
        let testError
        
        Trello.get("members/" + testUsername, (user) => {
            expect(user.idBoards.length).to.equal(0)
          
            createNewGroup("createNewGroupTest","description", (group) => {
                expect(group.name).to.equal("createNewGroupTest")
                expect(group.desc).to.equal("description")
              
                Trello.get("boards/" + group.id + "/cards", (cards) => {
                    expect(cards.length).to.equal(0)

                    Trello.get("boards/" + group.id + "/members", (members) => {
                        expect(members.length).to.equal(1)

                        expect(members[0].id).to.equal(user.id)
                        
                        done()
                    }, (error) => {
                        testError = error
                        expect(testError).to.be.undefined
                        done()
                    })
                }, (error) => {
                    testError = error
                    expect(testError).to.be.undefined
                    done()
                })
            }, (error) => {
                testError = error
                expect(testError).to.be.undefined
                done()
            })
        }, (error) => {
            testError = error
            expect(testError).to.be.undefined
            done()
        })
    })

    it("should throw an error if called with the wrong type of parameters", () => {
        expect(function() {
            createNewGroup((123),"desc", () => {}, () => {})
        }).to.throw(TypeError, 123 + " is not a string")
        
        expect(function() {
            createNewGroup(undefined,"desc", () => {}, () => {})
        }).to.throw(TypeError, undefined + " is not a string")
        
        expect(function() {
            createNewGroup("(123)","desc", undefined, () => {})
        }).to.throw(TypeError, undefined + " is not a function")
        
        expect(function() {
            createNewGroup("(123)","desc", () => {})
        }).to.throw(TypeError, undefined + " is not a function")
        
        expect(function() {
            createNewGroup("(123)","desc", "notafunction", () => {})
        }).to.throw(TypeError, "notafunction is not a function")
        
        expect(function() {
            createNewGroup("(123)","desc", () => {}, "notafunction")
        }).to.throw(TypeError, "notafunction is not a function")
        expect(function() {
            createNewGroup("title",123, () => {}, ()=>{})
        }).to.throw(TypeError, 123+" is not a string")
    })
    it("should call onFailure if called while having an unvalid token",done=>{
        const trelloToken=Trello.token();
        Trello.setToken("12345678901234567890123456789012");
        createNewGroup("createGroupTest","createGroupDesc",(group)=>{
            done(group)
        },(error)=>{
            expect(error.status).to.equal(401)
            expect(error.responseText).to.equal("invalid token")
            expect(error.statusText).to.equal("error")
            Trello.setToken(trelloToken)
            done()
        })
    })

    afterEach((done) => { 
        function recursive(index, groups) {
            if (index >= 0) {
                Trello.delete("boards/" + groups[index], () => {
                    index--
                    
                    if (index >= 0) {
                        recursive(index, groups)
                    } else {
                        done()
                    }
                }, () => {
                    done()
                })
            } else {
                done()
            }
        }
        Trello.get("members/" + testUsername, (user) => {
            if (user.idBoards.length > 0) {
                recursive(user.idBoards.length - 1, user.idBoards)
            } else {
                done()
            }
        }, () => {
            done()
        })
    })
})