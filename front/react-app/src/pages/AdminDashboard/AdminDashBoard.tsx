import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const AdminDashboard = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-8">
                <h1 className="text-3xl font-bold text-center mb-8">Espace d'administration</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    
                    <Link to="/admin/edit-club" className="bg-white shadow-md p-6 rounded-lg text-center hover:shadow-lg transition duration-200">
                        <h2 className="text-xl font-semibold mb-4">Modifier la présentation du club</h2>
                        <p className="text-gray-700">Modifiez la présentation du club et son histoire.</p>
                    </Link>
                    
                    <Link to="/admin/manage-news" className="bg-white shadow-md p-6 rounded-lg text-center hover:shadow-lg transition duration-200">
                        <h2 className="text-xl font-semibold mb-4">Gestion des actualités</h2>
                        <p className="text-gray-700">Ajoutez de nouvelles actualités ou modifiez celles existantes.</p>
                    </Link>
                    
                    {/* Gestion des partenaires */}
                    <Link to="/admin/manage-partners" className="bg-white shadow-md p-6 rounded-lg text-center hover:shadow-lg transition duration-200">
                        <h2 className="text-xl font-semibold mb-4">Gestion des partenaires</h2>
                        <p className="text-gray-700">Ajoutez, modifiez ou supprimez des partenaires.</p>
                    </Link>
                    
                    {/* Gestion des matchs */}
                    <Link to="/admin/manage-matches" className="bg-white shadow-md p-6 rounded-lg text-center hover:shadow-lg transition duration-200">
                        <h2 className="text-xl font-semibold mb-4">Gestion des matchs</h2>
                        <p className="text-gray-700">Ajoutez ou modifiez les matchs pour chaque section.</p>
                    </Link>
                    
                    {/* Activation des comptes éditeurs */}
                    <Link to="/admin/activate-accounts" className="bg-white shadow-md p-6 rounded-lg text-center hover:shadow-lg transition duration-200">
                        <h2 className="text-xl font-semibold mb-4">Activation des comptes éditeurs</h2>
                        <p className="text-gray-700">Activez ou gérez les comptes éditeurs.</p>
                    </Link>
                    
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;