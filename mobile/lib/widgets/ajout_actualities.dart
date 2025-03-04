import 'package:flutter/material.dart';

class AddNewsScreen extends StatelessWidget {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Ajouter une Actualité')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Titre de l\'actualité', style: TextStyle(fontSize: 18)),
            TextField(
              controller: _titleController,
              decoration: InputDecoration(hintText: 'Entrez le titre'),
            ),
            SizedBox(height: 16),
            Text('Description', style: TextStyle(fontSize: 18)),
            TextField(
              controller: _descriptionController,
              decoration: InputDecoration(hintText: 'Entrez la description'),
              maxLines: 4,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Logique pour ajouter l'actualité
                // Tu peux ajouter ici une validation et une méthode pour envoyer les données
                final title = _titleController.text;
                final description = _descriptionController.text;

                if (title.isNotEmpty && description.isNotEmpty) {
                  // Logique pour envoyer les données à la base de données ou autre traitement
                  print('Ajout de l\'actualité: $title, $description');
                } else {
                  // Affichage d'un message d'erreur si les champs sont vides
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Veuillez remplir tous les champs')),
                  );
                }
              },
              child: Text('Ajouter l\'actualité'),
            ),
          ],
        ),
      ),
    );
  }
}
