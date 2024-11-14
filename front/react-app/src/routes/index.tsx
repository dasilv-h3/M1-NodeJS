import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Masculinprojunior from "../pages/Masculinprojunior";
import Masculinprosenior from "../pages/Masculinprosenior";
// import Femininprojunior from "../pages/Femininprojunior";
// import Femininprosenior from "../pages/Femininprosenior";
// import Actualite from "../pages/Actualite";
// import Contact from "../pages/Contact";
// import Administration from "../pages/Administration";
import Connexion from "../pages/Connexion";
import Inscription from "../pages/Inscription";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,

        // errorElement: <NotFoundPage />,
    },
    {
        path: "/smj",
        element: <Masculinprojunior />,
    },
    {
        path: "/sms",
        element: <Masculinprosenior />,
    },
    // {
    //     path: "/sfj",
    //     element: <Femininprojunior />,
    // },
    // {
    //     path: "/sfs",
    //     element: <Femininprosenior />,
    // },
    // {
    //     path: "/actualite",
    //     element: <Actualite />,
    // },
    // {
    //     path: "/contact",
    //     element: <Contact />,
    // },
    // {
    //     path: "/administration",
    //     element: <Administration />,
    // },
    {
        path: "/connexion",
        element: <Connexion />,
    },
    {
        path: "/inscription",
        element: <Inscription />,
    },
])

export default router;