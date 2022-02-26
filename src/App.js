import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import UserPage from './pages/UserPage';
import Toolbar from './components/Toolbar';
import CreateAuctionPage from './pages/CreateAuctionPage'
import MainPage from './pages/MainPage'
import Auction from './components/Auction';
import Logout from './components/Logout';
import UserContext from './context/UserContext';

function App() {
  const [getUser, setUser] = useState(null)
  return (
    <div className='d-flex column align-center'>
      <BrowserRouter>
        <UserContext.Provider value={{ getUser, setUser }}>

          <Toolbar />

          <Routes>

            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/profile' element={<UserPage />} />
            <Route path='/create' element={<CreateAuctionPage />} />
            <Route path='/' element={<MainPage />} />
            <Route path='/auction/:id' element={<Auction />} />
            <Route path='/logout' element={<Logout />} />

          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
