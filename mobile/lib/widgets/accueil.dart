import 'package:flutter/material.dart';
import '../widgets/accueil.dart';
import '../widgets/actualities.dart';
import '../widgets/masculine_junior.dart';
import '../widgets/masculine_senior.dart';
import '../widgets/feminine_junior.dart';
import '../widgets/feminine_senior.dart';
import '../widgets/login.dart';
import '../widgets/ajout_actualities.dart';
import '../widgets/user_pref.dart';
import '../widgets/contact.dart'; // Assurez-vous que le chemin est correct pour l'import

class AccueilScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blueAccent,
        title: Text('Bienvenue sur l\'Application Sportive'),
        centerTitle: true,
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            // Header du Drawer
            DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blueAccent,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Icon(
                    Icons.sports,
                    color: Colors.white,
                    size: 60,
                  ),
                  SizedBox(height: 10),
                  Text(
                    'Application Sportive',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
            // Liste des options du menu
            _buildListTile(
              context,
              text: 'Voir les actualités',
              route: '/news',
              color: Colors.green,
              icon: Icons.article,
            ),
            // Section Masculine
            ExpansionTile(
              leading: Icon(Icons.people, color: Colors.blue),
              title: Text('Section Masculine', style: TextStyle(fontWeight: FontWeight.bold)),
              children: [
                _buildListTile(
                  context,
                  text: 'Junior',
                  route: '/section_masculine_junior',
                  color: Colors.blue,
                  icon: Icons.people,
                ),
                _buildListTile(
                  context,
                  text: 'Senior',
                  route: '/section_masculine_senior',
                  color: Colors.blue,
                  icon: Icons.people,
                ),
              ],
            ),
            // Section Féminine
            ExpansionTile(
              leading: Icon(Icons.people, color: Colors.pink),
              title: Text('Section Féminine', style: TextStyle(fontWeight: FontWeight.bold)),
              children: [
                _buildListTile(
                  context,
                  text: 'Junior',
                  route: '/section_feminine_junior',
                  color: Colors.pink,
                  icon: Icons.people,
                ),
                _buildListTile(
                  context,
                  text: 'Senior',
                  route: '/section_feminine_senior',
                  color: Colors.pink,
                  icon: Icons.people,
                ),
              ],
            ),
            _buildListTile(
              context,
              text: 'Se connecter',
              route: '/login',
              color: Colors.orange,
              icon: Icons.login,
            ),
            _buildListTile(
              context,
              text: 'Ajouter une actualité',
              route: '/add_news',
              color: Colors.purple,
              icon: Icons.add_circle,
            ),
            _buildListTile(
              context,
              text: 'Préférences utilisateur',
              route: '/user_preferences',
              color: Colors.teal,
              icon: Icons.settings,
            ),
            _buildListTile(
              context,
              text: 'Contactez-nous',
              route: '/contact',
              color: Colors.red,
              icon: Icons.contact_mail,
            ),
          ],
        ),
      ),
      body: Center(
        child: Text(
          'Bienvenue sur notre site !\nChoisissez une option dans le menu.',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }

  // Fonction pour créer des éléments de menu avec des icônes et des couleurs personnalisées
  Widget _buildListTile(BuildContext context, {required String text, required String route, required Color color, required IconData icon}) {
    return ListTile(
      onTap: () {
        Navigator.pushNamed(context, route);
      },
      leading: Icon(icon, color: color, size: 30),
      title: Text(
        text,
        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
      ),
    );
  }
}
