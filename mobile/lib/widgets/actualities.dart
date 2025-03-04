import 'package:flutter/material.dart';
import 'ajout_actualities.dart'; // Assure-toi que l'importation est correcte

class ActualitiesScreen extends StatefulWidget {
  @override
  _ActualitiesScreenState createState() => _ActualitiesScreenState();
}

class _ActualitiesScreenState extends State<ActualitiesScreen> {
  // Liste des actualités ajoutées
  List<Map<String, String>> _newsList = [];

  // Fonction pour ajouter une actualité à la liste
  void _addNews(String title, String description) {
    setState(() {
      _newsList.add({
        'title': title,
        'description': description,
        'date': DateTime.now().toString(),
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Actualités'),
        actions: [
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () {
              // Navigation vers l'écran d'ajout d'actualité
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder:
                      (context) =>
                          AjoutActualitiesScreen(onNewsAdded: _addNews),
                ),
              );
            },
          ),
        ],
      ),
      body:
          _newsList.isEmpty
              ? Center(child: Text('Aucune actualité ajoutée'))
              : ListView.builder(
                itemCount: _newsList.length,
                itemBuilder: (context, index) {
                  final newsItem = _newsList[index];
                  return Card(
                    margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                    child: ListTile(
                      title: Text(newsItem['title']!),
                      subtitle: Text(
                        '${newsItem['description']}\n${newsItem['date']}',
                      ),
                      isThreeLine: true,
                    ),
                  );
                },
              ),
    );
  }
}
