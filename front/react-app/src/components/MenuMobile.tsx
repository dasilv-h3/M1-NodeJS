import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const MenuMobile = () => {
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
        <ul className="bg-white text-black p-3 left-0 top-24 w-full absolute md:flex items-center gap-10 flex-1 justify-center">
                <li  onClick={toggleSubMenuMan}>
                    <p className="gap-2">Masculin Pro <ChevronDownIcon className="h-4" /></p></li>
                {subMenuMan ?
                    <div>
                    <p>section masculine junior</p>
                    <p>section masculine senior</p>
                    </div>
                    : null}
                <li onClick={toggleSubMenuWoman}>Féminin Pro</li>
                {subMenuWoman ?
                    <div>
                    <p>section masculine junior</p>
                    <p>section masculine senior</p>
                    </div>
                    : null}
                <li>Actualités</li>
                <li>Contact</li>
                <li>Administration</li>
            </ul>
    )
}

export default MenuMobile