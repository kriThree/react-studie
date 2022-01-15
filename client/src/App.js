import React from 'react';
import 'materialize-css';
import { useRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/navbar';

function App() {
  const { login, logout, token, userId } = useAuth();
  const isAuthenicated = !!token;
  const routes = useRoutes(isAuthenicated);
  console.log(routes);
  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isAuthenicated }}>
      <BrowserRouter>
      {isAuthenicated && <Navbar />}
        <div className='container'>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
