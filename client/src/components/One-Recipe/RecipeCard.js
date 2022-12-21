import Nav from '../Nav/Nav'
import './RecipeCard.css'

const RecipeCard = (props) => {


    //We pull down the list of all recipes via props so that cards can be generated for each.
    const {recipe} = props


    // Switching between image and directions view 
    const handleClick = () =>{
        const recImg = document.querySelector('.image-container')
        const directions = document.querySelector('.directions-container')
        const show = document.querySelector('.show-directions')

        recImg.style.display = 'none'
        directions.style.display = 'block'
        show.innerHTML = 'Currently Cooking'
    }

        // We need to plug in recipe.title, recipe.serves , etc 

    return (
        <div>
            <Nav></Nav>
            {/* Overall Container  */}
            <div className='recipe-card-container'>
            {/* Left Container */}
                <div className='recipe-card-left'>
                    <div className='left-title'>
                        <h1>Directions and</h1>
                        <h2>ingredients.</h2>
                    </div>
                    <div className='recipe-card'>
                        <div className='recipe-card-top'>
                            <h3>Servings 
                                <span className='card-span'>4</span>
                            </h3>
                            <h3>Prep Time 
                                <span className='card-span'>20 mins</span>
                            </h3>
                            <h3>Cook Time 
                                <span className='card-span'>40 mins</span>
                            </h3>
                        </div>
                        <div className='recipe-card-bottom'>
                            <h1>Ingredients Needed</h1>
                            <p>Ingredients list goes here</p>
                        </div>
                        <h2 className='show-directions' onClick={handleClick}>Show Directions</h2>
                    </div>
                </div>
                {/* Right Container  */}
                <div className='recipe-card-right'>
                <div className='card-right-container'>
                    <h3 className='recipe-title'>Recipe Title</h3>
                    <hr className='recipe-title-divider'></hr>
                    <div className='image-container'>
                        <img src='https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' alt='recipe image' className='recipe-card-image'></img>
                    </div>
                    <div className='directions-container'>
                    <p>directions</p>
                    <p>directions</p>
                    <p>directions</p>
                    </div>
                </div>
                </div>
            </div>

        </div>
    )
}

export default RecipeCard