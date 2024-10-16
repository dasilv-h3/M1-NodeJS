type Users = {
    id: number,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    role: 'admin' | 'editor',
    created_at: Date,
    active: boolean 
};

export default Users;