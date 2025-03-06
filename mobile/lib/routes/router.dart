import 'package:flutter/material.dart';
import '../screens/accueil.dart';
import '../screens/actualities.dart';
import '../screens/masculine_junior.dart';
import '../screens/masculine_senior.dart';
import '../screens/feminine_junior.dart';
import '../screens/feminine_senior.dart';
import '../screens/login.dart';
import '../screens/ajout_actualities.dart';
import '../screens/favoris.dart';
import '../screens/contact.dart';
import '../screens/sign_in.dart'; // Import de la page d'inscription
// Import de la page de préférences

class AppRouter {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case '/':
        return MaterialPageRoute(builder: (_) => AccueilScreen());
      case '/news':
        return MaterialPageRoute(builder: (_) => ActualitiesScreen()); 
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
      case '/sign_in': // Nouvelle route pour l'inscription
        return MaterialPageRoute(builder: (_) => SignInScreen()); // Page d'inscription
      case '/add_news':
        return MaterialPageRoute(builder: (_) => AjoutActualitiesScreen(onNewsAdded: (title, description) {
          // Implémenter la logique pour ajouter l'actualité
        }));
      case '/user_preferences': // Route pour la page des préférences utilisateur
        return MaterialPageRoute(builder: (_) => Favoris()); // Page Favoris avec la logique de préférences
      case '/contact': // Nouvelle route pour la page de contact
        return MaterialPageRoute(builder: (_) => ContactScreen()); // Ajout de la page ContactScreen
      default:
        return MaterialPageRoute(builder: (_) => AccueilScreen()); // fallback to home if route is not found
    }
  }
}
