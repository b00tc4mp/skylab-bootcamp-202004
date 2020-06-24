import React, { useState } from 'react'
import QRCode from 'react-qr-code'
import './QrCodes.sass'


export default function({qrcode}) {

    

    return <section className="qr">
        <div className="qr__container">
            {qrcode && <QRCode value={`http://192.168.0.170:3000/#/establishment/${qrcode.establishmentId}/table/${qrcode.tableId}`} className="qr__qrcode" size="350"/> }
        </div>
    </section>
}