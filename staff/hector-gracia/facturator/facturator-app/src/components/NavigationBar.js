import React from 'react'
import './NavigationBar.sass'


export default function ({currentView, changeView}) {
    const handleToClients=()=>{changeView("clients")}
    const handleToProducts=()=>{changeView("products")}
    const handleToDeliveries=()=>{changeView("deliveries")}
    const handleToTemplates=()=>{changeView("templates")}
    return <div className="navigation-bar">
    <div className={`navigation-link navigation-link--${currentView==="clients"?"selected":"unselected" }`} onClick={handleToClients}>Clientes</div>
    <div className={`navigation-link navigation-link--${currentView==="products"?"selected":"unselected" }`} onClick={handleToProducts}>Productos</div>
    <div className={`navigation-link navigation-link--${currentView==="deliveries"?"selected":"unselected" }`} onClick={handleToDeliveries}>Albaranes</div>
    <div className={`navigation-link navigation-link--${currentView==="templates"?"selected":"unselected" }`} onClick={handleToTemplates}>Plantillas</div>
</div>
}