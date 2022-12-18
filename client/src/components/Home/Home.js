import React,{useState} from 'react'
import './Home.css'

import circle from './Images/orange-circle.png'
import family from './Images/family.png'
import quick from './Images/quick.png'
import together from './Images/together.png'


const Home = () => {






  return (

    <div className='bg'>

    {/* Top - Image */}
      <img src={circle} alt='circle' className='orange-circle'></img>
        <div class="container">
          <img class="smoke" src= "https://www.dif.co.th/wp-content/uploads/revslider/sport-smoke.png" alt='smoke'/>
        </div>
        <div class="container">
          <img class="smoke" src= "https://www.dif.co.th/wp-content/uploads/revslider/sport-smoke.png" alt='smoke'/>
        </div>
        <div className='image-container'>
          <div class="column" id="bg-img">
            <div class="typewriter">CookBook<span className='span'>.</span></div>
          </div>
        </div>

      {/* Cards container - Gray Box */}
        <section className='triangle'>
        <div class="card-container">
          <div class="card" id='card1'>
            <h3 class="title">Card 1</h3>
              <div class="bar">
                <div class="emptybar"></div>
                <div class="filledbar"></div>
              </div>
              <div class="circle">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <circle class="stroke" cx="60" cy="60" r="50"/>
                </svg>
              </div>
          </div>
          <div class="card" id='card2'  >
            <h3 class="title">Card 2</h3>
            <div class="bar">
              <div class="emptybar"></div>
              <div class="filledbar"></div>
            </div>
            <div class="circle">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle class="stroke" cx="60" cy="60" r="50"/>
              </svg>
            </div>
          </div>
          <div class="card" id='card3' >
            <h3 class="title">Card 3</h3>
            <div class="bar">
              <div class="emptybar"></div>
              <div class="filledbar"></div>
            </div>
            <div class="circle">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle class="stroke" cx="60" cy="60" r="50"/>
              </svg>
            </div>
          </div>
          <div class="card" id='card4' >
            <h3 class="title">Card 4</h3>
            <div class="bar">
              <div class="emptybar"></div>
              <div class="filledbar"></div>
            </div>
            <div class="circle">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle class="stroke" cx="60" cy="60" r="50"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Card Text Container */}
        <div className='text-container'>
          <h3 className='card1-text'>Card 1</h3>
          <h3 className='card2-text'>Card 2</h3>
          <h3 className='card3-text'>Card 3</h3>
          <h3 className='card4-text'>Card 4</h3>
        </div>
    </section>

    {/* Lower Container */}
    <section class="full-height">
          <div class="column" id="col-places">
            <div id="col-images">
              <div class="col-text">
                <div>
                  <img src={together} alt='together'/>
                  <h3>Together</h3>
                </div>
                  <p>Cook up something with a friend or family member.</p>
              </div>
              <div class="col-text">
                  <div>
                    <img src={quick} alt='quick'/>
                    <h3>Quick</h3>
                  </div>
                  <p>In a hurry ? We have recipes you can do in under 30 mins !</p>
              </div>
              <div class="col-text">
                <div>
                  <img src={family} alt='family'/>
                  <h3>Family </h3>
                </div>
                <p>Store your family's recipes to share with your friends. </p>
              </div>
            </div>
          </div>
          </section>
      </div>
  )
}

export default Home