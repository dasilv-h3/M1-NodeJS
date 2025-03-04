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
            DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue[900],
              ),
              child: const Text(
                'Menu',
                style: TextStyle(color: Colors.white, fontSize: 24),
              ),
            ),
            ListTile(
              title: const Text('Accueil'),
              onTap: () {},
            ),
            ListTile(
              title: const Text('Se connecter'),
              onTap: () {},
            ),
            ListTile(
              title: const Text("S'inscrire"),
              onTap: () {},
            ),
          ],
        ),
      ),
      body: const Center(
        child: Text('Contenu principal ici'),
      ),
    );
  }
}
