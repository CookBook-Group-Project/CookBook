import "./App.css";
//setting BrowserRouter as Router breaks the app. -CS
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Login from "./components/Login";
import Register from "./components/Register";
import NavBar from './components/Nav/Nav'
import Home from './components/Home/Home'
import Home2 from "./components/Home/Home2";
import Explore from "./views/Explore";
import AddRecipe from './components/AddRecipe'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/home2' element={<Home2/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/explore' element={<Explore/>} />
            {/* <Route path='/login' element={<Login setLoginUser={setLoginUser}/>}/> */}
            {/* <Route path='/allRecipes' element={<DisplayAll/>}  /> */}
            {/* <Route path='/addRecipe' element={<Form setList={setTaskList}/>}/> */}
            <Route path='/addRecipe' element={<AddRecipe/>}/>
            {/* <Route path='/oneRecipe/:id' element={<OneRecipe/>}/> */}
            {/* <Route path='/edit/:id' element={<EditForm />}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
