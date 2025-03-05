import 'package:flutter/material.dart';

class CustomDrawer extends StatelessWidget {
  const CustomDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          // Header du Drawer
          DrawerHeader(
            decoration: BoxDecoration(color: Colors.blueAccent),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(Icons.sports, color: Colors.white, size: 60),
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
            leading: Icon(
              Icons.people,
              color: Colors.blue,
            ), // Icône pour la section Masculine
            title: Text(
              'Section Masculine',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            children: [
              // Sous-menu Junior sans icône
              _buildListTile(
                context,
                text: 'Junior',
                route: '/section_masculine_junior',
                color: Colors.blue,
                icon: Icons.circle, // Icône vide (pas d'icône visible)
              ),
              // Sous-menu Senior sans icône
              _buildListTile(
                context,
                text: 'Senior',
                route: '/section_masculine_senior',
                color: Colors.blue,
                icon: Icons.circle, // Icône vide (pas d'icône visible)
              ),
            ],
          ),
          // Section Féminine
          ExpansionTile(
            leading: Icon(
              Icons.people,
              color: Colors.pink,
            ), // Icône pour la section Féminine
            title: Text(
              'Section Féminine',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            children: [
              // Sous-menu Junior sans icône
              _buildListTile(
                context,
                text: 'Junior',
                route: '/section_feminine_junior',
                color: Colors.pink,
                icon: Icons.circle, // Icône vide (pas d'icône visible)
              ),
              // Sous-menu Senior sans icône
              _buildListTile(
                context,
                text: 'Senior',
                route: '/section_feminine_senior',
                color: Colors.pink,
                icon: Icons.circle, // Icône vide (pas d'icône visible)
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
          // Changement ici pour "Favoris" avec un icône de cœur rouge
          _buildListTile(
            context,
            text: 'Favoris',
            route: '/favoris',
            color: Colors.red,
            icon: Icons.favorite, // Icône de cœur
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
    );
  }

  Widget _buildListTile(
    BuildContext context, {
    required String text,
    required String route,
    required Color color,
    required IconData icon,
  }) {
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
