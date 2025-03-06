import 'package:fluterproject/model/matches.dart';
import 'package:fluterproject/widgets/custom_drawer.dart';
import 'package:fluterproject/widgets/navbar.dart';
import 'package:intl/intl.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class SectionFeminineSeniorScreen extends StatefulWidget {
  const SectionFeminineSeniorScreen({super.key});

  @override
  _SectionFeminineSeniorScreenState createState() => _SectionFeminineSeniorScreenState();
}

class _SectionFeminineSeniorScreenState extends State<SectionFeminineSeniorScreen> {
  List<Map<String, dynamic>>? matches; // Liste de maps (objets JSON)

  @override
  void initState() {
    super.initState();
    fetchData(); // Appeler l'API au démarrage de l'écran
  }

 Future<List<Matches>> fetchData() async {
  final response = await http.get(Uri.parse('http://localhost:3000/api/matches/femininsenior'));

  // print('Réponse API : ${response.body}'); // Vérifie les données dans la console

  if (response.statusCode == 200) {
    List data = json.decode(response.body);
    // return data.
   return data.map((e) {
      String formattedDate = DateFormat('dd/MM/yyyy').format(DateTime.parse(e['date']));

      Matches matches = Matches(
        score: e['score'], 
        team_name: e['team_name'], 
        section_name: e['section_name'], 
        date: formattedDate, // Date formatée
      );

      return matches;
    }).toList();


    // setState(() {
    //   matches = data; 
    // });
  } else {
    // setState(() {
    //   matches = [];
    // });
    throw Error();
  }
}


      @override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: Navbar(),
    drawer: CustomDrawer(),
    body: Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start, // Aligner le titre à gauche
        children: [
          // Titre avec effet de gradient et bordure (Hors du Center)
          ShaderMask(
            shaderCallback: (bounds) => LinearGradient(
              colors: [Colors.blue.shade500, Colors.green.shade500],
            ).createShader(bounds),
            child: Text(
              '🏆 Féminine Séniors',
              style: TextStyle(
                fontSize: 24, // Équivalent à text-3xl
                fontWeight: FontWeight.w800, // Équivalent à font-extrabold
                color: Colors.white, // Nécessaire pour que le ShaderMask fonctionne
              ),
            ),
          ),
          Container(
            margin: EdgeInsets.only(top: 4, bottom: 16),
            width: double.infinity,
            height: 4,
            color: Colors.blue.shade500, // Bordure inférieure
          ),

          // FutureBuilder centré
          Expanded(
            child: Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Titre avec effet de gradient
                  ShaderMask(
                    shaderCallback: (bounds) => LinearGradient(
                      colors: [Colors.blue.shade500, Colors.green.shade500],
                    ).createShader(bounds),
                    child: Text(
                      '🏆 Matches Passés',
                      style: TextStyle(
                        fontSize: 24, // Équivalent à text-3xl
                        fontWeight: FontWeight.w800, // Équivalent à font-extrabold
                        color: Colors.white, // Nécessaire pour que le ShaderMask fonctionne
                      ),
                    ),
                  ),

                  SizedBox(height: 16), // Espacement entre le titre et la liste des matchs

                  // FutureBuilder
                  FutureBuilder(
                    future: fetchData(),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return CircularProgressIndicator();
                      } else if (snapshot.hasError) {
                        return Text(
                          'Erreur lors du chargement des matchs',
                          style: TextStyle(color: Colors.red, fontSize: 16),
                        );
                      } else if (!snapshot.hasData || (snapshot.data as List).isEmpty) {
                        return Text(
                          'Aucun match trouvé',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                        );
                      } else {
                        List<Matches> matches = snapshot.requireData;

                        return ListView.builder(
                          shrinkWrap: true,
                          itemCount: matches.length,
                          itemBuilder: (context, index) {
                            return Card(
                              elevation: 4, // Effet d'ombre pour un rendu plus esthétique
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Padding(
                                padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                                child: Column(
                                  children: [
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Expanded(
                                          child: Text(
                                            'FrontKick FC',
                                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                                            overflow: TextOverflow.ellipsis,
                                            softWrap: true,
                                          ),
                                        ),
                                        Image.asset(
                                          'assets/img/versus.png',
                                          height: 30,
                                        ),
                                        Expanded(
                                          child: Text(
                                            matches[index].team_name ?? 'Équipe inconnue',
                                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                                            textAlign: TextAlign.center,
                                            overflow: TextOverflow.ellipsis,
                                            softWrap: true,
                                          ),
                                        ),
                                        Expanded(
                                          child: Text(
                                            matches[index].date ?? 'Date inconnue',
                                            style: TextStyle(color: Colors.grey),
                                            textAlign: TextAlign.right,
                                            overflow: TextOverflow.ellipsis,
                                            softWrap: true,
                                          ),
                                        ),
                                      ],
                                    ),

                                    // Score sous l'image "versus.png"
                                    SizedBox(height: 8), // Espacement
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        Text(
                                          matches[index].score ?? 'Score inconnu',
                                          style: TextStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.blue.shade500,
                                          ),
                                          textAlign: TextAlign.center,
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        );
                      }
                    },
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    ),
  );
}
}
