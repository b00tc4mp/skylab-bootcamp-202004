import React from 'react'
import './PlaneBuilder.css'

export default function PlaneBuilder () {

    return <div className='plane-builder'>
            <div className="plane-builder__plane" 
                style={{
                    width: 32 * 20 + 1,
                    height: 32 * 18 + 1
            }}></div>
            <div className="plane-builder__item"></div>

    </div>
}