import "./App.css";
// setting BrowserRouter as Router breaks the app. -CS
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import axios from 'axios'
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from './components/Home/Home'
import Explore from "./views/Explore";
import AddRecipe from './components/Create-Recipe/AddRecipe'
import RecipeCard from "./components/Recipe-Card/RecipeCard";
import {UpdateRecipe}  from "./components/Update-Recipe/UpdateRecipe";

// import NavBar from './components/Nav/Nav'



function App() {
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getLoggedUser", { withCredentials: true })
      .then(
        (res) => (
          // console.log(res),
          setLoggedUser({
            id: res.data.user._id,
            username: res.data.user.username,
          })
        )
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{loggedUser, setLoggedUser}}>
      <BrowserRouter>
      {/* Nav bar will be imported into every component directly for access to useContext  */}
        {/* <NavBar/> */}
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/explore' element={<Explore/>} />
            {/* Recipe card path added to test out its development */}
            <Route path='/card' element={<RecipeCard/>} />

            {/* <Route path='/login' element={<Login setLoginUser={setLoginUser}/>}/> */}
            {/* <Route path='/allRecipes' element={<DisplayAll/>}  /> */}
            {/* <Route path='/addRecipe' element={<Form setList={setTaskList}/>}/> */}
            <Route path='/addRecipe' element={<AddRecipe/>}/>
            <Route path='/update/:id' element={<UpdateRecipe/>}/>
            {/* <Route path='/oneRecipe/:id' element={<OneRecipe/>}/> */}
            {/* <Route path='/edit/:id' element={<EditForm />}/> */}
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
