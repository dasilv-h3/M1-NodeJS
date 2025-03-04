import 'package:fluterproject/widgets/actualities.dart';
import 'package:flutter/material.dart';

class ActualitiesScreen extends StatelessWidget {
  const ActualitiesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 189, 208, 239),
        title: Text('Bienvenue sur l\'Application Sportive'),
        centerTitle: true,
      ),
      body: Column(children: [Actualities()]),
    );
  }
}
