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

class UserPreferencesScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Permet de récupérer l'état du thème à partir du provider
    final themeProvider = Provider.of<ThemeProvider>(context);

    return Scaffold(
      appBar: AppBar(title: Text('Préférences de l\'utilisateur')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
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
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
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
