import React from 'react'
import { Alert } from '@material-ui/lab'
const Message = ({ type, msg }) => {
    return (
        <div>
            <Alert severity={type}>{msg}</Alert>
        </div>
    )
}

export default Message
