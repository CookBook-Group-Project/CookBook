
import './Home.css'

import circle from './circle.png'
import landingImage from './landing-image.png'
import hiddenBg from './hidden-bg.png'



const Home = () => {
    return (
        <>
    <div className='upper'>
        <img src={circle} alt='circle' className='circle'></img>
            <img src={landingImage} alt='landing-image' className='landing-image'></img>
        <img src={hiddenBg} className='hidden-bg' alt='hidden-bg'>

        </img>
        <div className='container-text'>
            <h1>CookBook<span class='span'>.</span></h1>
            <h3>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer."</h3>
        </div>
    </div>
    <div className='lower'>

    </div>
    </>
    )
}

export default Home