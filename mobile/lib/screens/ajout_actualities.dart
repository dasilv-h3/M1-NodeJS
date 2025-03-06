import 'package:fluterproject/widgets/custom_drawer.dart';
import 'package:fluterproject/widgets/navbar.dart';
import 'package:flutter/material.dart';

class AjoutActualitiesScreen extends StatefulWidget {
  final Function(String, String) onNewsAdded;

  AjoutActualitiesScreen({required this.onNewsAdded});

  @override
  _AjoutActualitiesScreenState createState() => _AjoutActualitiesScreenState();
}

class _AjoutActualitiesScreenState extends State<AjoutActualitiesScreen> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: Navbar(),
      drawer: CustomDrawer(),
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
                final title = _titleController.text;
                final description = _descriptionController.text;

                if (title.isNotEmpty && description.isNotEmpty) {
                  // Envoie les données à l'écran de liste via la fonction callback
                  widget.onNewsAdded(title, description);

                  // Affiche un message de succès
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Actualité ajoutée avec succès !')),
                  );

                  // Retour à l'écran précédent après l'ajout
                  Navigator.pop(context);
                } else {
                  // Affiche un message d'erreur si les champs sont vides
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
