import 'package:fluterproject/screens/accueil.dart';
import 'package:flutter/material.dart';
import 'routes/router.dart'; // Assure-toi que le chemin du fichier AppRouter est correct.

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sportive App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      onGenerateRoute: AppRouter.generateRoute, // Utilisation du AppRouter pour la navigation
      initialRoute: '/', // Définir la route initiale (ici, la page d'accueil)
      debugShowCheckedModeBanner: false, // Désactiver le bandeau de debug (optionnel)
      home: AccueilScreen(),
    );
  }
}
