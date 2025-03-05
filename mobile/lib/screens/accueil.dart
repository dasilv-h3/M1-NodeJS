import 'package:fluterproject/widgets/custom_drawer.dart';
import 'package:fluterproject/widgets/navbar.dart';
import 'package:flutter/material.dart';

class AccueilScreen extends StatelessWidget {
  const AccueilScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: Navbar(),
      drawer: CustomDrawer(),
      body: Center(
        child: Text(
          'Bienvenue sur notre site !\nChoisissez une option dans le menu.',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}
