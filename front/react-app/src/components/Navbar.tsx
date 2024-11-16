import { useState } from "react";
import logo from "../assets/img/logo3.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuMobile from "./MenuMobile";
import MenuDesktop from "./MenuDesktop";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const [burgerIsOpen, setBurgerIsOpen] = useState(false);
    const {user} = useAuth();
    const toggleMenu = () => {
        setBurgerIsOpen(!burgerIsOpen);
    };

    return (
        <nav className="w-full h-24 flex justify-between items-center bg-blue-950 md:px-6 text-white">
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
            
            {user == null && <div className="hidden items-center justify-end md:flex">
                <a href="/connexion">Se connecter</a>&nbsp;
                <p> / </p>&nbsp;
                <a href="/inscription"> S'inscrire</a>&nbsp;
                <UserCircleIcon className="h-5"/>
            </div>}
            {user != null && <div className="hidden items-center justify-end md:flex">
                <p className="mr-2">{user.first_name} {user.last_name}</p>
                <UserCircleIcon className="h-5"/>
            </div>}
        </nav>
    );
}

export default Navbar;