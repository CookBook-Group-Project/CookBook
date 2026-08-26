import React from 'react'
import Nav from '../Nav/Nav'
import './NotFound.css'

const NotFound = () => {
    return (
        <div> 
            <Nav />
            <div className='not-found'>
                <p>
                    Sorry! The page you are looking for does not exist.
                </p>
                <div className='animation-container-404'>
                    <div id="cooking">
                        <div class="bubble"></div>
                        <div class="bubble"></div>
                        <div class="bubble"></div>
                        <div class="bubble"></div>
                        <div class="bubble"></div>
                        <div id="area">
                            <div id="sides">
                                <div id="pan"></div>
                                <div id="handle"></div>
                            </div>
                            <div id="pancake">
                                <div id="pastry"></div>
                                <div className='cook-book'>Cook Book<span className='orange'>.</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound