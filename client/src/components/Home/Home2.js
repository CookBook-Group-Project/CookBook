import React from 'react'
import './Home2.css'

import circle from './orange-circle.png'
import family from './Images/family.png'
import quick from './Images/quick.png'
import together from './Images/together.png'


const Home2 = () => {
  return (
    <div className='bg'>
    <img src={circle} alt='circle' className='orange-circle'></img>
        <div class="container">
          <img class="smoke" src= "https://www.dif.co.th/wp-content/uploads/revslider/sport-smoke.png"/>
        </div>
        <div class="container">
          <img class="smoke" src= "https://www.dif.co.th/wp-content/uploads/revslider/sport-smoke.png"/>
        </div>
        <div className='image-container'>
          <div class="column" id="bg-img">
          </div>
          </div>
          <div class="column" id="col-places">
            <div id="col-images">
              <div class="col-text">
                <div>
                  <img src={together} alt='together'/>
                <h3>Together</h3>
                </div>
                  <p>The Golden temple is famous for its full golden dome, it is one of the most sacred pilgrim spots for Sikhs</p>
              </div>
              <div class="col-text">
                  <div>
                    <img src={quick} alt='quick'/>
                    <h3>Quick</h3>
                  </div>
                  <p>The Himalayas stretch uninterruptedly for about 1,550 miles (2,500 km) in Asia</p>
              </div>
              <div class="col-text">
                <div>
                  <img src={family} alt='family'/>
                  <h3>Family </h3>
                </div>
                <p>The Jagannath Temple is an important Hindu temple dedicated to Jagannath, a form of Vishnu </p>
              </div>
            </div>
          </div>
      </div>
  )
}

export default Home2