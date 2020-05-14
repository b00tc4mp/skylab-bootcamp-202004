"use strict";
describe("createnewactivity", () => {
    let testUsername = "pepitogrilloskylab"
    beforeEach(done => {
        let authoritationProblem = false;

        window.Trello.authorize({
            type: 'popup',
            name: 'Task talk',
            scope: {
                read: 'true',
                write: 'true'
            },
            expiration: 'never',
            success: () => {
                expect(authoritationProblem).to.equal(false);
                done()
            },
            error: () => {
                authorizationProblem = true;
                expect(authoritationProblem).to.equal(false);
                done()
            }
        })
    })

    it("should create a new activity in a specified list", done => {
        Trello.post("boards/", {
            name: "createActivity",
            defaultLists: false
        }, (board) => {
            Trello.post("lists", { name: "newList", idBoard: board.id }, (list) => {
                createnewactivity("newActivity", list.id, (card) => {
                    expect(card.name).to.equal("newActivity");
                    expect(card.idList).to.equal(list.id);
                    expect(card.desc).to.equal("");
                    done();
                }, () => {
                    expect(true).to.equal(false);
                    done();
                })
            }, () => {
                expect(true).to.equal(false);
                done();
            })
        }, () => {
            expect(true).to.equal(false);
            done();
        })
    })

    it("should call onFailure when given a wrong listId", (done) => {
        createnewactivity("failedActivity", "12345678901234567890123456789012", () => {
            expect(true).to.equal(false);
            done();
        }, (error) => {
            expect(error.responseText).to.equal("invalid value for idList");
            expect(error.statusText).to.equal("error");
            expect(error.status).to.equal(400);
            done();
        })
    })

    it("should throw an error if called with the wrong type of parameters", () => {
        expect(function() {
            createnewactivity((123), "listID", () => {}, () => {})
        }).to.throw(TypeError, 123 + " is not a string")
        expect(function() {
            createnewactivity(undefined, "listID", () => {}, () => {})
        }).to.throw(TypeError, undefined + " is not a string")
        expect(function() {
            createnewactivity("123", 123, () => {}, () => {})
        }).to.throw(TypeError, 123 + " is not a string")
        expect(function() {
            createnewactivity("123", undefined, () => {}, () => {})
        }).to.throw(TypeError, undefined + " is not a string")
        expect(function() {
            createnewactivity("123123", "123123", undefined, () => {})
        }).to.throw(TypeError, undefined + " is not a function")
        expect(function() {
            createnewactivity("123123", "123123", "notafunction", () => {})
        }).to.throw(TypeError, "notafunction is not a function")
        expect(function() {
            createnewactivity("123123", "123123", () => {}, undefined)
        }).to.throw(TypeError, undefined + " is not a function")
        expect(function() {
            createnewactivity("123123", "123123", () => {}, "notafunction")
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
                        done();
                    }
                }, () => {
                    done();
                })
            } else {
                done();
            }
        }
        Trello.get("members/" + testUsername, (user) => {
            if (user.idBoards.length > 0) {
                recursive(user.idBoards.length - 1, user.idBoards);
            } else {
                done();
            }
        }, () => {
            done();
        })
    })
})