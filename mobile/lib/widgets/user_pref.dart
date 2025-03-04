import 'package:flutter/material.dart';

class UserPreferencesScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Préférences de l\'utilisateur')),
      body: Center(child: Text('Page des préférences utilisateur')),
    );
  }
}
