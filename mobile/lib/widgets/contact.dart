<<<<<<< HEAD
=======

>>>>>>> 36abf6e5a4029c5348da30b3320cb3be24ffa0ef
import 'package:flutter/material.dart';

class ContactScreen extends StatefulWidget {
  @override
  _ContactScreenState createState() => _ContactScreenState();
}

class _ContactScreenState extends State<ContactScreen> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _messageController = TextEditingController();

  void _submitForm() {
    final name = _nameController.text;
    final email = _emailController.text;
    final message = _messageController.text;

    if (name.isNotEmpty && email.isNotEmpty && message.isNotEmpty) {
      // Implémenter la logique de soumission du formulaire ici (par exemple, envoyer à un backend)
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Formulaire soumis !')));
      // Réinitialiser les champs après soumission
      _nameController.clear();
      _emailController.clear();
      _messageController.clear();
    } else {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Veuillez remplir tous les champs')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Contactez-nous')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Nom', style: TextStyle(fontSize: 18)),
            TextField(
              controller: _nameController,
              decoration: InputDecoration(hintText: 'Entrez votre nom'),
            ),
            SizedBox(height: 16),
            Text('Email', style: TextStyle(fontSize: 18)),
            TextField(
              controller: _emailController,
              decoration: InputDecoration(hintText: 'Entrez votre email'),
              keyboardType: TextInputType.emailAddress,
            ),
            SizedBox(height: 16),
            Text('Message', style: TextStyle(fontSize: 18)),
            TextField(
              controller: _messageController,
              decoration: InputDecoration(hintText: 'Entrez votre message'),
              maxLines: 5,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _submitForm,
              child: Text('Envoyer'),
            ),
          ],
        ),
      ),
    );
  }
}
