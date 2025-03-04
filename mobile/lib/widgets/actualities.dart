import 'package:flutter/material.dart';

class NewsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Actualités')),
      body: Center(child: Text('Liste des actualités ici')),
    );
  }
}
