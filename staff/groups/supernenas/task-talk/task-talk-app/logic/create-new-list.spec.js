"use strict"

describe("createnewlist", () => {
    let testUsername = "pepitogrilloskylab"

    beforeEach(() => { //Compruebo que hay autorización
        expect(localStorage.trello_token).to.not.be.undefined
        Trello.setToken(localStorage.trello_token)
    })

    it("should create a new list in a specified group", (done) => {
        Trello.post("boards/", { name: "createListTest", defaultLists: false }, (group) => {
            createnewlist("testList", group.id, (list) => {
                expect(list.name).to.equal("testList")
                expect(list.idBoard).to.equal(group.id)
                done()
            }, (error) => {
                expect(true).to.equal(false);
                done()
            })

        }, (error) => {
            expect(true).to.equal(false)
            done()
        })
    })

    it("should call onFailure when given a wrong idBoard", (done) => {
        createnewlist("failedList", "12345678901234567890123456789012", () => {
            expect(true).to.equal(false)
            done()
        }, (error) => {
            expect(error.responseText).to.equal("invalid value for idBoard")
            expect(error.statusText).to.equal("error")
            expect(error.status).to.equal(400)
            done()
        })
    })

    it("should throw an error if called with the wrong type of parameters", () => {
        expect(function() {
            createnewlist((123), "listID", () => {}, () => {})
        }).to.throw(TypeError, 123 + " is not a string")
        expect(function() {
            createnewlist(undefined, "listID", () => {}, () => {})
        }).to.throw(TypeError, undefined + " is not a string")
        expect(function() {
            createnewlist("123", 123, () => {}, () => {})
        }).to.throw(TypeError, 123 + " is not a string")
        expect(function() {
            createnewlist("123", undefined, () => {}, () => {})
        }).to.throw(TypeError, undefined + " is not a string")
        expect(function() {
            createnewlist("123123", "123123", undefined, () => {})
        }).to.throw(TypeError, undefined + " is not a function")
        expect(function() {
            createnewlist("123123", "123123", "notafunction", () => {})
        }).to.throw(TypeError, "notafunction is not a function")
        expect(function() {
            createnewlist("123123", "123123", () => {}, undefined)
        }).to.throw(TypeError, undefined + " is not a function")
        expect(function() {
            createnewlist("123123", "123123", () => {}, "notafunction")
        }).to.throw(TypeError, "notafunction is not a function")
    })
    afterEach((done) => { //Borro los tablones que he creado para las pruebas
        function recursive(index, groups) {
            if (index >= 0) {
                Trello.delete("boards/" + groups[index], () => {
                    index--;
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
            done();
        })
    })
})