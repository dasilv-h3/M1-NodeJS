import { RouterProvider } from 'react-router-dom'
import './App.css'
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import router from './routes/Index';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </AuthProvider>
  );
}

export default App;
