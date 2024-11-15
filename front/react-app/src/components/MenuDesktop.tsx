import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";

const MenuDesktop = () => {
    const [subMenuMan, setSubMenuMan] = useState(false);
    const [subMenuWoman, setSubMenuWoman] = useState(false);

    const toggleSubMenuMan = () => {
        setSubMenuWoman(false);
        setSubMenuMan(!subMenuMan);
    }

    const toggleSubMenuWoman = () => {
        setSubMenuMan(false);
        setSubMenuWoman(!subMenuWoman);
    }
    return (
        <ul className="hidden md:flex items-center gap-3 flex-1 justify-center">
                <div onClick={toggleSubMenuMan} className="relative hover:cursor-pointer">
                    <p className="flex items-center gap-2">Masculin Pro <ChevronDownIcon className="h-4" /></p>
                    {subMenuMan ?
                        <div className="absolute bg-white text-black p-2 top-10 w-[200px]">
                        <li>
                        <a href="/smj">section masculine junior</a>
                        </li>
                        <li>
                        <a href="/sms">section masculine senior</a>
                        </li>
                        </div>
                        : null}
                </div>
                <div onClick={toggleSubMenuWoman} className="relative hover:cursor-pointer">
                    <p className="flex items-center gap-2">Féminin Pro <ChevronDownIcon className="h-4" /></p>
                    {subMenuWoman ?
                        <div className="absolute bg-white text-black p-2 top-10 w-[200px]">
                        <a href="/sfj">
                            <li>section féminine junior</li>
                        </a>
                        <a href="/sfs">
                            <li>section féminine senior</li>
                        </a>
                        </div>
                        : null}
                </div>
                <a href="/actualite">
                <li>Actualités</li>
                </a>
                <a href="/contact">
                <li>Contact</li>
                </a>
                <a href="/administration">
                <li>Administration</li>
                </a>
            </ul>
    )
}

export default MenuDesktop