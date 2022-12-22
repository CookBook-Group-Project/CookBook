import React from 'react'
import Nav from './Nav/Nav'

const NotFound = () => {
    return (
        <div> 
            <Nav />
            <div>
                <p>
                    Sorry! The page you are looking for does not exist.
                </p>
            </div>
        </div>
    )
}

export default NotFound