import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from "./Pages/contexts/AuthContext";
import Navbar from "./Pages/Navbar";
import Footer from "./Pages/footer";
import Front from "./Pages/Home/Front";
import Content from './Pages/About/Content';
import ShowPage from './Pages/Show/ShowPage';
import Signup from './Pages/Signup/Signup';
import Signin from './Pages/Signup/Signin';
import New from './Pages/Addplace/New';
import Edit from './Pages/Edit/Edit';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<Front />} />
          <Route path="/About" element={<Content />} />
          <Route path="/Show/:id" element={<ShowPage />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Signin' element={<Signin />} />
          <Route path='/New' element={<New />} />
          <Route path="/Edit/:id" element={<Edit />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;