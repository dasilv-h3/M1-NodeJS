import { RouterProvider } from 'react-router-dom'
import './App.css'
import { AuthProvider } from "./context/AuthContext";
// import Navbar from "./components/Navbar"
// import Footer from "./components/Footer"
import router from './routes';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
