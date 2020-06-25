import React,{useState} from 'react';
import './App.css';
import Landing from "./Landing"
import "./Commons.sass"
import NavigationBar from "./NavigationBar"
import Searcher from "./Finder"
import Editor from "./Editor" 
import Feedback from "./Feedback"
const {retrieveAllClients,retrieveAllProducts,retrieveAllDeliveries, retrieveDelivery, addProductToDelivery,removeProductFromDelivery,makeEmptyDelivery, retrieveAllDeliveryTemplates}= require("facturator-client-logic")
function App() {
  const[view, setView]= useState("landing") // If the View is from clients, products, deliverys or templates
  const[action, setAction]= useState() // If finding, editing or creating new data

  const [selection, setSelection]= useState() // Client that is selected 
  const [allFinds, setAllFinds]= useState() //It can be all Products, all Clients, all templates ...

  const [feedbackError,setError]= useState()
 
  const handleChangeview=(newView)=>{
    switch (newView){
      case "clients":
        handelFindClients()
        break;
      case "products":
        handleFindProducts()
        break;
      case "deliveries":
        handleFindDeliveries()
        break;
      case "templates":
        handelFindDeliveryTemplates()
        break;
    }
  }
  
  const handleGoToFinder=()=>{
    setAction("find")
  }
  //////////////////
  //Handle finders//
  //////////////////
  const handleFindProducts=()=>{
    try {
      return retrieveAllProducts()
        .then(products=>{
          setAllFinds(products)
          setView("products")
          setAction("find")
        })
        .catch(error=>setError(error.message))
    } catch (error) {
      setError(error.message)
    }
  }
  const handelFindClients=()=>{
    try {
      return retrieveAllClients()
        .then(clients=>{
          setAllFinds(clients)
          setView("clients")
          setAction("find")
        })
        .catch(error=>setError(error.message))
    } catch (error) {
      setError(error.message)
    }
  }
  const handleFindDeliveries=()=>{
    try {
      return retrieveAllDeliveries()
        .then(deliveries=>{
          setAllFinds(deliveries)
          setView("deliveries")
          setAction("find")
        })
        .catch(error=>setError(error.message))
    } catch (error) {
      setError(error.message)
    }
  }
  const handleFindProductToDelivery=(_delivery)=>{
    return retrieveAllProducts()
      .then(products=>{
        setSelection(_delivery)
        setAllFinds(products)
        setView("delivery/add")
        setAction("find")
      })
      .catch(error=>setError(error.message))
  }
  const handleFindDeliveryClients=(useTemplate)=>{
    //if(useTemplate) return handelFindDeliveryTemplates(useTemplate)
    try {
      return retrieveAllClients()
        .then(clients=>{
          setAllFinds(clients)
          setView("delivery/clients")
          setAction("find")
        })
        .catch(error=>setError(error.message))
    } catch (error) {
      setError(error.message)
    }
  }
  const handelFindDeliveryTemplates=(forDelivery)=>{
    try {
      return retrieveAllDeliveryTemplates()
        .then(templates=>{
          setAllFinds(templates)
          setView(forDelivery? "delivery/templates":"templates")
          setAction("find")
        })
        .catch(error=>{setError(error.message)})
    } catch (error) {
      setError(error.message) 
    }
  }
  
  //////////////////
  //Handle editors//
  //////////////////

  //Could be refactor into one function
  const handleGoToClientEdition=(_client)=>{
    setSelection(_client)
    setAction("edit")
  }
  const handleGoToProductEdition=(_product)=>{
    setSelection(_product)
    setAction("edit")
  }
  const handleGoToDeliveryEdition=(_edition)=>{
    try{
      return retrieveDelivery(_edition.id)
        .then((delivery)=>{
          setSelection(_edition)
          setAllFinds(delivery)
          setView("delivery/edit")
          setAction("find")
          return
        })
        .catch(error=>setError(error.message))
    }catch(error){
      setError(error.message)
    }
  }
  const handleGoToTemplateAdition=()=>{
    setAction("edit")
  }

  //////////////////
  //Handle adition//
  //////////////////
  const handleAddToDelivery=(productQuantity)=>{
    try {
      return addProductToDelivery(selection.id,productQuantity)
        .then(()=>{
           return handleGoToDeliveryEdition(selection)
        })
        .catch(error=>{setError(error.message)})
    } catch (error) {
      setError(error.message)
    }
  }
  const handleRemoveFromDelivery=(deliveryId,productQuantityId)=>{
    try{
      return removeProductFromDelivery(deliveryId,productQuantityId)
        .then(()=>{return handleGoToDeliveryEdition(selection)})
        .catch(error=>setError(error.message))
    }catch(error){
      setError(error.message)
    }
  }
  const handleNewDelivery=(clientId)=>{
    try {
      return makeEmptyDelivery(clientId)
        .then(()=>{return handleFindDeliveries()})
        .catch(error=>{setError(error.message)})
    } catch (error) {
      setError(error.message)
    }
  }
  const handleSelectTemplate=(templateId)=>{
    setSelection(templateId)
    return handleFindDeliveryClients()
  }
  
  const handleRemoveFeedback=()=>{
    setError()
  }
  const handleOnError=(error)=>{
    setError(error.message)
  }
  return (
    <div>
      <NavigationBar currentView={view} changeView={handleChangeview} ></NavigationBar>
      {feedbackError && <Feedback message={feedbackError} back={handleRemoveFeedback}></Feedback>}
      {view==="clients" && action==="find" && <Searcher type={view} goToEdition={handleGoToClientEdition} onError={handleOnError} allFinds={allFinds}></Searcher>}
      {view==="products" && action==="find" && <Searcher type={view} goToEdition={handleGoToProductEdition}  onError={handleOnError} allFinds={allFinds}></Searcher>}
      {view==="deliveries" && action==="find" && <Searcher type={view} goToEdition={handleGoToDeliveryEdition}  onError={handleOnError} addTo={handleFindDeliveryClients} allFinds={allFinds}></Searcher>}
      {view==="templates" && action==="find" && <Searcher type={view} goToEdition={handleGoToDeliveryEdition}  onError={handleOnError} addTo={handleGoToTemplateAdition} allFinds={allFinds}></Searcher>}
      {view==="delivery/clients" && action==="find" && <Searcher type={view} goToEdition={handleGoToDeliveryEdition}  onError={handleOnError} addTo={handleNewDelivery} back={handleFindDeliveries} allFinds={allFinds}></Searcher>}
      {view==="delivery/edit" && action==="find" && <Searcher type={view} goToEdition={handleFindProductToDelivery} onError={handleOnError}  back={()=>{handleChangeview("deliveries")}} remove={handleRemoveFromDelivery} allFinds={allFinds}></Searcher>}
      {view==="delivery/add" && action==="find" && <Searcher type={view} goToEdition={()=>{handleGoToDeliveryEdition(selection)}} onError={handleOnError}  addTo={handleAddToDelivery} delivery={selection} allFinds={allFinds}></Searcher>}
      {false && view==="delivery/templates" && action==="find" && <Searcher type={view} goToEdition={()=>{handleGoToDeliveryEdition(selection)}} onError={handleOnError} back={()=>{handleChangeview("deliveries")}}  addTo={handleSelectTemplate} delivery={selection} allFinds={allFinds}></Searcher>}
      {view==="clients" && action==="edit" && <Editor type={view} backToFinder={handelFindClients}  onError={handleOnError} client={selection}></Editor>}
      {view==="products" && action==="edit" && <Editor type={view} backToFinder={handleFindProducts}  onError={handleOnError} product={selection}></Editor>}
      {false && view==="templates" && action==="edit" && <Editor type={view} backToFinder={handelFindDeliveryTemplates} onError={handleOnError}  ></Editor>}

    </div>
  );
}

export default App;
