import 'package:fluterproject/widgets/custom_drawer.dart';
import 'package:fluterproject/widgets/navbar.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AccueilScreen extends StatefulWidget {
  const AccueilScreen({super.key});

  @override
  _AccueilScreenState createState() => _AccueilScreenState();
}

class _AccueilScreenState extends State<AccueilScreen> {
  @override
  void initState() {
    super.initState();
    displaydatas(); // Appelle la fonction lors du démarrage
  }

  Future<void> displaydatas() async {
    final prefs = await SharedPreferences.getInstance(); // ✅ Correction
    final token = prefs.getString('token'); // ✅ Correction

    if (token != null) {
      print('Token récupéré : $token');
    } else {
      print('Aucun token trouvé');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: Navbar(),
      drawer: CustomDrawer(),
      body: Center(
        child: Text(
          'Bienvenue sur notre site !\nChoisissez une option dans le menu.',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}
