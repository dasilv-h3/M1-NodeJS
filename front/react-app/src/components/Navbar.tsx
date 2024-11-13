import { useState } from "react";
import logo from "../assets/logo3.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuMobile from "./MenuMobile";
import MenuDesktop from "./MenuDesktop";

const Navbar = () => {
    const [burgerIsOpen, setBurgerIsOpen] = useState(false);

    const toggleMenu = () => {
        setBurgerIsOpen(!burgerIsOpen);
    };
    // const [menu] = useState({
    //     'smj':'Masculin Pro',
    //     'sfj':'Féminin Pro',
    //     'actualites': 'Actualités',
    //     'contact': 'Contact',
    //     'administration': 'Administration'
    // });

    // const [submenu1] = useState( {
    //     'smj': 'section masculine junior',
    //     'sms': 'section masculine senior',
    // });
    
    // const [submenu2] = useState({
    //     'sfj': 'section féminine junior',
    //     'sfs': 'section féminine senior',
    // });

    // const hasSubmenu = (key: string) => {
    //     return key === 'smj' || key === 'sfj';
    // };

    // //Fonction pour récupérer le sous-menu correspondant
    // const getSubmenu = (key: string) => {
    //     if (key === 'smj') return submenu1;
    //     if (key === 'sfj') return submenu2;
    //     return null;
    // };

    return (
        <nav className="w-screen h-24 flex justify-between items-center bg-blue-950 md:px-6 text-white">
            <div className="flex-1 flex justify-center md:flex-none">
                <a href="/">
                    <img className="logo" src={logo} alt="Logo" />
                </a>
            </div>
            {burgerIsOpen ? <MenuMobile /> : null}
            <MenuDesktop />
            <div onClick={toggleMenu} className="md:hidden">
                {burgerIsOpen ? <XMarkIcon className="text-blue-500 h-10 w-10 right-5 absolute top-6 md:hidden"/>: <Bars3Icon className="text-blue-500 h-10 w-10 absolute top-6 right-5 md:hidden" />}
            </div>
            
            <div className="hidden items-center justify-end md:flex">
                <a href="">Se connecter</a>
                <p> / </p>
                <a href=""> S'inscrire</a>
            </div>
        </nav>
        // <nav className="w-screen h-24 flex justify-center items-center bg-blue-950 sm:justify-between sm:px-5">
        //     <div className="px-5">
        //         <a href="/" className="flex-1 justify-center">
        //             <img className="logo" src={logo} alt="Logo" />
        //         </a>
        //         <Bars3Icon className="size-6 text-blue-500"/>

        //     </div>
        //     <ul className="hidden sm:flex items-center gap-10">
        //         <li>Test 1</li>
        //         <li>Test 2</li>
        //         <li>Test 3</li>
        //         <li>Test 4</li>
        //         <li>Test 5</li>
        //     </ul>
        //     {/* <div className="hidden xl:flex container-menu"> */}
        //         {/* <ul className="menu">
        //             <li>Test</li>
        //             <li>Test</li> */}
        //             {/* <li>Test</li> */}
        //             {/* {Object.entries(menu).map(([key, value]) => (
        //                 <li key={key} className="menu-item">
        //                     <a href={`/${key}`} className="menu-link">
        //                         {value}
        //                         {hasSubmenu(key) && <span className="arrow">▼</span>}
        //                     </a>
        //                     {hasSubmenu(key) && getSubmenu(key) && (
        //                         <ul className="submenu">
        //                             {Object.entries(getSubmenu(key) || {}).map(([subKey, subValue]) => (
        //                                 <li key={subKey}>
        //                                     <a href={`/${subKey}`} className="submenu-link">{subValue}</a>
        //                                 </li>
        //                             ))}
        //                         </ul>
        //                     )}
        //                 </li>
        //             ))} */}
        //         {/* </ul> */}
        //     {/* </div> */}
        //     <div className="hidden sm:flex sm:justify-center items-center">
        //         <a href="">Se connecter</a>
        //         <p> / </p>
        //         <a href=""> S'inscrire</a>
        //     </div>
        // </nav>
    );
}

export default Navbar;