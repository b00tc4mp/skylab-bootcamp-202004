import React,{useState,useEffect} from 'react'
import './SearchPanel.sass'
import "./Commons.sass"
const {updateClient,addClient,removeClient,addProduct}= require("facturator-client-logic")




export default function ({client,product,backToFinder,type, onError}) {

    //////Multiple uses//////
    //////Client//////
    const [name,setName]=useState("")
    const [establishment,setEstablishment]=useState("")
    const [direction,setDirection]=useState("")
    const [contactNumber,setContactNumber]=useState("")
    const [email,setEmail]=useState("")
    const [paymentMethod,setPaymentMethod]=useState("")
    const [paymentInfo,setPaymentInfo]=useState("")
    const [header,setHeader]= useState("")
    //////Product//////
    const [price, setPrice]= useState()
    const [description,setDescription]=useState("")
    const [alergens, setAlergens]=useState("")

    useEffect(()=>{
        switch (type){
            case "clients":
                setHeader("Cliente")
                if(client){
                    setName(client.name)
                    setEstablishment(client.establishment)
                    setDirection(client.direction)
                    setContactNumber(client.contactNumber)
                    setEmail(client.email)
                    setPaymentMethod(client.paymentMethod)
                    setPaymentInfo(client.paymentInfo)
                }
                break;
            case "products":
                setHeader("Producto")
                if(product){
                    setName(product.name)
                    setPrice(product.price)
                    setDescription(product.description)
                    setAlergens(product.alergens ? product.alergens.join() : "")
                }
                break;
            case "templates":
                setHeader("Nueva Plantilla")
        }
    },[])
    
    const save=()=>{
        try {
            switch (type){
                case "clients":
                    if(client){
                        const updatedClient={name,establishment,direction,contactNumber:Number.parseInt(contactNumber) ,email,paymentMethod,paymentInfo,clientId:client.id}
                        return updateClient(updatedClient)
                            .then(()=>backToFinder())
                            .catch(error=>onError(error))
                    }
                    else{
                        const newClient={name,establishment,direction,contactNumber:Number.parseInt(contactNumber),email,paymentInfo,paymentMethod}
                        return addClient(newClient)
                            .then(()=>backToFinder())
                            .catch(error=>onError(error))
        
                    }
                case "products":{
                    const newProduct={name,price:Number.parseFloat(price),description,alergens}
                    return addProduct(newProduct)
                        .then(()=>backToFinder())
                        .catch(error=>onError(error))
                }
            }
        } catch (error) {
            onError(error)
        }
    }
    const remove=()=>{
        try{
            removeClient(client.id)
                .then(()=>{backToFinder()})
                .catch(error=>onError(error))
        }catch(error){
            onError(error)
        }
    }

    return <div className="search-panel">
            <div className="search-panel__top-bar">
                {header}
            </div>
            {type==="clients" && <>
            
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
                {name && paymentMethod && <button className="search-button" onClick={save}>
                    Guardar cliente
                </button>}
                { client && <button className="search-button" onClick={remove}>
                    Eliminar cliente
                </button>}
                { client && <button className="search-button" onClick={backToFinder}>
                    Descartar
                </button>}
                { false && client && <button className="search-button">
                    Gestionar descuentos
                </button>}
                { !client && <button className="search-button" onClick={backToFinder}>
                    Volver
                </button>}
            </div>
            </>}
            {type==="products" && <>
            
            <div className="search-panel__search-input">
                Nombre:
                <input type="text" placeholder="Nombre" onChange={({target:{value}})=>{setName(value)}} value={name}/>
                Descripción:
                <input type="text" placeholder="Descripción" onChange={({target:{value}})=>{setDescription(value)}} value={description} />
            </div>
            <div className="search-panel__search-input">
                Precio:
                <input type="text" placeholder="Precio base" onChange={({target:{value}})=>{setPrice(value)}} value={price} />
                Alérgenos:
                <input type="text" placeholder="Separados por coma ," onChange={({target:{value}})=>{setAlergens(value)}} value={alergens} />
            </div>
            <div className="search-panel__search-buttons">
                {name && price && !product && <button className="search-button" onClick={save}>
                    Guardar producto
                </button>}
                {false && product && <button className="search-button" onClick={remove}>
                    Eliminar producto
                </button>}
                { product && <button className="search-button" onClick={backToFinder}>
                    Volver
                </button>}
                { !product && <button className="search-button" onClick={backToFinder}>
                    Descartar
                </button>}
            </div>
            </>}
            {type==="templates" && <>
            
            <div className="search-panel__search-input">
                Nombre:
                <input type="text" placeholder="Nombre" onChange={({target:{value}})=>{setName(value)}} value={name}/>
            </div>
            <div className="search-panel__search-buttons">
                {name  && <button className="search-button" onClick={save}>
                    Guardar plantilla
                </button>}
                <button className="search-button" onClick={backToFinder}>
                    Descartar
                </button>
            </div>
            </>}
        </div>
}