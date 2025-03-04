import 'package:flutter/material.dart';
import '../widgets/accueil.dart';
import '../widgets/actualities.dart';
import '../widgets/masculine_junior.dart';
import '../widgets/masculine_senior.dart';
import '../widgets/feminine_junior.dart';
import '../widgets/feminine_senior.dart';
import '../widgets/login.dart';
import '../widgets/ajout_actualities.dart';
import '../widgets/user_pref.dart';

class AppRouter {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case '/':
        return MaterialPageRoute(builder: (_) => AccueilScreen());
      case '/news':
        return MaterialPageRoute(builder: (_) => NewsScreen());
      case '/section_masculine_junior':
        return MaterialPageRoute(builder: (_) => SectionMasculineJuniorScreen());
      case '/section_masculine_senior':
        return MaterialPageRoute(builder: (_) => SectionMasculineSeniorScreen());
      case '/section_feminine_junior':
        return MaterialPageRoute(builder: (_) => SectionFeminineJuniorScreen());
      case '/section_feminine_senior':
        return MaterialPageRoute(builder: (_) => SectionFeminineSeniorScreen());
      case '/login':
        return MaterialPageRoute(builder: (_) => LoginScreen());
      case '/add_news':
        return MaterialPageRoute(builder: (_) => AddNewsScreen());
      case '/user_preferences':
        return MaterialPageRoute(builder: (_) => UserPreferencesScreen());
      default:
        return MaterialPageRoute(builder: (_) => AccueilScreen()); // fallback to home if route is not found
    }
  }
}
