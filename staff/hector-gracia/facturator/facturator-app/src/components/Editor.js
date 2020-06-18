import React,{useState,useEffect} from 'react'
import './SearchPanel.sass'
import "./Commons.sass"
const {updateClient,addClient,removeClient}= require("facturator-client-logic")




export default function ({client,backToFinder}) {
    const [name,setName]=useState("")
    const [establishment,setEstablishment]=useState("")
    const [direction,setDirection]=useState("")
    const [contactNumber,setContactNumber]=useState("")
    const [email,setEmail]=useState("")
    const [paymentMethod,setPaymentMethod]=useState("")
    const [paymentInfo,setPaymentInfo]=useState("")

    useEffect(()=>{
        if(client){
            setName(client.name)
            setEstablishment(client.establishment)
            setDirection(client.direction)
            setContactNumber(client.contactNumber)
            setEmail(client.email)
            setPaymentMethod(client.paymentMethod)
            setPaymentInfo(client.paymentInfo)
        }
    },[])
    
    const save=()=>{
        try {
            if(client){
                const updatedClient={name,establishment,direction,contactNumber:Number.parseInt(contactNumber) ,email,paymentMethod,paymentInfo,clientId:client.id}
                updateClient(updatedClient)
                    .then(()=>backToFinder())
                    .catch(error=>console.log(error))
            }
            else{
                const newClient={name,establishment,direction,contactNumber:Number.parseInt(contactNumber),email,paymentInfo,paymentMethod}
                addClient(newClient)
                    .then(()=>backToFinder())
                    .catch(error=>console.log(error))

            }
            
        } catch (error) {
            console.log(error)
        }
    }
    const remove=()=>{
        try{
            removeClient(client.id)
                .then(()=>{backToFinder()})
                .catch(error=>console.log(error))
        }catch(error){
            console.log(error)
        }
    }

    return <div className="search-panel">
            <div className="search-panel__top-bar">
                Cliente
            </div>
            <div className="search-panel__search-input">
                Nombre:
                <input type="text" placeholder="Nombre" onChange={({target:{value}})=>{setName(value)}} value={name}/>
                Empresa:
                <input type="text" placeholder="Empresa" onChange={({target:{value}})=>{setEstablishment(value)}} value={establishment} />
                Dirección:
                <input type="text" placeholder="Dirección" onChange={({target:{value}})=>{setDirection(value)}} value={direction} />
            </div>
            <div className="search-panel__search-input">
                Número de contacto:
                <input type="text" placeholder="Número" onChange={({target:{value}})=>{setContactNumber(value)}} value={contactNumber} />
                Correo electrónico:
                <input type="text" placeholder="Email" onChange={({target:{value}})=>{setEmail(value)}} value={email} />
            </div>
            <div className="search-panel__search-input">
                Método de pago:
                <input type="text" placeholder="Diario, Mensual, En mano, Transferencia" onChange={({target:{value}})=>{setPaymentMethod(value)}} value={paymentMethod} />
                Información de pago
                <input type="text" placeholder="Número de cuenta" onChange={({target:{value}})=>{setPaymentInfo(value)}} value={paymentInfo} />
            </div>
            
            
            <div className="search-panel__search-buttons">
                {name && <button className="search-button" onClick={save}>
                    Guardar cliente
                </button>}
                { client && <button className="search-button" onClick={remove}>
                    Eliminar cliente
                </button>}
                { client && <button className="search-button" onClick={backToFinder}>
                    Descartar
                </button>}
                { client && <button className="search-button">
                    Gestionar descuentos
                </button>}
                { !client && <button className="search-button">
                    Volver
                </button>}
            </div>
        </div>
}