describe("createUserActivity", () => {
    let testUserName = "pepitogrilloskylab"
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
                createNewActivity("newActivity", list.id, (card) => {
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
})