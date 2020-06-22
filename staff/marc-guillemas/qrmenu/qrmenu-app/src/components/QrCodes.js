import React, { useState } from 'react'
import QRCode from 'react-qr-code'
import './QrCodes.sass'


export default function({qrcode}) {
debugger
    

    console.log(qrcode)
    return <section className="qr">
        <div className="qr__container">
            {qrcode ? <QRCode value={`http://192.168.0.78:3000/#/establishment/${qrcode.establishmentId}/table/${qrcode.tableId}`} className="qr__qrcode" size="350"/> : console.log("no qr code to read")}
        </div>
    </section>
}