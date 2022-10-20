import React, {useState} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './public/app.css';
import NavBar from './components/nav-bar';
import LogIn from './components/login';
import MoviesList from './components/movies-list';
import AddReview from './components/add-review';
import Movie from './components/movie';
import LogOut from './components/logout';

export default function App() {
  const [user, setUser] = useState(null);

  async function login(user=null) {
      setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <NavBar user={user}/>
        <Routes>
          <Route path='/' element={<MoviesList />} />
          <Route path='/movies' element={<MoviesList />} />
          <Route path='/movies/id/:id' element={<Movie render={(props)=>({...props})} user={user} />} />
          <Route path='/movies/id/:id/review' element={<AddReview render={(props)=>({...props})} user={user} />} />
          <Route path='/login' element={<LogIn render={(props)=>({...props})} login={login} />} />
          <Route path='/logout' element={<LogOut render={(props)=>({...props})} logout={logout} />} />
          <Route path="*" element={<h1 style={{marginLeft:'20px', fontWeight: 'bold'}}>Page Not Found :(</h1>} />
        </Routes>
    </div>
  );
}
