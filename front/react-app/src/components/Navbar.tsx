import { useState } from "react";
import logo from "../assets/logo3.png";
const Navbar = () => {

    const [menu] = useState({
        'smj':'Masculin Pro',
        'sfj':'Feminin Pro',
        'actualites': 'Actualités',
        'contact': 'Contact',
        'administration': 'Administration'
    });

    const [submenu1] = useState( {
        'smj': 'Section masculine junior',
        'sms': 'Section masculine senior',
    });
    const [submenu2] = useState({
        'sfj': 'Section féminine junior',
        'sfs': 'Section féminine senior',
    });

    const hasSubmenu = (key: string) => {
        return key === 'smj' || key === 'sfj';
    };

    // Fonction pour récupérer le sous-menu correspondant
    const getSubmenu = (key: string) => {
        if (key === 'smj') return submenu1;
        if (key === 'sfj') return submenu2;
        return null;
    };



    return (
        <div className="navbar bg-blue-950 h-24">
            <div className="container-logo">
                <a href="/"><img className="logo" src={logo} alt="Logo" /></a>
            </div>
            <div className="container-menu">
                <ul className="menu">
                    {Object.entries(menu).map(([key, value]) => (
                        <li key={key} className="menu-item">
                            <a href={`/${key}`} className="menu-link">
                                {value}
                                {hasSubmenu(key) && <span className="arrow">▼</span>}
                            </a>
                            {hasSubmenu(key) && getSubmenu(key) && (
                                <ul className="submenu">
                                    {Object.entries(getSubmenu(key) || {}).map(([subKey, subValue]) => (
                                        <li key={subKey}>
                                            <a href={`/${subKey}`} className="submenu-link">{subValue}</a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div>

            </div>
        </div>
    );
}

export default Navbar;