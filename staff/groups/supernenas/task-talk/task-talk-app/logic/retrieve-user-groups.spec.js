"use strict"

describe("retrieveUserGroups", () => {
    let testUsername="pepitogrilloskylab"
    
    beforeEach(() => {
        expect(localStorage.trello_token).to.not.be.undefined
        Trello.setToken(localStorage.trello_token)
    })

    it("should return the groups the user forms part of", (done) => {
        let testError

        Trello.post("boards/",{name: "retrieveTest"},() => {
            retrieveUserGroups(testUsername,(results) => {
                expect(results.length).to.equal(1)
                expect(results[0].name).to.equal("retrieveTest")
                Trello.post("boards/",{name:"retrieveTest2"},() => {
                    retrieveUserGroups(testUsername,(results) => {
                        expect(results.length).to.equal(2)
                        expect(results[0].name).to.equal("retrieveTest")
                        expect(results[1].name).to.equal("retrieveTest2")
                        done()
                    },(error) => {
                        testError = error
                        expect(testError).to.be.undefined
                        done()
                    })
                },(error) => {
                    testError = error
                    expect(testError).to.be.undefined
                    done()
                })
            },(error) => {
                testError = error
                expect(testError).to.be.undefined
                done()
            })
        },(error) => {
            testError = error.status
            expect(testError).to.be.undefined
            done()
        })
    })

    it("should call onFailure when given an unexistent id/name", (done) => {
        retrieveUserGroups("pepitogrilskylab",() => {
            expect(true).to.equal(false)
            done()
        },(error) => {
            expect(error.responseText).to.equal("model not found")
            expect(error.statusText).to.equal("error")
            expect(error.status).to.equal(404)
            done()
        })
    })


    it("should throw an error when called with incorrect parameters",() => {
        expect(function() {
            retrieveUserGroups((123), () => {}, () => {})
        }).to.throw(TypeError, 123 +" is not a string")
        
        expect(function() {
            retrieveUserGroups(undefined, () => {}, () => {})
        }).to.throw(TypeError, undefined + " is not a string")
        
        expect(function() {
            retrieveUserGroups("user")
        }).to.throw(TypeError, undefined +" is not a function")
        
        expect(function() {
            retrieveUserGroups("user","notafunction")
        }).to.throw(TypeError, "notafunction" +" is not a function")
        
        expect(function() {
            retrieveUserGroups("user", () => {})
        }).to.throw(TypeError, undefined +" is not a function")
        
        expect(function() {
            retrieveUserGroups("user", () => {}, "notafunction")
        }).to.throw(TypeError, "notafunction" + " is not a function")
    })

    afterEach((done) => {
        function recursive(index, groups) {
            if(index >= 0) {
                Trello.delete("boards/" + groups[index], () => {
                    index--
                    if(index >= 0) {
                        recursive(index, groups)
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
            if (user.idBoards.length > 0) {
                recursive(user.idBoards.length-1,user.idBoards)
                
            } else {
                done()
            }
        },() => {
            done()
        })
    })
})