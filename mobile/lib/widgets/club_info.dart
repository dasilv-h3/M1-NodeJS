import 'package:flutter/material.dart';

class ClubInfo extends StatelessWidget {
  final String history;
  final String description;

  ClubInfo({required this.history, required this.description});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Historique du Club',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 10),
          Text(history), // Assurez-vous que history est une String ici
          SizedBox(height: 20),
          Text(
            'Description du Club',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 10),
          Text(description), // Assurez-vous que description est une String ici
          SizedBox(height: 10),
          Text('Club data loaded'), // Message pour déboguer
        ],
      ),
    );
  }
}
