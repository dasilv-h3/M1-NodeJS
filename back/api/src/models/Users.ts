type Users = {
    id: number,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    role_id: number,
    created_at: Date,
    active: boolean,
    permission: number 
};

export default Users;