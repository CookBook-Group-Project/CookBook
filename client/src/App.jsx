import "./App.css";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import api from "./config/api";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from './components/Home/Home'
import Explore from "./views/Explore";
import AddRecipe from './components/Create-Recipe/AddRecipe'
import RecipeCard from "./components/One-Recipe/RecipeCard";
import {UpdateRecipe}  from "./components/Update-Recipe/UpdateRecipe";
import { UserRecipes } from "./components/Your-Recipes/UserRecipes";
import NotFound from "./components/Not-Found/NotFound";

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    api
      .get("/api/getLoggedUser")
      .then((res) =>
        setLoggedUser({
          id: res.data.user._id,
          username: res.data.user.username
        })
      )
      .catch((err) => console.log("logged user error", err))
      .finally(() => setAuthChecked(true));
  }, []);

  if (!authChecked) {
    return null;
  }

  return (
    <div className="App">
      <UserContext.Provider value={{loggedUser, setLoggedUser}}>
      <BrowserRouter>
        <Routes>
          {loggedUser?
          <>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/explore' element={<Explore/>} />
            <Route path='/recipe/:id' element={<RecipeCard/>}/>
            <Route path = '/recipes/loggedUser/:id' element={<UserRecipes/>}/>
            <Route path='/addRecipe' element={<AddRecipe/>}/>
            <Route path='/update/:id' element={<UpdateRecipe/>}/>
            <Route path="*" element={<NotFound />} />
          </>
          :
          <>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/explore' element={<Explore/>} />
            <Route path="*" element={<Navigate replace to='/' />}/>
          </>
          }

            {/* Recipe card path added to test out its development */}
            {/* <Route path='/edit/:id' element={<EditForm />}/> */}
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
