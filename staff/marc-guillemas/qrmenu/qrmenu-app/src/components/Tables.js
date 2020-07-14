import React, {useEffect, useState} from 'react'
import './Tables.sass'
import {retrieveTables, toggleTableOrder} from 'qrmenu-client-logic'

export default function({onToggleTable}) {
    const [tables, setTables] = useState([])
    const [qrlink, setQrLink] = useState()
    
    useEffect(() => {
        try {
            
            retrieveTables(sessionStorage.token)
            .then(_tables => {
                return setTables(_tables)
             
                
            })
        } catch (error) {
            console.error(error)
        }
    },[tables.active])
    
    const toggleTable = (active, id) => {
        let qr
        return toggleTableOrder(sessionStorage.token, id)
        .then(_qrlink => {
            qr = _qrlink
            return setQrLink(_qrlink)
            
        })
        .then(() => retrieveTables(sessionStorage.token))
        .then(_tables => {
            return setTables(_tables)
            
        }).then(()=> {
            if(active === false) onToggleTable(qr)
            else return 
        })
    }

    return <section class="tables">
   
           
        {
            tables? <ul class="tables__list">
                { 
                    tables && tables.map(({table, active, _id}) => {
                        return <li class="tables__item">
                            <a href="" class="tables__left">
                                <div className={`${active ? "tables__status tables__status--active" : "tables__status"}`}></div>
                                <div class="tables__num">
                                    <h2 class="tables__table">Table: </h2>
                                    <h1 class="tables__number">{`${table}`}</h1>
                                </div>
                            </a>
                            <div class="tables__right">
                                <div class={`${active ? "tables__toggle tables__toggle--active" : "tables__toggle"}`} onClick={()=> toggleTable(active, _id)}><div class={`${active ? "tables__switch tables__switch--active" : "tables__switch"}`}></div></div>
                                <div class="tables__qr"></div>
                            </div>
                        </li>
                    })
                } 
                
                </ul> : console.error("Waiting...")
        }
        
    </section>
}