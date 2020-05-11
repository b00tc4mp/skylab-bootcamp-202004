describe('deleteActivity', () => {
    let testUsername = 'pepitogrilloskylab'
    beforeEach( done => {
        let authoritationProblem = false
        
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
    
    
    it('should delete a  card', (done) => {
        
        Trello.post('boards/', { name: 'deleteActivityTest' }, (board) => { 
            Trello.get(`boards/${board.id}/lists`, (lists) => {
                Trello.post('cards', { name: 'holaDelete', idList: lists[1].id} , (card)=> {
                    deleteActivity(card.id, () => { 
                        Trello.get(`lists/${lists[1].id}/cards`, (cards) =>{
                            expect(cards.length).to.equal(0)
                            done()

                        }, (error) => {
                            expect(true).to.equal(false)
                            
                            done() 
                        })
                    }, () => {
                        expect(true).to.equal(false)
                        
                        done()
                    })
                }, () => {
                    expect(true).to.equal(false)

                    done()
                }) 
            }, () => {
                expect(true).to.equal(false)

                done()
            })
        }, () => { 
            expect(true).to.equal(false)

            done()  
        } )        
    })
})