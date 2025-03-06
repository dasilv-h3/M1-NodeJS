import 'package:fluterproject/widgets/actualities.dart';
import 'package:fluterproject/widgets/custom_drawer.dart';
import 'package:fluterproject/widgets/navbar.dart';
import 'package:flutter/material.dart';

class ActualitiesScreen extends StatelessWidget {
  const ActualitiesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: Navbar(),
      drawer: CustomDrawer(),
      body: Column(children: [Actualities()]),
    );
  }
}
