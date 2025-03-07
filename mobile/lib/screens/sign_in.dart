import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class SignInScreen extends StatefulWidget {
  const SignInScreen({super.key});

  @override
  _SignInScreenState createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  // Contrôleurs pour capturer les entrées utilisateur
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController = TextEditingController();

  // Clé globale pour valider le formulaire
  final _formKey = GlobalKey<FormState>();

  Future<void> _submitForm() async {
    if (_formKey.currentState!.validate()) {
      final firstName = _firstNameController.text.trim();
      final lastName = _lastNameController.text.trim();
      final email = _emailController.text.trim();
      final password = _passwordController.text.trim();
      final confirmPassword = _confirmPasswordController.text.trim();

      if (password == confirmPassword){
        final response = await http.post(
          Uri.parse('http://localhost:3000/api/users/signUp'),
          headers: {'Content-Type': 'application/json'},
          body: json.encode({
            'first_name': firstName,
            'last_name': lastName,
            'email': email,
            'password': password,
          }),
        );

        if (response.statusCode == 201) {
          // Récupérer les données de la réponse
          final data = json.decode(response.body);

          // Afficher un message de succès
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Inscription réussie !')),
          );

          // Redirection vers la page de connexion
          Navigator.pushReplacementNamed(context, '/login');
        } else {
          // Afficher un message d'erreur si l'inscription échoue
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Erreur lors de l\'inscription')),
          );
          return;
        }
      } else {
        // Afficher une erreur si les mots de passe ne correspondent pas
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Les mots de passe ne correspondent pas')),
        );
      }

      // Réinitialiser les champs après soumission
      _firstNameController.clear();
      _lastNameController.clear();
      _emailController.clear();
      _passwordController.clear();
      _confirmPasswordController.clear();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Inscription'),
        centerTitle: true,
        backgroundColor: Colors.blueAccent,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Text(
                'Créer un compte',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Colors.blueAccent,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 30),

              // Champ pour le prénom
              TextFormField(
                controller: _firstNameController,
                decoration: InputDecoration(
                  labelText: 'Prénom',
                  hintText: 'Entrez votre prénom',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.person),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer votre prénom';
                  }
                  return null;
                },
              ),
              SizedBox(height: 20),

              // Champ pour le nom
              TextFormField(
                controller: _lastNameController,
                decoration: InputDecoration(
                  labelText: 'Nom',
                  hintText: 'Entrez votre nom',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.person),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer votre nom';
                  }
                  return null;
                },
              ),
              SizedBox(height: 20),

              // Champ pour l'email
              TextFormField(
                controller: _emailController,
                decoration: InputDecoration(
                  labelText: 'Email',
                  hintText: 'Entrez votre email',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.email),
                ),
                keyboardType: TextInputType.emailAddress,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer un email';
                  }
                  if (!RegExp(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$").hasMatch(value)) {
                    return 'Veuillez entrer un email valide';
                  }
                  return null;
                },
              ),
              SizedBox(height: 20),

              // Champ pour le mot de passe
              TextFormField(
                controller: _passwordController,
                decoration: InputDecoration(
                  labelText: 'Mot de passe',
                  hintText: 'Entrez votre mot de passe',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.lock),
                ),
                obscureText: true,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer un mot de passe';
                  }
                  if (value.length < 6) {
                    return 'Le mot de passe doit comporter au moins 6 caractères';
                  }
                  return null;
                },
              ),
              SizedBox(height: 20),

              // Champ pour la confirmation du mot de passe
              TextFormField(
                controller: _confirmPasswordController,
                decoration: InputDecoration(
                  labelText: 'Confirmer le mot de passe',
                  hintText: 'Confirmez votre mot de passe',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.lock),
                ),
                obscureText: true,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez confirmer votre mot de passe';
                  }
                  if (value != _passwordController.text) {
                    return 'Les mots de passe ne correspondent pas';
                  }
                  return null;
                },
              ),
              SizedBox(height: 20),

              // Bouton d'inscription
              ElevatedButton(
                onPressed: _submitForm,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blueAccent,
                  padding: EdgeInsets.symmetric(vertical: 15),
                  textStyle: TextStyle(fontSize: 16),
                ),
                child: Text('S\'inscrire'),
              ),
              SizedBox(height: 10),

              // Lien vers la connexion
              TextButton(
                onPressed: () {
                  Navigator.pushReplacementNamed(context, '/login');
                },
                child: Text(
                  'Déjà un compte ? Se connecter',
                  style: TextStyle(color: Colors.blueAccent),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
