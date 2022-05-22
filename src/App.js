import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useEffect, useState } from 'react';

function App() {
  const [dashboardVerified, setDashboardVerified] = useState(false)
  const [mainStyle, setMainStyle] = useState('')

  useEffect(() => {
    setMainStyle(dashboardVerified ? 'w-75 h-75 bg-white' : 'text-white w-50')
  }, [dashboardVerified])

  return (
    <Router>
      <main className={'py-5 px-4 rounded ' + mainStyle}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard setDashboardVerified={(state) => setDashboardVerified(state)} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
