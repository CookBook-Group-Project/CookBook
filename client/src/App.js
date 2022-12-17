
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import "./App.css";


import NavBar from './components/Nav/Nav'
import Home from './components/Home/Home'




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                {/* <Route path='/register' element={<Register/>}/> */}
                {/* <Route path='/login' element={<Login setLoginUser={setLoginUser}/>}/> */}
                {/* <Route path='/allRecipes' element={<DisplayAll/>}  /> */}
                {/* <Route path='/addRecipe' element={<Form setList={setTaskList}/>}/> */}
                {/* <Route path='/oneRecipe/:id' element={<OneRecipe/>}/> */}
                {/* <Route path='/edit/:id' element={<EditForm />}/> */}
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
