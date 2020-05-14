describe("updategroup", () => {
    let testUsername = "pepitogrilloskylab"
    beforeEach(() => {
        Trello.setToken(localStorage.trello_token);
    })
    it("should change name and descripton of a choosen group", (done) => {
        Trello.post("boards/", { name: "updateTestBoard" }, (group) => {
            expect(group.name).to.equal("updateTestBoard")
            expect(group.desc).to.equal("")

            updategroup(group.id, "updatedTestBoard", "I have been updated", (updatedGroup) => {
                expect(group.id).to.equal(updatedGroup.id)
                expect(updatedGroup.name).to.equal("updatedTestBoard")
                expect(updatedGroup.desc).to.equal("I have been updated")
                done()
            }, (error) => {
                done(error)
            })
        }, (error) => {
            done(error)
        })
    })
    it("should call onFailure when given a wrong id", done => {
        updategroup("13245678901234567890123456789012", "imposibleGroup", "imposible description", (group) => {
            done(group)
        }, (error) => {
            expect(error.responseText).to.equal("invalid id");
            expect(error.statusText).to.equal("error");
            expect(error.status).to.equal(400);
            done()
        })
    })
    it("should throw an error when called with wrong type of parameters", () => {
        expect(function() {
            updategroup(123, "string", "string", () => {}, () => {})
        }).to.throw(TypeError, 123 + " is not a string")
        expect(function() {
            updategroup("string", 123, "string", () => {}, () => {})
        }).to.throw(TypeError, 123 + " is not a string")
        expect(function() {
            updategroup("string", "string", 123, () => {}, () => {})
        }).to.throw(TypeError, 123 + " is not a string")
        expect(function() {
            updategroup("string", "string", "string", undefined, () => {})
        }).to.throw(TypeError, undefined + " is not a function")
        expect(function() {
            updategroup("string", "string", "string", () => {}, undefined)
        }).to.throw(TypeError, undefined + " is not a function")
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