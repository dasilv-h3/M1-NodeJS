import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// Classe pour gérer l'état du thème (mode sombre ou clair)
class ThemeProvider with ChangeNotifier {
  bool _isDarkMode = false;

  bool get isDarkMode => _isDarkMode;

  void toggleTheme() {
    _isDarkMode = !_isDarkMode;
    notifyListeners(); // Notifie les widgets qui écoutent ce changement
  }
}

// Classe pour gérer les sections favorites
class UserPreferencesProvider with ChangeNotifier {
  // Liste des sections disponibles
  final List<String> _sections = [
    "Section Masculine Junior",
    "Section Masculine Senior",
    "Section Féminine Junior",
    "Section Féminine Senior",
  ];

  // Liste des sections favorites de l'utilisateur
  List<String> _favoriteSections = [];

  List<String> get sections => _sections;
  List<String> get favoriteSections => _favoriteSections;

  // Ajouter ou retirer une section des favoris
  void toggleFavorite(String section) {
    if (_favoriteSections.contains(section)) {
      _favoriteSections.remove(section);
    } else {
      _favoriteSections.add(section);
    }
    notifyListeners(); // Notifie les widgets qui écoutent ce changement
  }
}

class UserPreferencesScreen extends StatelessWidget {
  const UserPreferencesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Permet de récupérer l'état du thème et des préférences utilisateur
    final themeProvider = Provider.of<ThemeProvider>(context);
    final userPreferencesProvider = Provider.of<UserPreferencesProvider>(
      context,
    );

    return Scaffold(
      appBar: AppBar(title: Text('Préférences de l\'utilisateur')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            // Affichage du mode actuel
            Text(
              'Mode actuel : ${themeProvider.isDarkMode ? "Sombre" : "Clair"}',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 20),
            SwitchListTile(
              title: Text('Activer le Mode Sombre'),
              value: themeProvider.isDarkMode,
              onChanged: (bool value) {
                themeProvider.toggleTheme(); // Change le thème
              },
              secondary: Icon(
                themeProvider.isDarkMode
                    ? Icons.nightlight_round
                    : Icons.wb_sunny,
              ),
            ),
            SizedBox(height: 30),
            // Affichage des sections disponibles et possibilité de les ajouter aux favoris
            Text(
              'Sélectionnez vos sections favorites',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 10),
            Expanded(
              child: ListView.builder(
                itemCount: userPreferencesProvider.sections.length,
                itemBuilder: (context, index) {
                  final section = userPreferencesProvider.sections[index];
                  final isFavorite = userPreferencesProvider.favoriteSections
                      .contains(section);

                  return ListTile(
                    title: Text(section),
                    trailing: Icon(
                      isFavorite ? Icons.star : Icons.star_border,
                      color: isFavorite ? Colors.yellow : null,
                    ),
                    onTap: () {
                      userPreferencesProvider.toggleFavorite(
                        section,
                      ); // Ajouter ou retirer des favoris
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => ThemeProvider(), // Fournisseur du thème
      child: ChangeNotifierProvider(
        create:
            (context) =>
                UserPreferencesProvider(), // Fournisseur des préférences utilisateur
        child: MyApp(),
      ),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);

    return MaterialApp(
      title: 'Application Sportive',
      theme: themeProvider.isDarkMode ? ThemeData.dark() : ThemeData.light(),
      home: UserPreferencesScreen(),
    );
  }
}
