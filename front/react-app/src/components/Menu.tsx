import { useState } from 'react';
const Menu = () => {
    const [menu] = useState({
        'home': 'accueil',
        'smj': 'section masculine junior',
        'sms': 'section masculine senior',
        'sfj': 'section féminine junior',
        'sfs': 'section féminine senior',
        'actualites': 'actualités',
        'login': 'connexion',
        'cdc': 'création de compte', 
        'contact': 'contact',
        'administration': 'administration'
    });
    return(
    
        <nav>
            <ul>
            {Object.entries(menu).map(([key, value]) => (
                <li key={key}>
                    <a href={`/${key}`}>{value}</a>
                </li>
            ))}
            </ul>
        </nav>
        
    )
}

export default Menu;