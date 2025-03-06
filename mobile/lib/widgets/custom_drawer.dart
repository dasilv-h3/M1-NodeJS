import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CustomDrawer extends StatefulWidget {
  const CustomDrawer({super.key});

  @override
  _CustomDrawerState createState() => _CustomDrawerState();
}

class _CustomDrawerState extends State<CustomDrawer> {
  String? token; // Stocke le token utilisateur

  @override
  void initState() {
    super.initState();
    _loadToken(); // Charger le token au démarrage
  }

  Future<void> _loadToken() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      token = prefs.getString('token'); // Vérifie si un token existe
    });
  }

  Future<void> _logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token'); // Supprime le token
    setState(() {
      token = null; // Met à jour l'interface après déconnexion
    });
    Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false);
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
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
          _buildListTile(
            context,
            text: 'Voir les actualités',
            route: '/news',
            color: Colors.green,
            icon: Icons.article,
          ),
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
          // ✅ Bouton "Se connecter" ou "Se déconnecter"
          token == null
              ? _buildListTile(
                  context,
                  text: 'Se connecter',
                  route: '/login',
                  color: Colors.orange,
                  icon: Icons.login,
                )
              : ListTile(
                  onTap: _logout,
                  leading: Icon(Icons.logout, color: Colors.red, size: 30),
                  title: Text(
                    'Se déconnecter',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
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
    );
  }

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
