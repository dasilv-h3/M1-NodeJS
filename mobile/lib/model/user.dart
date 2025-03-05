class User {
  int id;
  String email;
  String password;
  String first_name;
  String last_name;
  String token;
  int role_id;
  String created_at;
  int active;
  int permission;
  
 
 User({required this.id, required this.email,required this.token, required this.password, required this.first_name, required this.last_name, required this.role_id, required this.created_at, required this.active, required this.permission}); 

factory User.fromJSON(dynamic data) {
        return User(
            id: data['id'],
            email: data['email'],
            password: data['password'],
            first_name: data['first_name'],
            last_name: data['last_name'],
            role_id: data['role_id'],
            created_at: data['created_at'],
            active: data['active'],
            permission: data['permission'],
            token: data['token']
        );
    }
}
