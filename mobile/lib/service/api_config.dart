import 'package:http/http.dart' as http;

class ApiConfig {
  static const String baseUrl = 'http://localhost:3000/api/';

  // Fonction pour obtenir les en-têtes de la requête
  static Map<String, String> getHeaders() {
    // final String? token = 'ton_token_statique'; // Remplace avec la logique pour récupérer le token
    return {
      'Content-Type': 'application/json',
      // if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  // Fonction pour créer une instance de client HTTP
  static http.Client createClient() {
    return http.Client();
  }
}
