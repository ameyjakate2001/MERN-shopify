import React from 'react'

const Heading = ({ headingText, align }) => {
    return (
        <React.Fragment>
            <h1 style={{
                textTransform: 'uppercase',
                letterSpacing: 2,
                fontWeight: '500',
                color: '#585858',
                textAlign: align
            }}
            >
                {headingText}
            </h1>
        </React.Fragment>
    )
}

export default Heading
