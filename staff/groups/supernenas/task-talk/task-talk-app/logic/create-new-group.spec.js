"use strict";
describe("createnewgroup",()=>{
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
    it("should create a new group without lists or cards and with only one user",(done)=>{
        let testError;
        //Comprueba que el usuario no está metido en ningún grupo
        Trello.get("members/"+testUsername,(user)=>{
            expect(user.idBoards.length).to.equal(0);
            //Crea el grupo
            createnewgroup("createNewGroupTest",(group)=>{
                //Comprueba el nombre del grupo
                expect(group.name).to.equal("createNewGroupTest");
                //Comprueba que no tiene ninguna actividad
                Trello.get("boards/"+group.id+"/cards",(cards)=>{
                    expect(cards.length).to.equal(0);
                    //Comprueba que ahora el usuario si que está metido en un grupo y que esas ids coinciden
                    Trello.get("boards/"+group.id+"/members",(members)=>{
                        expect(members.length).to.equal(1);
                        expect(members[0].id).to.equal(user.id);
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
    })
    it("should throw an error if called with the wrong type of parameters",()=>{
        expect(function(){
            createnewgroup((123),()=>{},()=>{})
        }).to.throw(TypeError, 123 +" is not a string")
        expect(function(){
            createnewgroup(undefined,()=>{},()=>{})
        }).to.throw(TypeError, undefined +" is not a string")
        expect(function(){
            createnewgroup("(123)",undefined,()=>{})
        }).to.throw(TypeError, undefined +" is not a function")
        expect(function(){
            createnewgroup("(123)",()=>{})
        }).to.throw(TypeError, undefined +" is not a function")
        expect(function(){
            createnewgroup("(123)","notafunction",()=>{})
        }).to.throw(TypeError, "notafunction is not a function")
        expect(function(){
            createnewgroup("(123)",()=>{},"notafunction")
        }).to.throw(TypeError, "notafunction is not a function")
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