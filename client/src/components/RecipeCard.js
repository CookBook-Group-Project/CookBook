import React from 'react'

const RecipeCard = (props) => {

    //@CHRIS - Go ahead and delete all the styling down there. I've just been using it to help visualize what's being built. - GL 17DEC2022
    //We pull down the list of all recipes via props so that cards can be generated for each.
    const {recipe} = props

    //Placeholder style for the card container
    const cardStyle = {
        "background": "grey",
        "height": "300px",
        "width": "200px",
        "display": "flex",
        "flex-direction": "column",
        "text-align": "center"
    }
    
    //Placeholder style for time image
    const imageStyle = {
        "object-fit": "cover",
        "height": "280px",
        "width": "180px",
        "padding": "20px"
    }

    return (
        <div>
            {/*Grant 17DEC2022 - The block below is used to help see work being done on the component due to the navigation styling. This can be deleted once complete. */}
            <div style={{height:"90px", background: "white"}}></div>

            {/* Recipe cards that will be mapped out on the screen */}
            <div style={cardStyle}>
                <p>{recipe.title}</p>
                <img style={imageStyle} src='https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg' alt="Recipe image"/>
            </div>
        </div>
    )
}

export default RecipeCard