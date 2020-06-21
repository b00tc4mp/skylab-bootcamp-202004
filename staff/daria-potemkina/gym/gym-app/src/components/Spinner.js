import React from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader'
import './Spinner.sass'

export default function ({ loading }) {
    return <section className="loading">
        <PropagateLoader
            size={18}
            color={"#54C0B0"}
            loading={loading}
        />
    </section>
}