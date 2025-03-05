import 'package:fluterproject/widgets/custom_drawer.dart';
import 'package:fluterproject/widgets/navbar.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class SectionMasculineJuniorScreen extends StatefulWidget {
  const SectionMasculineJuniorScreen({super.key});

  @override
  _SectionMasculineJuniorScreenState createState() => _SectionMasculineJuniorScreenState();
}

class _SectionMasculineJuniorScreenState extends State<SectionMasculineJuniorScreen> {
  List<Map<String, dynamic>>? matches; // Liste de maps (objets JSON)

  @override
  void initState() {
    super.initState();
    fetchData(); // Appeler l'API au démarrage de l'écran
  }

 Future<void> fetchData() async {
  final response = await http.get(Uri.parse('http://localhost:3000/api/matches/masculinjunior'));

  print('Réponse API : ${response.body}'); // Vérifie les données dans la console

  if (response.statusCode == 200) {
    final data = json.decode(response.body);
    setState(() {
      matches = data; 
    });
  } else {
    setState(() {
      matches = [];
    });
  }
}


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: Navbar(),
      drawer: CustomDrawer(),
      body: Center(
      child: matches == null
          ? CircularProgressIndicator() // Loader en attendant les données
          : Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: matches == null
              ? [CircularProgressIndicator()] // Loader en attendant les données
              : matches!.isEmpty
                  ? [Text("Aucun match disponible", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold))]
                  : matches!.map<Widget>((match) {
                      return Text(
                        "${match['team_name']} - Score : ${match['score']}", // Affichage clair
                        style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                      );
                    }).toList(),
            ),
    ),
    );
  }
}
