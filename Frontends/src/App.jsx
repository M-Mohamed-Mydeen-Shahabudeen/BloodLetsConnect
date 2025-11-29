import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AddDonor from './pages/AddDonor';
import HospitalDashboard from './pages/HospitalDashboard';
import RequestBlood from './pages/RequestBlood';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/request-blood" element={<RequestBlood />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/hospital" element={<HospitalDashboard />} />
            <Route path="/admin/add" element={<AddDonor />} />
            <Route path="/admin/edit/:id" element={<AddDonor />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
