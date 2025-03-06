import 'package:flutter/material.dart';

class Navbar extends StatelessWidget {
  const Navbar({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(100), // Hauteur de la navbar
        child: AppBar(
          backgroundColor: Colors.blue[900],
          elevation: 0, // Pour enlever l'ombre de l'AppBar
          automaticallyImplyLeading: false, // Désactive le bouton retour automatique
          leading: Builder(
            builder: (context) => Padding(
              padding: const EdgeInsets.only(top: 20), // Marge en haut de l'icône
              child: IconButton(
                icon: const Icon(Icons.menu),
                iconSize: 35, // Taille de l'icône du menu
                color: Colors.blue, // Couleur de l'icône
                onPressed: () {
                  Scaffold.of(context).openDrawer();
                },
              ),
            ),
          ),
          flexibleSpace: Align(
            alignment: Alignment.center, // Centre l'élément dans l'AppBar
            child: Padding(
              padding: const EdgeInsets.only(top: 30), // Marge en haut de l'image
              child: Image.asset('lib/assets/logo3.png', height: 100),
            ),
          ),
        ),
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