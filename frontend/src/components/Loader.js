import React from 'react'
import { CircularProgress } from '@material-ui/core'

const Loader = () => {
    return (
        <div style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress color="secondary" size={100} />
        </div>
    )
}

export default Loader
