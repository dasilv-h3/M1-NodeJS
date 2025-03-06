import 'package:fluterproject/model/matches.dart';
import 'package:fluterproject/widgets/custom_drawer.dart';
import 'package:fluterproject/widgets/navbar.dart';
import 'package:intl/intl.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class SectionFeminineJuniorScreen extends StatefulWidget {
  const SectionFeminineJuniorScreen({super.key});

  @override
  _SectionFeminineJuniorScreenState createState() => _SectionFeminineJuniorScreenState();
}

class _SectionFeminineJuniorScreenState extends State<SectionFeminineJuniorScreen> {
  List<Map<String, dynamic>>? matches; // Liste de maps (objets JSON)

  @override
  void initState() {
    super.initState();
    fetchData(); // Appeler l'API au démarrage de l'écran
  }

 Future<List<Matches>> fetchData() async {
  final response = await http.get(Uri.parse('http://localhost:3000/api/matches/femininjunior'));

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
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Center(
            child: FutureBuilder(future: fetchData(), builder: (context, snapshot) {
              if(snapshot.hasData){
                  List<Matches> matches = snapshot.requireData;
          
                  return ListView.builder(shrinkWrap: true, itemCount: matches.length, itemBuilder: (context, index) {
                    return Text('FrontKick FC ${matches[index].score!} ${matches[index].team_name!} ${matches[index].date! } ', textAlign: TextAlign.center,);
                  },);
              } else {
                return CircularProgressIndicator();
              }
              
              // List<Matches> matches = snapshot
            },),
          // child: matches == null
          //     ? CircularProgressIndicator() // Loader en attendant les données
          //     : Column(
          //         mainAxisAlignment: MainAxisAlignment.center,
          //         children: matches == null
          //         ? [CircularProgressIndicator()] // Loader en attendant les données
          //         : matches!.isEmpty
          //             ? [Text("Aucun match disponible", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold))]
          //             : matches!.map<Widget>((match) {
          //                 return Text(
          //                   "${match['team_name']} - Score : ${match['score']}", // Affichage clair
          //                   style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          //                 );
          //               }).toList(),
          //       ),
              ),
        ],
      ),
    );
  }
}
