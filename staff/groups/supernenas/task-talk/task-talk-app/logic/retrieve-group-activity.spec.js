"use strict";
describe("retrievegroupactivity",()=>{
    let testUsername="pepitogrilloskylab"
    beforeEach((done)=>{ //Compruebo que hay autorización
        let authoritationProblem=false;
        window.Trello.authorize({
            type: 'popup',
            name: 'Task Talk',
            scope: {
                read: 'true',
                write: 'true'
            },
            expiration: 'never',
            success: ()=>{expect(authoritationProblem).to.equal(false); done()},
            error: ()=>{authoritationProblem=true; expect(authoritationProblem).to.equal(false);done()}
        });
    })
    it("should return all the activities of a group",(done)=>{
        //Primero creo un tablon de trello para el usuario
        let testError;
        Trello.post("boards/",{name: "retrieveTestBoard"},()=>{
            //Obtengo la info del usuario
            Trello.get("members/"+testUsername,(user)=>{
                //Obtengo la id del tablon que acabo de crear y busco una lista en la que meter una tarjeta
                Trello.get("boards/"+user.idBoards[0]+"/lists",(lists)=>{
                    //Creo una carta en esa lista
                    Trello.post("cards",{name: "retrieveTestCard",idList: lists[0].id},()=>{
                        //Comprueba que los resultados coinciden con la carta que acabo de crear
                        retrievegroupactivity(user.idBoards[0],(results)=>{
                            expect(results.length).to.equal(1);
                            expect(results[0].name).to.equal("retrieveTestCard");
                            expect(results[0].idList).to.equal(lists[0].id);
                            //Mete otra carta y vuelve a comprobar
                            Trello.post("cards",{name: "retrieveTestCard2",idList:lists[0].id},()=>{
                                retrievegroupactivity(user.idBoards[0],(results)=>{
                                    //Comprueba que están ordenadas de más reciente a más antigua
                                    expect(results.length).to.equal(2);
                                    expect(results[0].name).to.equal("retrieveTestCard2");
                                    expect(results[0].idList).to.equal(lists[0].id);
                                    expect(results[1].name).to.equal("retrieveTestCard");
                                    expect(results[1].idList).to.equal(lists[0].id);
                                    done();
                                },(error)=>{
                                    testError=error;
                                    expect(testError).to.be.undefined;
                                    done();
                                })
                            },(error)=>{
                                testError=error;
                                expect(testError).to.be.undefined;
                                done();
                            })
                        },(error)=>{
                            testError=error;
                            expect(testError).to.be.undefined;
                            done();
                        })
                    },(error)=>{
                        testError=error;
                        expect(testError).to.be.undefined;
                        done();
                    })
                },(error)=>{
                    testError=error;
                    expect(testError).to.be.undefined;
                    done();
                })
            },(error)=>{
                testError=error;
                expect(testError).to.be.undefined;
                done();
            })
        },(error)=>{
            testError=error;
            expect(testError).to.be.undefined;
            done();
        })
    })
    it("should throw an error if called with the wrong type of parameters",()=>{
        expect(function(){
            retrievegroupactivity((123),()=>{},()=>{})
        }).to.throw(TypeError, 123 +" is not a string")
        expect(function(){
            retrievegroupactivity(undefined,()=>{},()=>{})
        }).to.throw(TypeError, undefined +" is not a string")
        expect(function(){
            retrievegroupactivity("(123)",undefined,()=>{})
        }).to.throw(TypeError, undefined +" is not a function")
        expect(function(){
            retrievegroupactivity("(123)",()=>{})
        }).to.throw(TypeError, undefined +" is not a function")
        expect(function(){
            retrievegroupactivity("(123)","notafunction",()=>{})
        }).to.throw(TypeError, "notafunction is not a function")
        expect(function(){
            retrievegroupactivity("(123)",()=>{},"notafunction")
        }).to.throw(TypeError, "notafunction is not a function")
    })
    it("should call onFailure when given a wrong idBoard",(done)=>{
        retrievegroupactivity("12345678901234567890123456789012",()=>{
            expect(true).to.equal(false);
            done();
        },(error)=>{
            expect(error.responseText).to.equal("invalid id");
            expect(error.statusText).to.equal("error");
            expect(error.status).to.equal(400);
            done();
        })
    })
    
    afterEach((done)=>{ //Borro los tablones que he creado para las pruebas
        function recursive(index,groups){
            if(index>=0){
                Trello.delete("boards/"+groups[index],()=>{
                    index--;
                    if(index>=0){
                        recursive(index,groups)
                    }else{
                        done();
                    }
                },()=>{
                    done();
                })
            }else{
                done();
            }
        }
        Trello.get("members/"+testUsername,(user)=>{
            if(user.idBoards.length>0){
                recursive(user.idBoards.length-1,user.idBoards);
            }else{
                done();
            }
        },()=>{
            done();
        })
    })
})