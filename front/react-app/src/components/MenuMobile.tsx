import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const MenuMobile = () => {
    const [subMenuMan, setSubMenuMan] = useState(false);
    const [subMenuWoman, setSubMenuWoman] = useState(false);
    const {user} = useAuth();

    const toggleSubMenuMan = () => {
        setSubMenuWoman(false);
        setSubMenuMan(!subMenuMan);
    }

    const toggleSubMenuWoman = () => {
        setSubMenuMan(false);
        setSubMenuWoman(!subMenuWoman);
    }
    return (
        <ul className="bg-white text-black p-3 left-0 top-24 w-full absolute md:flex items-center gap-10 flex-1 justify-center">
                <li  onClick={toggleSubMenuMan}>
                    <p className="gap-2">Masculin Pro <ChevronDownIcon className="h-4" /></p></li>
                {subMenuMan ?
                    <div>
                    <li>
                        <a href="/smj">section masculine junior</a>
                    </li>
                    <li>
                        <a href="/sms">section masculine senior</a>
                    </li>
                    </div>
                    : null}
                <li onClick={toggleSubMenuWoman}>Féminin Pro</li>
                {subMenuWoman ?
                    <div>
                     <a href="/sfj">
                        <li>section féminine junior</li>
                    </a>
                    <a href="/sfs">
                        <li>section féminine senior</li>
                    </a>
                    </div>
                    : null}
                  <a href="/actualite">
                <li>Actualités</li>
                </a>
                <a href="/contact">
                <li>Contact</li>
                </a>
                {(user !== null && (user.role=='admin' || user.role=='editor') ) && <a href="/admin">
                    <li>Administration</li>
                </a>}
            </ul>
    )
}

export default MenuMobile