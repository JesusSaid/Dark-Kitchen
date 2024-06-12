import React from 'react'

const error = () => {
    return (
        <div style={{display:'grid', placeItems:'center', textAlign:'center'}}>
            <h1 style={{fontSize:'5rem'}}>404 Not Found</h1>
            <h3 style={{fontSize:'2.5rem'}}>Lo sentimos, la página que buscas no existe.</h3>
            <img src='./candle.gif'></img>
        </div>
    )
}

export default error
