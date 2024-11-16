import React, { useEffect, useState } from "react";
import axios from "../../../services/Axios";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    active: boolean;
}

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/users");
            setUsers(response.data);
            console.log(users);
            
        } catch (error) {
            setError("Erreur lors de la récupération des utilisateurs.");
        } finally {
            setLoading(false);
        }
    };

    const toggleUserStatus = async (userId: number, active: boolean) => {
        setLoading(true);
        try {
            await axios.put(`/users/${userId}`, { active: !active });
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === userId ? { ...user, active: !active } : user
                    )
            );
        } catch (error) {
            setError("Erreur lors de la mise à jour du statut de l'utilisateur.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {loading ? (
                <p>Chargement...</p>
            ) : (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                        <th className="py-2">Nom</th>
                        <th className="py-2">Email</th>
                        <th className="py-2">Statut</th>
                        <th className="py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="text-center border-b">
                                <td className="py-2">{`${user.first_name} ${user.last_name}`}</td>
                                <td className="py-2">{user.email}</td>
                                <td className="py-2">
                                    {user.active ? "Activé" : "Désactivé"}
                                </td>
                                <td className="py-2">
                                    <button
                                        onClick={() => toggleUserStatus(user.id, user.active)}
                                        className={`px-4 py-2 rounded ${
                                        user.active
                                            ? "bg-red-500 text-white hover:bg-red-600"
                                            : "bg-green-500 text-white hover:bg-green-600"
                                        }`}
                                    >
                                        {user.active ? "Désactiver" : "Activer"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserManagement;